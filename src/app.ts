// Import the 'express' module along with 'Request' and 'Response' types from express
import express, { Request, Response } from 'express';
import db from './db';
import AppError from './utils/appError';
// import globalErrorHandler from './controllers/errorController';
import authRouter from './routes/authRoute';
import globalErrorHandler from './controllers/errorController';

// Create an Express application
const app = express();

// Middleware
app.use(express.json());

// Manually initialize the database connection after the server is running
const initializeDbConnection = async () => {
  try {
    // Testing the connection by running a simple query
    await db.raw('SELECT 1+1 AS result');
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

// Run this function when the server is on
initializeDbConnection();

// Specify the port number for the server
const port: number = 3000;

// Define a route for the root path ('/')
app.get('/', (req: Request, res: Response) => {
  // Send a response to the client
  res.send('Hello from Raven Api');
});

app.use('/api/v1/auth', authRouter);

app.all('*', (req, res, next) => {
  next(
    new AppError(
      `cant find api path ${req.originalUrl} for ${req.method} request `,
      404
    )
  );
});

app.use(globalErrorHandler);

// Start the server after the DB connection is established
const startServer = async () => {
  await initializeDbConnection();

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

startServer();
