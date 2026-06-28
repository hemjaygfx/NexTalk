  import User from '../models/user.model.js';
  import bcryptjs from 'bcryptjs';
  import { generateToken } from '../lib/utils.js';
  import { sendWelcomeEmail } from '../emails/emailHandler.js';
  import { ENV } from '../lib/env.js';

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