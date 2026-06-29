import express from 'express';
import { register, login, logout, updateProfile } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import { arcjetProtection } from '../middleware/arcjet.middleware.js';

const router = express.Router(); 

router.use(arcjetProtection); // Apply Arcjet protection to all routes in this router   


// Register endpoint
router.post('/register', register);

// Login endpoint
router.post('/login', arcjetProtection, login);

// Logout endpoint
router.post('/logout', logout);

router.put('/update-profile', protectRoute, updateProfile); // Update profile endpoint

router.get('/check', protectRoute, (req, res) => res.status(200).json(req.user));

export default router;
