# Reshop Express.js API

This is the backend API for the Reshop e-commerce platform, built with Node.js and Express.js. It provides endpoints for managing products, orders, and user authentication.

## Features

*   User authentication (login) with JWT tokens.
*   Role-based authorization (admin, customer, supplier).
*   CRUD operations for products (accessible by admins and suppliers).
*   CRUD operations for orders (accessible by admins and customers).
*   PostgreSQL database integration using Sequelize ORM.
*   Security best practices with Helmet, CORS, and compression.
*   Request logging with Morgan.
*   Environment-based configuration with dotenv.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

*   [Node.js](https://nodejs.org/) (Ensure you have a version compatible with ES Modules)
*   [npm](https://www.npmjs.com/) (Comes with Node.js)
*   [PostgreSQL](https://www.postgresql.org/) database server

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/reshop-express-js.git
    cd reshop-express-js
    ```
2.  Install NPM packages:
    ```bash
    npm install
    ```

### Environment Configuration

1.  Create a `.env` file from the example:
    ```bash
    cp .example.env .env
    ```
2.  Edit the `.env` file and provide values for the following variables:
    *   `DB_USERNAME`: Your PostgreSQL database username.
    *   `DB_PASSWORD`: Your PostgreSQL database password.
    *   `DB_NAME`: The name of your PostgreSQL database.
    *   `DB_HOST`: The host where your PostgreSQL server is running (e.g., `localhost`).
    *   `DB_PORT`: The port your PostgreSQL server is listening on (e.g., `5432`).
    *   `JWT_SECRET`: A strong secret key for signing JWT tokens.
    *   `JWT_EXPIRES_IN`: Expiration time for JWT tokens (e.g., `1h`, `24h`).

### Database Setup

1.  Ensure your PostgreSQL server is running and create a database matching the name specified in your `.env` file.
2.  Apply database migrations to set up the initial schema:
    ```bash
    npm run migrate
    ```
3.  (Optional) Seed the database with initial data:
    ```bash
    npm run seed
    ```

### Running the Application

*   **Start the server in production mode:**
    ```bash
    npm start
    ```
*   **Start the server in development mode (with auto-reload):**
    ```bash
    npm run dev
    ```

The server will be accessible at `http://localhost:3000`.

## API Endpoints

*   **Authentication**
    *   `POST /auth/login`: Login to obtain a JWT token.
*   **Products**
    *   `GET /products`: Get a list of all products.
    *   `GET /products/:id`: Get a specific product by ID.
    *   `POST /products`: Create a new product (requires `admin` or `supplier` role).
    *   `PUT /products/:id`: Update a product (requires `admin` or `supplier` role).
    *   `DELETE /products/:id`: Delete a product (requires `admin` role).
*   **Orders**
    *   `GET /orders`: Get a list of orders (requires `admin` role).
    *   `GET /orders/:id`: Get a specific order by ID (requires `admin` or owner).
    *   `POST /orders`: Create a new order (requires `admin` or `customer` role).
    *   `PUT /orders/:id`: Update an order (requires `admin` role).
    *   `DELETE /orders/:id`: Delete an order (requires `admin` role).
*   **User Profile**
    *   `GET /auth/profile`: Get the profile of the authenticated user (requires valid JWT).

## Project Structure

*   `app.js`: Entry point of the application.
*   `config/`: Configuration files (e.g., database).
*   `controllers/`: Contains logic for handling requests.
*   `middleware/`: Custom middleware functions (e.g., auth).
*   `migrations/`: Database migration files (Sequelize).
*   `models/`: Sequelize models for database entities.
*   `routes/`: Defines API routes and maps them to controllers.
*   `seeders/`: Database seeder files (Sequelize).

## Built With

*   [Node.js](https://nodejs.org/)
*   [Express.js](https://expressjs.com/)
*   [Sequelize](https://sequelize.org/) - Promise-based Node.js ORM for PostgreSQL
*   [PostgreSQL](https://www.postgresql.org/)
*   [JSON Web Tokens (JWT)](https://jwt.io/)
*   [bcrypt](https://github.com/kelektiv/node.bcrypt.js) - Library for hashing passwords