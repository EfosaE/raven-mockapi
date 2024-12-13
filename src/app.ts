// Import the 'express' module along with 'Request' and 'Response' types from express
import express, { Request, Response } from 'express';
import db from './db';
import AppError from './utils/appError';
// import globalErrorHandler from './controllers/errorController';
import authRouter from './routes/authRoute';
import globalErrorHandler from './controllers/errorController';
import session from 'express-session';
import { sessionStore } from './utils/sessionStore';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoute';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

const isProduction = process.env.NODE_ENV === 'production';
console.log('isProduction?', isProduction);

app.set('trust proxy', 1); // Required for secure cookies behind a proxy like Render
// Initialize express-session
app.use(
  session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET ?? 'default_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: isProduction, // Secure only in production
      sameSite: isProduction ? 'none' : 'lax', // Cross-origin in production, relaxed in dev
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// Manually initialize the database connection to check its status
const initializeDbConnection = async () => {
  try {
    // Testing the connection by running a simple query
    await db.raw('SELECT 1+1 AS result');
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

// Specify the port number for the server
const port: number = 3000;

// Define a route for the root path ('/')
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Raven Api');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
// Webhook endpoint
app.post('/api/v1/webhook', (req, res) => {
  console.log('Webhook received:', req.body);
  
  // Process the payload (e.g., save to database, trigger notifications)
  
  res.status(200).send('Webhook received successfully');
});
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
