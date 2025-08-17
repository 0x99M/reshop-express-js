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

### Testing with Docker

This project includes Docker configurations for easy testing and deployment. The setup consists of two services:

1. **app**: The Express.js application
2. **db**: A PostgreSQL database

#### Prerequisites for Docker Testing

*   [Docker](https://docs.docker.com/get-docker/)
*   [Docker Compose](https://docs.docker.com/compose/install/)

#### Environment Configuration for Docker

1.  Create a `.env` file from the example:
    ```bash
    cp .example.env .env
    ```
2.  Edit the `.env` file and provide values for all variables:
    *   `DB_USERNAME`: Database username (also used for PostgreSQL container)
    *   `DB_PASSWORD`: Database password (also used for PostgreSQL container)
    *   `DB_NAME`: Database name (also used for PostgreSQL container)
    *   `DB_HOST`: Set to `db` (the service name in docker-compose.yml)
    *   `DB_PORT`: Set to `5432` (PostgreSQL default port)
    *   `NODE_ENV`: Set to `development` or `production`
    *   `JWT_SECRET`: A strong secret key for signing JWT tokens
    *   `JWT_EXPIRES_IN`: Expiration time for JWT tokens (e.g., `1h`, `24h`)

#### Running with Docker Compose

1.  Ensure you have configured your `.env` file as described above.
2.  Build and start the services:
    ```bash
    docker-compose up --build
    ```

This command will:
*   Build the application Docker image
*   Start the PostgreSQL database container
*   Run database migrations
*   Seed the database with initial data
*   Start the application in development mode with auto-reload

The application will be accessible at `http://localhost:3000`, and the database will be accessible on port `5432`.

#### Stopping the Services

To stop the services, press `Ctrl+C` in the terminal where `docker-compose up` is running, or run:
```bash
docker-compose down
```

This will stop and remove the containers, networks, and volumes created by `docker-compose up`.

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