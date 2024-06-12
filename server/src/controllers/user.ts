import { CustomError } from '@/constants/error';
import { UserModel } from '@/models';
import { IUser } from '@/interfaces/user';
import catchAsync from '@/utils/catch-async';
import { signToken } from '@/utils/sign-token';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken'
import { CustomRequest } from '@/interfaces/request';
import sendEmail from '@/utils/send-email';
import crypto from 'crypto'

const verify = catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
  // sanitize query object
  const { authorization } = req.headers

  if (!authorization || !(authorization.startsWith('Bearer'))) {
    return next(new CustomError({
      message: "Please login to get access this url",
      statusCode: 401
    }))
  }

  const receivedToken = authorization.replace('Bearer ', '')

  const decoded = jwt.verify(receivedToken, process.env.JWT_SECRET_KEY as string) as JwtPayload
  const user = await UserModel.findById(decoded.id).select('+password')

  if (!user) {
    return next(new CustomError({
      message: "Invalids token. Please login to get access this url",
      statusCode: 404
    }))
  }

  req.user = user;
  next();
})

const signup = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  const { name, email, password } = req.body;

  const user = await UserModel.find({ email })
  if (user.length) {
    return next(new CustomError({
      message: "Email existing in our system!",
      statusCode: 400
    }))
  }

  // sanitize query object
  const newUser = await UserModel.create({
    name, email, password
  })


  const access_token = signToken({ userId: newUser._id })

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
      access_token,
    }
  })
})

const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // sanitize query object
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new CustomError({
      message: "Please provide your credientials",
      statusCode: 401
    }))
  }

  const user = await UserModel.findOne({ email }).select('+password')

  if (!user || !(await user.comparePasswords(password, user.password))) {
    return next(new CustomError({
      message: "Invalids credentials",
      statusCode: 404
    }))
  }

  const clonedUser: Partial<Pick<IUser, "password">> = user
  clonedUser.password = undefined

  const access_token = signToken({ userId: user._id })

  res.status(200).json({
    status: 'success',
    data: {
      user: clonedUser,
      access_token,
    }
  })
})

const refreshToken = catchAsync(async (req: CustomRequest, res: Response, _next: NextFunction) => {
  const { user } = req
  const access_token = signToken({ userId: user._id })
  res.status(200).json({
    status: 'success',
    data: {
      access_token,
    }
  })
})

const getMyInfo = catchAsync(async (req: CustomRequest, res: Response, _next: NextFunction) => {
  const { user } = req
  res.status(200).json({
    status: 'success',
    data: {
      user,
    }
  })
})

const createPasswordResetToken = catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { email } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return next(new CustomError({
      message: "No user exist with this email",
      statusCode: 404,
    }))
  }

  const token = user.createPasswordResetToken()
  await user.save({ validateBeforeSave: false });

  try {
    await sendEmail({
      from: "Todo App",
      to: email,
      subject: "Your password reset link (expire in 10 minutes)",
      text: `Please click the following link to reset password. The link will be valid for 10 minutes. \nhttp://localhost:5173/reset-password/${token}`
    })
    res.status(200).json({
      status: 'success',
    })
  } catch (error) {
    user.passwordResetToken = undefined
    user.passwordResetTokenExpire = undefined
    await user.save({ validateBeforeSave: false });

    return next(new CustomError({
      statusCode: 500,
      message: "There is a problem when sending email!"
    }))
  }




})

const resetPassword = catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { password } = req.body;
  const { resetToken } = req.params;
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex')

  const user = await UserModel.findOne({ passwordResetToken: hashedToken });

  if (!user || (new Date() > new Date(user.passwordResetTokenExpire as Date))) {
    return next(new CustomError({
      message: "Invalid token",
      statusCode: 401,
    }))
  }

  user.password = password;
  user.passwordResetToken = undefined
  user.passwordResetTokenExpire = undefined
  await user.save();

  res.status(201).json({
    status: 'success',
    message: 'Reset password successfully! Please log in',
  })
})

const updateMyInfo = catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { user } = req
  const { name, avatar } = req.body
  const updatedUser = await UserModel.findByIdAndUpdate(user._id, {
    name, avatar
  }, {
    new: true,
    runValidators: true
  })

  res.status(201).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  })

})

const changePassword = catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { old_password, new_password } = req.body
  const user = await UserModel.findById(req.user._id).select('+password')
  if (!user || !(await user.comparePasswords(old_password, user.password))) {
    return next(new CustomError({
      message: "Invalids current password",
      statusCode: 400
    }))
  }
  user.password = new_password;
  await user.save();
  const access_token = signToken({ userId: user._id })
  res.status(201).json({
    status: 'success',
    message: 'Change password successfully!',
    data: { access_token }
  })

})


export const userControllers = {
  signup,
  login,
  verify,
  refreshToken,
  getMyInfo,
  createPasswordResetToken,
  resetPassword,
  updateMyInfo,
  changePassword,
}