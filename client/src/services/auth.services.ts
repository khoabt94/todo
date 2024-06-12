import { Api } from "@/interfaces";
import AxiosInstance from "@/utils/axios";

const BASE_URL = '/user'

export const signup = async (
    payload: Api.AuthApi.SignUpPayload
): Promise<Api.AuthApi.SignupResponse> => {
    return await AxiosInstance.post(`${BASE_URL}/signup`, payload);
};

export const login = async (
    payload: Api.AuthApi.LoginPayload
): Promise<Api.AuthApi.LoginResponse> => {
    return await AxiosInstance.post(`${BASE_URL}/login`, payload);
};


export const refreshToken = async (
): Promise<Api.AuthApi.RefereshTokenResponse> => {
    return await AxiosInstance.post(`${BASE_URL}/refresh-token`);
};

export const createResetPasswordToken = async (
    payload: Api.AuthApi.CreateResetPasswordPayload
): Promise<Api.AuthApi.CreateResetPasswordResponse> => {
    return await AxiosInstance.post(`${BASE_URL}/forgot-password`, payload);
};

export const resetPassword = async (
    reset_token: string,
    payload: Api.AuthApi.ResetPasswordPayload
): Promise<Api.AuthApi.ResetPasswordResponse> => {
    return await AxiosInstance.post(`${BASE_URL}/reset-password/${reset_token}`, payload);
};

