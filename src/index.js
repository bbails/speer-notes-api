const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const consola =require('consola');
const passport = require('passport');

// Import Constants
import { DB, PORT } from "./constants/index.js";

// Import Routes
import authRouter from './__test/api/auth.js';
import noteRouter from './__test/api/notes.js';
import searchRouter from './__test/api/search.js';

// Import Passport Middleware
import './middlewares/passport-middware.js';

const app = express ();

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