import express from 'express';
import mongoose from 'mongoose';
//import 'dotenv/config';
import cors from 'cors';
import consola from 'consola';
import json from 'body-parser';

// Import Constants
import { DB, PORT } from "./constants/index.js";

// Import Routes
import authRouter from './api/auth.js';
//import { noteRouter } from './api/note/index.js';

const app = express ();

// Apply Application Middleware
app.use(json());
app.use(cors());


// Add Routes
app.use('/api/auth', authRouter);
//app.use('/api/note', noteRouter);

const main = async () => {
  try {
    //Connect with DB
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    consola.success('DATABASE CONNECTED ...');
  } catch (err) {
    consola.error('UNABLE TO CONNECT TO DB\n ${err.message}');
  }
};

main();