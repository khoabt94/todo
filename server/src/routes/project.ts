import { projectControllers } from '@/controllers';
import express from 'express'
import { todoRouter } from './todo';
import { contributorRouter } from './contributor';


const projectRouter = express.Router();

projectRouter
  .route('/')
  .get(projectControllers.getProjects)
  .post(projectControllers.createProject)

projectRouter
  .route('/:projectId')
  .get(projectControllers.verify, projectControllers.getProject)
  .patch(projectControllers.verify, projectControllers.updateProject)
  .delete(projectControllers.verify, projectControllers.deleteProject)


projectRouter
  .use('/:projectId/todos', projectControllers.verify, todoRouter)

projectRouter
  .use('/:projectId/contributor', projectControllers.verify, contributorRouter)



export { projectRouter }