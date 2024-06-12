import { Priority, Status } from "@/constants"
import mongoose from "mongoose"

export interface ITodo {
    title: string
    deadline: Date
    should_notify: boolean
    priority: Priority
    description: string
    project: mongoose.ObjectId
    status: Status
    creator: mongoose.ObjectId
}