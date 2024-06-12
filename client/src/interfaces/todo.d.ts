import { Priority, Status } from "@/enums"
import { Project } from "./project"

/* eslint-disable @typescript-eslint/no-unused-vars */
export namespace Todo {
    interface Detail {
        _id: string
        createdAt: string
        deadline: string
        should_notify: boolean
        title: string
        updatedAt: string
        description: string
        status: Status
        priority: Priority
        project: Project.Detail
    }

    interface StatusCount {
        count: number
        percentage: number
        status: Status
    }
}