import { asyncHandler } from '../utils/asyncHandler';
import { Request, Response, NextFunction } from 'express';

export const getProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user; 
    res.status(200).json({
      user,
    });
  }
);
