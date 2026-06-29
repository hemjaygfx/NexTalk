  import User from '../models/user.model.js';
  import bcryptjs from 'bcryptjs';
  import { generateToken } from '../lib/utils.js';
  import { sendWelcomeEmail } from '../emails/emailHandler.js';
  import { ENV } from '../lib/env.js';
  import cloudinary from '../lib/cloudinary.js';

export const register = async (req, res) => {
    const { username, fullName, email, password } = req.body;

    try {
        // check if all fields are filled
        if (!username || !fullName || !password || !email) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // check if username already exists
        const existingUserByUsername = await User.findOne({ username });
        if (existingUserByUsername) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // check if password is less than 6 characters long
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        // check if email format is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // 123456 => $hcie_123fs?
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // create new user in DB
        const newUser = new User({
            username,
            fullName,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        generateToken(savedUser._id, res);

        res.status(201).json({
            _id: savedUser._id,
            username: savedUser.username,
            fullName: savedUser.fullName,
            email: savedUser.email,
            profilePic: savedUser.profilePic || ''
        });

        // Send the welcome email in the background without affecting the API response.
        sendWelcomeEmail(
            savedUser.email,
            savedUser.fullName,
            ENV.CLIENT_URL
        ).catch((error) => {
            console.error('Failed to send welcome email:', error);
        });
    } catch (error) {
        console.log('Error in register controller:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body ?? {};
        const normalizedEmail = typeof email === 'string' ? email.trim() : '';

        // check if all fields are filled
        if (!normalizedEmail || typeof password !== 'string' || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        } // never tell the user which one is wrong for security reasons

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {       
                 return res.status(400).json({ message: 'Invalid email or password' });
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic || ''
        });
    } catch (error) {
        console.log('Error in login controller:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const logout = async (_, res) => {

    res.cookie('jwt', '', {
        maxAge: 0
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        if (typeof profilePic !== 'string' || !profilePic.trim()) {
            return res.status(400).json({ message: 'Profile picture is required' });
        }
        const userId = req.user._id;

        // Upload the new profile picture to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(profilePic, {
            folder: 'profile_pics',
            public_id: `user_${userId}`,
            overwrite: true,
            resource_type: 'image'
        });

        // Update the user's profile picture URL in the database
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        );

        res.status(200).json({
            _id: updatedUser._id,
            username: updatedUser.username,
            fullName: updatedUser.fullName,
            email: updatedUser.email,
            profilePic: updatedUser.profilePic
        });
    } catch (error) {
        console.log('Error in updateProfile controller:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
