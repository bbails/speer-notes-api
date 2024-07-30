import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import consola from 'consola';
import passport from 'passport';

// Import Constants
import { DB, PORT } from "./constants/index.js";

// Import Routes
import authRouter from './api/auth.js';
import noteRouter from './api/notes.js';
import searchRouter from './api/search.js';

// Import Passport Middleware
import './middlewares/passport-middware.js';

export const app = express ();

// Apply Application Middleware
app.use(express.json());
app.use(cors());
app.use(passport.initialize());


// Add Routes
app.use('/api/auth', authRouter);
app.use('/api/notes', noteRouter);
app.use('/api/search', searchRouter);

const main = async () => {
  try {
    //Connect with DB
    await mongoose.connect(DB);
    consola.success('DATABASE CONNECTED ...');

    app.listen(PORT, () => {
      consola.success(`SERVER RUNNING ON PORT ${PORT}`)
    });
  } catch (err) {
    consola.error(`UNABLE TO CONNECT TO DB \n${err.message}`);
  }
};

main();