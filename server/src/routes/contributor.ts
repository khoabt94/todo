import { contributorControllers } from '@/controllers';
import express from 'express'


const contributorRouter = express.Router({ mergeParams: true });

contributorRouter
  .route('/')
  .post(contributorControllers.addContributor)

contributorRouter
  .route('/:contributorId')
  .delete(contributorControllers.deleteContributor)

export { contributorRouter }