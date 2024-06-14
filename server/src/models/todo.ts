import { Priority, Status } from "@/constants";
import { ITodo } from "@/interfaces/todo";
import mongoose, { Schema, model } from "mongoose";
import { ProjectModel } from "./project";

const TodoSchema = new Schema({
  title: {
    type: String,
    required: [true, 'A Todo must have a title'],
    unique: true,
    maxlength: [50, 'Todo title should not have more than 50 characters'],
    minlength: [10, 'Todo title should not have less than 10 characters'],
  },
  deadline: {
    type: Date,
    required: [true, 'A Todo must have a deadline'],
  },
  should_notify: {
    type: Boolean,
    default: true,
  },
  priority: {
    type: Number,
    enum: {
      values: Priority,
      message: 'Priority is either: 0, 1, 2'
    }
  },
  description: {
    type: String,
    required: [true, 'A Todo must have a description'],
  },
  project: {
    type: Schema.ObjectId,
    ref: 'Project',
    required: [true, 'A Todo must belong to a project'],
  },
  status: {
    type: String,
    enum: Status,
    default: Status.TODO
  },
  creator: {
    type: Schema.ObjectId,
    ref: 'User',
    required: [true, 'A Todo must belong to an user'],
  }

}, {
  timestamps: true
})

TodoSchema.index({ status: 1 });

TodoSchema.pre(/^find/, function (next) {
  //@ts-ignore
  this.populate('project').populate('creator', 'name email _id avatar')
  next()
})

TodoSchema.statics.calculateTotalTodosInProject = async function (todo: ITodo) {
  const total = await this.find({ project: todo.project }).count()

  await ProjectModel.findByIdAndUpdate(todo.project, {
    total_todos: total
  })
}

TodoSchema.pre('save', async function (next) {
  (this.constructor as any).calculateTotalTodosInProject(this)
  next()
})


export const TodoModel = model("Todo", TodoSchema);

