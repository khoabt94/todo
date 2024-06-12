import { Api } from "@/interfaces";
import AxiosInstance from "@/utils/axios";

const BASE_URL = '/user'

export const getMyInfo = async (
): Promise<Api.UserApi.GetUserInfoResponse> => {
  return await AxiosInstance.get(`${BASE_URL}/my-info`);
};

export const updateMyInfo = async (
  payload: Api.UserApi.UpdateUserInfoPayload
): Promise<Api.UserApi.GetUserInfoResponse> => {
  return await AxiosInstance.patch(`${BASE_URL}/my-info`, payload);
};

export const changePassword = async (
  payload: Api.UserApi.ChangePasswordPayload
): Promise<Api.UserApi.ChangePasswordResponse> => {
  return await AxiosInstance.patch(`${BASE_URL}/change-password`, payload);
};