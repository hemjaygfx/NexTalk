// src/server.js
//const express = require('express');

import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { ENV } from './lib/env.js';
import cors from 'cors';

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { connectDB } from './lib/db.js';
import { app, server } from './lib/socket.js';


const __dirname = path.resolve();

const PORT = Number(ENV.PORT || 3000);
const HOST = process.env.HOST || '0.0.0.0';

app.use(express.json({ limit: "5mb"})) // req.body
app.use(cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
}));
app.use(cookieParser()); // req.cookies

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

        server.listen(PORT, HOST, () => {
            const displayHost = HOST === "0.0.0.0" ? "localhost" : HOST;
            console.log(`Server is running on http://${displayHost}:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

