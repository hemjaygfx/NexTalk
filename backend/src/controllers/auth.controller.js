  import User from '../models/user.model.js';
  import bcryptjs from 'bcryptjs';
  import { generateToken } from '../lib/utils.js';

export const register = async (req, res) => {
    const { username, fullName, email, password } = req.body; 

    try {
        //check if all fields are filled
        if (!username || !fullName || !password || !email) {
            return res.status(400).json({message: 'All fields are required'});
        }
        // check if username is already exists 
        const existingUserByUsername = await User.findOne({ username });
        if (existingUserByUsername) {
            return res.status(400).json({message: 'Username already exists'});
        }

        // check if password is less then 6 characters long 
        if (password.length < 6) {
            return res.status(400).json({message: 'Password must be at least 6 characters long'});
        }

        //check if emails valid or not: regex pattern for email   
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({message: 'Invalid email format'});
        }

        const existingUserByEmail = await User.findOne({email});
        if (existingUserByEmail) {
            return res.status(400).json({message: 'Email already exists'});
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

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
             res.status(201).json({
                _id: newUser._id,
                username: newUser.username, 
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            });
            
            // Todo: send a welcome email to user after successful registration
        } else {
             res.status(400).json({message: 'Failed to create user'});
        }

    } catch(error) {
        console.log("Error in register controller:", error );
        res.status(500).json({message: 'Internal server error'});
    }   
};