import { CustomError } from '@/constants/error';
import { ProjectModel, TodoModel } from '@/models';
import { IUser } from '@/interfaces/user';
import catchAsync from '@/utils/catch-async';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { CustomRequest } from '@/interfaces/request';
import { QueryFeatures } from '@/utils/query-features';

const invalidQuery = ['sort', 'page', 'limit', 'status']
// server: { deadline: { $gte: ISODate("2021-01-01"), $lt: ISODate("2020-05-01"} }

const getTimeline = catchAsync(async (req: CustomRequest, res: Response, _next: NextFunction) => {
  // check whether user is owner or one of contributor of project
  const { user } = req
  const projectByUser = await ProjectModel.find({ $or: [{ owner: user._id }, { contributors: user._id }] })
  const projectArray = projectByUser.map(project => project._id)

  const { queryObj } = new QueryFeatures(req.query, TodoModel.find({ project: { $in: projectArray } }))
    .filter(invalidQuery)
    .sort()

  const todos = await queryObj

  res.status(200).json({
    status: 'success',
    data: {
      todos,
    }
  })
})

export const timelineControllers = {
  getTimeline,
}