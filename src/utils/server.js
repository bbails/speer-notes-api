import express from 'express';
import cors from 'cors';
import passport from 'passport';

// Import Routes
import authRouter from '../api/auth.js';
import noteRouter from '../api/notes.js';
import searchRouter from '../api/search.js';

import {rateLimiter} from '../middlewares/rate-limit.js';

export function createServer() {
    const app = express ();

    // Apply Application Middleware
    app.use(express.json());
    app.use(cors());
    app.use(passport.initialize());
    app.use(rateLimiter);

    // Add Routes
    app.use('/api/auth', authRouter);
    app.use('/api/notes', noteRouter);
    app.use('/api/search', searchRouter);

    return app;
}