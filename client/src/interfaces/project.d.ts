import { User } from "./user"

/* eslint-disable @typescript-eslint/no-unused-vars */
export namespace Project {
    interface Detail {
        _id: string
        createdAt: string
        imageCover: string
        title: string
        updatedAt: string
        description: string
        owner: string
        contributors: User.Detail[]
    }
}