import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import consola from 'consola';
import { json } from 'body-Parser';

import { DB, PORT } from "./constants";

const app = express ();

// Apply Application Middleware
app.use(json());
app.use(cors());

const main = async () => {
  try {
    //Connect with DB
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true
    });
    consola.success('DATABASE CONNECTED ...');
  } catch (err) {
    consola.error('UNABLE TO CONNECT TO DB\n ${err.message}');
  }
};

main();