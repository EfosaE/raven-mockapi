import { Router } from 'express';
import { login, signUp } from '../controllers/authController';

const authRouter = Router();

authRouter.route('/register').post(signUp);
authRouter.route('/login').post(login);

export default authRouter;
