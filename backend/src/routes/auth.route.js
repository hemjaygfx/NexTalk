import express from 'express';
import { register, login, logout } from '../controllers/auth.controller.js';

const router = express.Router(); 

// Register endpoint
router.post('/register', register);

// Login endpoint
router.post('/login', login);

// Logout endpoint
router.post('/logout', logout);

export default router;
