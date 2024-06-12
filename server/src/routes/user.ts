import { userControllers } from '@/controllers';
import express from 'express'


const userRouter = express.Router();

userRouter
  .route('/signup')
  .post(userControllers.signup)

userRouter
  .route('/login')
  .post(userControllers.login)

userRouter
  .route('/forgot-password')
  .post(userControllers.createPasswordResetToken)

userRouter
  .route('/reset-password/:resetToken')
  .post(userControllers.resetPassword)

userRouter.use(userControllers.verify)

userRouter
  .route('/refresh-token')
  .post(userControllers.refreshToken)

userRouter
  .route('/my-info')
  .get(userControllers.getMyInfo)
  .patch(userControllers.updateMyInfo)



userRouter
  .route('/change-password')
  .patch(userControllers.changePassword)



export { userRouter }