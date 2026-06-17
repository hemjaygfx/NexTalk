// src/server.js
//const express = require('express');

import express from 'express';

const app = express();

// Login endpoint
app.get('/api/auth/login', (req, res) => {
    res.send('Login endpoint');
});

// Register endpoint
app.get('/api/auth/register', (req, res) => {
    res.send('Register endpoint');
});

// Logout endpoint
app.get('/api/auth/logout', (req, res) => {
    res.send('Logout endpoint');
});

app.listen(3000, () => console.log("Server is running on port 3000"));

