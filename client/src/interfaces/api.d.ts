import { Status } from "@/enums"
import { Project } from "./project"
import { Todo } from "./todo"
import { Common } from "./common"
import { User } from "./user"

/* eslint-disable @typescript-eslint/no-unused-vars */
export namespace Api {

  namespace TodoApi {
    interface CreateTodoPayload {
      title: string
      should_notify: boolean
      deadline: Date | undefined
      priority: Priority
      description: string
      project: string
    }
    interface CreateTodoResponse {

    }

    interface GetTodosQuery {
      project?: string
      page?: number
      limit?: number
      deadline?: {
        gte: string,
        lte: string
      },
      sort?: string,
      status?: string
    }


    interface GetTodosStatusCountQuery {
      project: string
    }

    interface GetTodosStatusCountResponse {
      statusCount: Todo.StatusCount[]
    }

    interface GetTodosResponse extends Common.Pagination {
      todos: Todo.Detail[]
    }

    interface UpdateTodoPayload {
      todo_id: string
      title?: string
      should_notify?: boolean
      deadline?: Date | undefined
      priority?: Priority
      status?: Status
      description?: string
      project: string
    }

    interface UpdateTodoResponse {

    }
  }

  namespace ProjectApi {
    interface CreateProjectPayload {
      title: string
      description: string
      imageCover: string
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      imageFile?: any
    }

    interface UpdateProjectPayload {
      title: string
      description: string
      imageCover: string
      project_id: string
    }
    interface CreateProjectResponse {
      project: Project.Detail
    }

    interface UpdateProjectResponse {

    }
    interface GetProjectsResponse {
      projects: Project.Detail[]
    }

    interface GetProjectQuery {
      project_id: string
    }

    interface GetProjectResponse extends Project.Detail {
    }


    interface AddContributorPayload {
      project_id: string
      email: string
    }

    interface DeleteContributorPayload {
      project_id: string
      user_id: string
    }

    interface AddContributorResponse extends Project.Detail {
    }

    interface DeleteContributorResponse extends Project.Detail {
    }
  }

  namespace UserApi {

    interface UpdateUserInfoPayload {
      name?: string
      avatar?: string
    }

    interface ChangePasswordPayload {
      old_password: string,
      new_password: string,
    }
    interface GetUserInfoResponse {
      user: User.Detail,
      access_token: string
    }

    interface ChangePasswordResponse {
      access_token: string
    }
  }

  namespace AuthApi {

    interface LoginPayload {
      email: string
      password: string
    }

    interface CreateResetPasswordPayload {
      email: string
    }

    interface ResetPasswordPayload {
      password: string
    }

    interface CreateResetPasswordResponse {
    }

    interface ResetPasswordResponse {
    }

    interface SignUpPayload {
      name: string
      email: string
      password: string
    }

    interface LoginResponse {
      user: User.Detail,
      access_token: string
    }

    interface RefereshTokenResponse {
      access_token: string
    }


    interface SignupResponse {
      user: User.Detail,
      access_token: string
    }


  }

}