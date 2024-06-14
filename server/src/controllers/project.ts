import { CustomError } from '@/constants/error';
import { CustomRequest } from '@/interfaces/request';
import { ProjectModel, TodoModel, UserModel } from '@/models';
import catchAsync from '@/utils/catch-async';
import { NextFunction, Request, Response } from 'express';

const getProjects = catchAsync(async (req: CustomRequest, res: Response) => {
  const { user } = req
  const projects = await ProjectModel.find({ $or: [{ owner: user._id }, { contributors: user._id }] })

  res.status(200).json({
    status: 'success',
    data: {
      projects
    }
  })
})

const getProject = catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { project } = req

  res.status(200).json({
    status: 'success',
    data: project
  })
})

const createProject = catchAsync(async (req: CustomRequest, res: Response) => {
  const newProject = await ProjectModel.create({
    ...req.body,
    owner: req.user._id
  })

  res.status(201).json({
    status: 'success',
    data: {
      project: newProject
    }
  })

})

const updateProject = catchAsync(async (req: Request, res: Response) => {
  const newProject = await ProjectModel.findByIdAndUpdate(req.params.projectId, req.body, {
    new: true,
    runValidators: true
  })

  res.status(201).json({
    status: 'success',
    data: {
      project: newProject
    }
  })

})

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  await ProjectModel.findByIdAndDelete(req.params.projectId)
  await TodoModel.deleteMany({ project: req.params.projectId })

  res.status(201).json({
    status: 'success',
  })
})

const verify = catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { user } = req
  const project = await ProjectModel.findById(req.params.projectId)

  if (!project) {
    return next(new CustomError({
      message: 'Project not found',
      statusCode: 400,
    }))
  }

  if (!project.owner.equals(user._id) && !project.contributors.find((con: any) => con._id.equals(user._id))) {
    return next(new CustomError({
      message: 'You cant view a project that you are not joined',
      statusCode: 401,
    }))
  }
  req.project = project
  next()
})

export const projectControllers = {
  getProjects,
  createProject,
  getProject,
  updateProject,
  deleteProject,
  verify,
}