import AppError from '../utils/appError';
import { asyncHandler } from '../utils/asyncHandler';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import db from '../db';
import { AxiosError } from 'axios';
import generateAccount from '../features/generateAccount';
import { userSchema } from '../utils/zodSchema';
import { AccountResponse } from '../types';

export type User = {
  first_name: string;
  last_name: string;
  phone: string;
  amount: string; // raven used a type string from some strange reason
  email: string;
};

// This async handler is a utility function for a try catch block,

export const signUp = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const validatedData = userSchema.parse(req.body);
    const { first_name, last_name, phone, amount, email, password } =
      validatedData;

    const hashedPassword = await bcrypt.hash(password, 10);
    const userDetails = { first_name, last_name, phone, amount, email };

    const accountResponse: AccountResponse = await generateAccount(userDetails);

    console.log(accountResponse);
    if (accountResponse instanceof AxiosError) {
      return next(new AppError('failed to generate account', 400));
    }

    // Destructure the response data
    const { account_number, account_name, bank, isPermanent } =
      accountResponse.data;

    // Insert customer data into the 'users' table
    const [userId] = await db('users').insert({
      first_name,
      last_name,
      phone,
      email,
      password: hashedPassword,
    });

    // Insert account data into the 'accounts' table
    await db('accounts').insert({
      account_number,
      account_name,
      bank,
      amount,
      isPermanent,
      user_id: userId, // Link the account to the user
    });

    return res.status(201).json({ userId, accountResponse });
  }
);

// Login route
export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { account_number, password } = req.body;
    if (!account_number && !password) {
      return next(new AppError('Missing account or password', 400));
    }
    const user = await db('users')
      .join('accounts', 'users.id', '=', 'accounts.user_id')
      .where('accounts.account_number', account_number)
      .first(); // Get the first matching record

    console.log(user);

    if (!user) {
      return next(new AppError('invalid credentials', 400));
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return next(new AppError('invalid credentials', 400));
    }

    // Store user information in the new session
    req.session.user = { id: user.id, username: user.username };

    // Optionally, you can update the session in your database
    await db.raw(
      `
      INSERT INTO sessions (sid, sess, user_id, expired)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE sess = ?, user_id = ?, expired = ?`,
      [
        req.sessionID,
        JSON.stringify(req.session),
        user.id,
        req.session.cookie.expires, // Use the expires field from the cookie
        JSON.stringify(req.session),
        user.id,
        req.session.cookie.expires,
      ]
    );

    // Send the response to the client
    res.status(200).json({ message: 'Login successful', userID: user.id });
  }
);
