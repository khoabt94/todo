import { Schema, model } from "mongoose";
import slugify from 'slugify'


const ProjectSchema = new Schema({
  title: {
    type: String,
    required: [true, 'A Project must have a title'],
  },
  imageCover: {
    type: String,
    required: [true, 'A Project must have an image cover'],
  },
  description: {
    type: String,
    required: [true, 'A Project must have a description'],
  },
  slug: {
    type: String
  },
  owner: {
    type: Schema.ObjectId,
    ref: 'User',
    required: [true, 'A Project must belong to an user'],
  },
  contributors: {
    type: [Schema.ObjectId],
    ref: 'User',
  },
  total_todos: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// ProjectSchema.index({ title: 1, owner: 1 }, { unique: true })

ProjectSchema.pre(/^find/, function (next) {
  (this as any).populate('contributors', 'name email _id avatar').populate('owner', 'name email _id avatar')
  next();
})

ProjectSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true })
  next();
})

export const ProjectModel = model("Project", ProjectSchema);

