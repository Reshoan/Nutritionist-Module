import { DataSource, DataSourceOptions } from "typeorm"
import {config} from "dotenv"
config()
export const dataSourceOptions:DataSourceOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [],
    migrations: [],
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

/*
This code sets up a database connection using TypeORM, a popular ORM (Object-Relational Mapping) library for Node.js. Here's a breakdown of the code:

### 1. **Imports**
```typescript
import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv";
config();
```
- **`DataSource` and `DataSourceOptions`**: These are TypeORM classes used to configure and manage the database connection.
- **`dotenv`**: This library loads environment variables from a `.env` file into `process.env`. The `config()` function initializes it.

### 2. **Database Configuration**
```typescript
export const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [],
    migrations: [],
};
```
- **`type`**: Specifies the database type (`postgres` in this case).
- **`host`, `port`, `username`, `password`, `database`**: These values are pulled from environment variables (`process.env`) to keep sensitive information secure.
- **`synchronize`**: If `true`, TypeORM will automatically synchronize the database schema with your entities. This is useful for development but should be `false` in production to avoid accidental data loss.
- **`logging`**: If `false`, disables query logging.
- **`entities`**: An array where you specify the paths to your entity files (e.g., models).
- **`migrations`**: An array where you specify the paths to your migration files.

### 3. **DataSource Initialization**
```typescript
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
```
- **`DataSource`**: This is the main class used to manage the database connection.
- **`dataSourceOptions`**: The configuration object is passed to the `DataSource` constructor.
- **`export default dataSource`**: Exports the initialized `dataSource` instance so it can be used throughout the application.

### Purpose
This file is responsible for configuring and initializing the database connection. It uses environment variables for sensitive information, making it secure and flexible for different environments (e.g., development, production). The `dataSource` instance can be imported and used wherever database operations are needed.
*/