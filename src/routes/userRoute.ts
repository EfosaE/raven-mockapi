import { Router } from 'express';
import { getProfile } from '../controllers/userController';
import { validateSession } from '../middlewares/validateSession';
;

const userRouter = Router();
// applies this check to every route in here
userRouter.use(validateSession);
userRouter.route('/profile').get(getProfile);


export default userRouter;
