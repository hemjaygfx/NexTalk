// src/server.js
//const express = require('express');

import express from 'express';
import path from 'path';
import { ENV } from './lib/env.js';

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { connectDB } from './lib/db.js';


const app = express();
const __dirname = path.resolve();

const PORT=ENV.PORT || 3000;

app.use(express.json()) // req.body

app.use('/api/auth', authRoutes);   
app.use('/api/message', messageRoutes);   

// make ready for deployment 
if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();




