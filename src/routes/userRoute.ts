import { Router } from 'express';
import {
  getProfile,
  getTransferDetails,
  transferMoney,
} from '../controllers/userController';
import { validateSession } from '../middlewares/validateSession';
const userRouter = Router();
// applies this check to every route in here
userRouter.use(validateSession);
userRouter.route('/profile').get(getProfile);
userRouter
  .route('/transfers/:trx_ref?')
  .post(transferMoney)
  .get(getTransferDetails);


export default userRouter;
