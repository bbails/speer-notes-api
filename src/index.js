import mongoose from 'mongoose';
import consola from 'consola';
import { createServer } from './utils/server.js';

// Import Constants
import { DB, PORT } from "./constants/index.js";



// Import Passport Middleware
import './middlewares/passport-middware.js';

const app = createServer();

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