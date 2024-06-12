import { Api } from "@/interfaces";
import AxiosInstance from "@/utils/axios";

const BASE_URL = '/project'

export const getProjects = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<Api.ProjectApi.GetProjectsResponse> => {
  return await AxiosInstance.get(BASE_URL);
};


export const getProject = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  project_id: string
): Promise<Api.ProjectApi.GetProjectResponse> => {
  return await AxiosInstance.get(`${BASE_URL}/${project_id}`);
};

export const createProject = async (
  data: Api.ProjectApi.CreateProjectPayload
): Promise<Api.ProjectApi.CreateProjectResponse> => {
  return await AxiosInstance.post(BASE_URL, data);
};

export const updateProject = async (
  { project_id, ...data }: Api.ProjectApi.UpdateProjectPayload
): Promise<Api.ProjectApi.UpdateProjectResponse> => {
  return await AxiosInstance.patch(`${BASE_URL}/${project_id}`, data);
};

export const deleteProject = async (
  project_id: string
): Promise<null> => {
  return await AxiosInstance.delete(`${BASE_URL}/${project_id}`);
};

export const addContributors = async (
  { project_id, ...data }: Api.ProjectApi.AddContributorPayload
): Promise<null> => {
  return await AxiosInstance.post(`${BASE_URL}/${project_id}/contributor`, data);
};

export const deleteContributors = async (
  { project_id, user_id }: Api.ProjectApi.DeleteContributorPayload
): Promise<null> => {
  return await AxiosInstance.delete(`${BASE_URL}/${project_id}/contributor/${user_id}`);
};