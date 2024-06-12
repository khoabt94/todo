import { Api } from "@/interfaces";
import AxiosInstance from "@/utils/axios";
import queryString from 'query-string';

const BASE_URL = '/timeline/todos'

export const getTimeline = async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    query: Api.TodoApi.GetTodosQuery
): Promise<Api.TodoApi.GetTodosResponse> => {
    return await AxiosInstance.get(`${BASE_URL}?${queryString.stringify(query)}`);
};