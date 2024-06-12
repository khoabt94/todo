import { todoControllers } from '@/controllers';
import express from 'express'


const todoRouter = express.Router({ mergeParams: true });

todoRouter
  .route('/')
  .get(todoControllers.getTodos)
  .post(todoControllers.createTodo)

todoRouter
  .route('/status-count')
  .get(todoControllers.getStatusCount)

todoRouter
  .route('/delete-all')
  .delete(todoControllers.deleteAllTodo)

todoRouter
  .route('/:todoId')
  .get(todoControllers.getTodo)
  .patch(todoControllers.updateTodo)
  .delete(todoControllers.deleteTodo)

export { todoRouter }