import express from 'express';
import {register} from '../controllers/auth.controller.js';

const router = express.Router(); 

// Register endpoint
router.post('/register', register);

// Login endpoint
router.get('/login', (req, res) => {
    res.send('Login endpoint');
});

// Logout endpoint
router.get('/logout', (req, res) => {
    res.send('Logout endpoint');
});


export default router;
