import { Routes } from '@/constants';
import { CustomError } from '@/constants/error';
import { userControllers } from '@/controllers';
import { todoRouter, projectRouter, userRouter, timelineRouter } from '@/routes';
import { Express } from 'express';

export default (app: Express) => {
  app.use(Routes.user, userRouter)
  app.all('*', userControllers.verify)
  app.use(Routes.project, projectRouter)
  app.use(Routes.timeline, timelineRouter)


  app.all('*', (req, _res, _next) => {
    throw new CustomError({
      message: `Can't access ${req.originalUrl} on this server!`,
      statusCode: 404,
    })
  })
}