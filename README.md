# Notes API

REST API for creating and updating notes. Using express framework with MongoDB for simplicity 
and 3rd party support. I used passport for a very simple JWT validation that can easily be built
up or added to. The other packages are explained breifly below
 

## Requirements (Before you can run this locally)
1. MongoDB
2. NPM
3. Node.js (version 18.19.1 was used here)

## Installation

1. Clone the repository.
2. Run `npm install` to install the dependencies.
3. Create a `.env` file by running 
```sh
cp .env-example .env
```
4. then filling in the values in the new .env file

## Running the project locally

1. Make sure your local Mongo instance is running at the location specified in the .env file

2. Start the server:
npm start

## Imported Packages

- `bcrypt`: Used for password hashing.
- `body-parser`: Used for parsing request bodies.
- `consola`: Used for logging.
- `cors`: Used for enabling CORS.
- `cross-env`: Used for setting environment variables.
- `dotenv`: Used for loading environment variables from `.env` file.
- `express`: Used for creating the server.
- `express-slow-down`: Used for rate limiting.
- `express-validator`: Used for request validation.
- `jsonwebtoken`: Used for generating JWT tokens.
- `mongodb-memory-server`: Used for testing with an in-memory MongoDB instance. 
- `mongoose`: Used for interacting with MongoDB.
- `passport`: Used for authentication.
- `passport-jwt`: Used for JWT authentication strategy.

## Testing

Run `npm run test` to run the tests.