import { timelineControllers } from '@/controllers';
import express from 'express'


const timelineRouter = express.Router();

timelineRouter
  .route('/todos')
  .get(timelineControllers.getTimeline)

export { timelineRouter }