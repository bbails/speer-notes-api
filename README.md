# Notes API

REST API for creating and updating notes.

Used Express framework and MongoDB, mostly because I've used them both before and they are 
well supported for making and testing API frameworks quickly and efficiently. 

## Requirements (Before you can run this locally)
1. MongoDB
2. NPM
3. Node.js (version 18.19.1 was used here)

## Installation

1. Clone the repository.
2. Run `npm install` to install the dependencies.
3. Create a `.env` file by running 
```sh
> $ cp .env-example .env
```
 then filling in the values there

## Running the project locally

1. Make sure your local Mongo instance is running at the location specified in the .env file

2. Start the server:
npm start

## Imported Node Modules

- `bcrypt`: Used for password hashing.
- `body-parser`: Used for parsing request bodies.
- `consola`: Used for logging.
- `cors`: Used for enabling CORS.
- `cross-env`: Used for setting environment variables.
- `dotenv`: Used for loading environment variables from `.env` file.
- `esm`: Used for ECMAScript modules.
- `express`: Used for creating the server.
- `express-slow-down`: Used for rate limiting.
- `express-validator`: Used for request validation.
- `jsonwebtoken`: Used for generating JWT tokens.
- `lodash`: Used for utility functions.
- `mongodb-memory-server`: Used for testing with an in-memory MongoDB instance.
- `mongoose`: Used for interacting with MongoDB.
- `passport`: Used for authentication.
- `passport-jwt`: Used for JWT authentication strategy.

## Testing

Run `npm run test` to run the tests.