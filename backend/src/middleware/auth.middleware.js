import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
   
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        } 

        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        // Handle JWT-specific errors as 401
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Unauthorized: Token expired' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        if (error.name === 'NotBeforeError') {
            return res.status(401).json({ message: 'Unauthorized: Token not yet valid' });
        }

        // Unexpected errors (database, runtime, etc.) return 500
        console.error('Error in protectRoute middleware:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
