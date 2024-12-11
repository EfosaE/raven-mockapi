import { asyncHandler } from '../utils/asyncHandler';
import { NextFunction, Request, Response } from 'express';

// This async handler is a utility function for a try catch block,
export const signUp = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email  } = req.body;

    // knex creates a user

    return res.status(201).json({
      status: 'success',
        user: {
          username
      },
    });
  }
);
