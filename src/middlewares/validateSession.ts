// On every authenticated request, the client sends the session ID (via the cookie) to the server.
// The server queries the database to validate the session:
// Check if the session ID exists.
// Verify that the session hasn't expired.

import { Request, Response, NextFunction } from 'express';
import db from '../db';
import AppError from '../utils/appError';
import { asyncHandler } from '../utils/asyncHandler';

export const validateSession = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
  const sessionID = req.sessionID; // This is automatically set by express-session

    console.log('sessionID',sessionID)

    if (!sessionID) {
      return next(new AppError('Session ID is missing. Please log in.', 401));
    }

    // 2. Query the database to validate the session
    const session = await db('sessions').where({ sid: sessionID }).first();
    console.log('session from DB', session)

    if (!session) {
      return next(new AppError('Invalid session. Please log in.', 401));
    }

    // 3. Verify that the session has not expired
    const currentTime = new Date();
    const sessionExpired = new Date(session.expired) < currentTime;

    if (sessionExpired) {
      return next(
        new AppError('Session has expired. Please log in again.', 401)
      );
    }

    console.log('session-data', session.sess)
   

    // 5. Attach session data to the request object
    req.user = session.sess.user

  
    next();
  }
);
