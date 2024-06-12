import { Api } from "@/interfaces";
import AxiosInstance from "@/utils/axios";
import queryString from 'query-string';

const BASE_URL = (projectId: string) => `/project/${projectId}/todos`

export const getTodos = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  projectId: string,
  query: Api.TodoApi.GetTodosQuery
): Promise<Api.TodoApi.GetTodosResponse> => {
  return await AxiosInstance.get(`${BASE_URL(projectId)}?${queryString.stringify(query)}`);
};

export const getTodosStatusCount = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: Api.TodoApi.GetTodosStatusCountQuery
): Promise<Api.TodoApi.GetTodosStatusCountResponse> => {
  return await AxiosInstance.get(`${BASE_URL(query.project)}/status-count`);
};

export const createTodo = async (
  data: Api.TodoApi.CreateTodoPayload
): Promise<Api.TodoApi.CreateTodoResponse> => {
  return await AxiosInstance.post(BASE_URL(data.project), data);
};

export const updateTodo = async (
  { project, todo_id, ...data }: Api.TodoApi.UpdateTodoPayload
): Promise<Api.TodoApi.UpdateTodoResponse> => {
  console.log(project);
  return await AxiosInstance.patch(`${BASE_URL(project)}/${todo_id}`, data);
};