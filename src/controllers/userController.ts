import { AxiosError } from 'axios';

import { asyncHandler } from '../utils/asyncHandler';
import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';
import { makeTransfer } from '../features/tranfers';
import db from '../db';

export const getProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    res.status(200).json({
      user,
    });
  }
);

export const transferMoney = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const transferData = req.body;
    const transferResponse = await makeTransfer(transferData);
    console.log(transferResponse);
    if (transferResponse instanceof AxiosError) {
      next(new AppError('failed to queue transfer', 500));
      return;
    }

    return res.status(200).json(transferResponse);
  }
);

export const getTransferDetails = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { trx_ref } = req.params;
    if (!trx_ref) {
      return next(new AppError('Please provide a transaction reference', 400));
    }

    const transaction = await db('transactions').where({ trx_ref }).first();
    console.log(transaction);
    if (!transaction) {
      return next(
        new AppError(`No transaction was found for this transaction ref:${trx_ref} `, 404)
      );
    }
    return res.status(200).json(transaction ?? []);
  }
);
