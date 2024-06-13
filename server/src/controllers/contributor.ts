import { CustomError } from '@/constants/error';
import { CustomRequest } from '@/interfaces/request';
import { IUser } from '@/interfaces/user';
import { ProjectModel, TodoModel, UserModel } from '@/models';
import catchAsync from '@/utils/catch-async';
import { io } from '@/utils/init/socket';
import { NextFunction, Request, Response } from 'express';

const addContributor = catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { user, project } = req
  const { email } = req.body

  if (email === user.email) {
    return next(new CustomError({
      message: "Can not add this email",
      statusCode: 400
    }))
  }

  /// check email is a user
  const findUser = await UserModel.findOne({ email })



  if (!findUser) {
    return next(new CustomError({
      message: "Not found any user with this email",
      statusCode: 400
    }))
  }

  /// check email already exist on contributors
  const isContributor = project.contributors.includes(findUser._id)


  if (isContributor) {
    return next(new CustomError({
      message: "This user already in contributors list",
      statusCode: 400
    }))
  }

  const newProject = await ProjectModel.findByIdAndUpdate(req.params.projectId, {
    contributors: [...project.contributors, findUser._id]
  }, {
    new: true,
  })
  io.emit('add-contributor', { project: newProject })
  res.status(201).json({
    status: 'success',
    data: {
      project: newProject
    }
  })

})

const deleteContributor = catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { project } = req
  const { contributorId } = req.params

  /// check email already exist on contributors
  const isContributor = !!project.contributors.find((con: any) => con._id.equals(contributorId))

  if (!isContributor) {
    return next(new CustomError({
      message: 'This user not in contributors list',
      statusCode: 401,
    }))
  }

  const newProject = await ProjectModel.findByIdAndUpdate(req.params.projectId, {
    contributors: project.contributors.filter((con: any) => !con._id.equals(contributorId))
  }, {
    new: true,
  })

  io.emit('remove-contributor', { project: newProject })
  res.status(201).json({
    status: 'success',
    data: {
      project: newProject
    }
  })

})

export const contributorControllers = {
  addContributor,
  deleteContributor
}