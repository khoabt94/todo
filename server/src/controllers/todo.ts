import { CustomError } from '@/constants/error';
import { ProjectModel, TodoModel } from '@/models';
import { IUser, IUserMethods } from '@/interfaces/user';
import catchAsync from '@/utils/catch-async';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { CustomRequest } from '@/interfaces/request';
import { QueryFeatures } from '@/utils/query-features';
import { findUserSocket } from './socket-user';
import { io } from '@/utils/init/socket';

const invalidQuery = ['sort', 'page', 'limit', 'status']
// server: { deadline: { $gte: ISODate("2021-01-01"), $lt: ISODate("2020-05-01"} }

const getTodos = catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { projectId } = req.params

  const { filterObj, pagination, queryObj } = new QueryFeatures(req.query, TodoModel.find({ project: projectId }))
    .filter(invalidQuery)
    .sort()
    .paginate()

  // pagination
  let queryObject = TodoModel.find(filterObj)
  const total = await TodoModel.countDocuments(queryObject)
  const { limit, page } = pagination


  const todos = await queryObj

  res.status(200).json({
    status: 'success',
    data: {
      todos,
      page,
      limit,
      total,
    }
  })
})

const getStatusCount = catchAsync(async (req: Request, res: Response) => {
  const { projectId } = req.params
  const statusCount = await TodoModel.aggregate([
    {
      $match: { project: new mongoose.Types.ObjectId(projectId as string) }
    },
    {
      $facet: {
        "total": [
          {
            $count: 'status'
          }
        ],
        "groupValues": [
          {
            $group: {
              _id: '$status',
              count: { $sum: 1 },
              status: { $first: '$status' }
            }
          }
        ]
      }
    },
    {
      $addFields: {
        "total": {
          $arrayElemAt: [
            "$total",
            0
          ]
        }
      }
    },
    {
      $unwind: "$groupValues"
    },
    {
      $project: {
        _id: 0,
        status: "$groupValues.status",
        count: "$groupValues.count",
        percentage: {
          $round: [
            {
              $multiply: [
                {
                  $divide: ["$groupValues.count", "$total.status"]
                }
                , 100]
            }, 0
          ]
        }
      }
    }
  ]
  )

  res.status(201).json({
    status: 'success',
    data: { statusCount }
  })
})

const getTodo = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const todo = await TodoModel.findById(req.params.todoId)

  if (!todo) {
    return next(new CustomError({
      message: 'No todo found!',
      statusCode: 404,
    }))
  }

  res.status(200).json({
    status: 'success',
    data: todo
  })
})

const createTodo = catchAsync(async (req: CustomRequest, res: Response) => {
  const { projectId } = req.params
  const newTodo = await TodoModel.create({
    ...req.body,
    creator: req.user._id
  })


  io.to(projectId).emit('create-todo', { todo: newTodo })

  res.status(201).json({
    status: 'success',
    data: newTodo
  })

})

const updateTodo = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { projectId } = req.params
  const newTodo = await TodoModel.findByIdAndUpdate(req.params.todoId, req.body, {
    new: true,
    runValidators: true
  })

  if (!newTodo) {
    return next(new CustomError({
      message: 'No todo found!',
      statusCode: 404,
    }))
  }

  io.to(projectId).emit('update-todo', { todo: newTodo })

  res.status(201).json({
    status: 'success',
    data: newTodo
  })

})

const deleteTodo = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const todo = await TodoModel.findByIdAndDelete(req.params.todoId)

  if (!todo) {
    return next(new CustomError({
      message: 'No todo found!',
      statusCode: 404,
    }))
  }

  res.status(201).json({
    status: 'success',
  })
})

const deleteAllTodo = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const todo = await TodoModel.deleteMany({});

  if (!todo) {
    return next(new CustomError({
      message: 'No todo found!',
      statusCode: 404,
    }))
  }

  res.status(201).json({
    status: 'success',
  })
})

export const todoControllers = {
  getTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
  getStatusCount,
  deleteAllTodo
}