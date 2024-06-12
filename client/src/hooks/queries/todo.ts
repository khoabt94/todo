import { QUERY_KEY } from "@/constants/query-key"
import { Api } from "@/interfaces"
import { createTodo, getTodos, getTodosStatusCount, updateTodo } from "@/services"
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const useGetTodos = (query: Api.TodoApi.GetTodosQuery) => {
//     return useQuery<Api.TodoApi.GetTodosResponse>({
//         queryKey: [QUERY_KEY.TODO.GET_TODO, query],
//         queryFn: () => getTodos(query)
//     })
// }

export const useGetTodos = (projectId: string, query: Api.TodoApi.GetTodosQuery) => {
    return useInfiniteQuery({
        queryKey: [QUERY_KEY.TODO.GET_TODO, query],
        queryFn: ({ pageParam = 1 }) => getTodos(projectId, { ...query, page: pageParam as number }),
        initialPageParam: 1,
        getNextPageParam: ({ page, limit, total }) => page * limit < total ? page + 1 : undefined,

    })
}

export const useGetTodosStatusCount = (query: Api.TodoApi.GetTodosStatusCountQuery) => {
    return useQuery({
        queryKey: [QUERY_KEY.TODO.GET_TODO_STATUS_COUNT, query],
        queryFn: () => getTodosStatusCount(query),
    })
}


export const useCreateTodo = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: [QUERY_KEY.TODO.CREATE_TODO],
        mutationFn: createTodo,
        onSuccess: () => Promise.all([
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TODO.GET_TODO] }),
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TODO.GET_TODO_STATUS_COUNT] })
        ]),
    })
}

export const useUpdateTodo = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: [QUERY_KEY.TODO.UPDATE_TODO],
        mutationFn: updateTodo,
        onSuccess: () => Promise.all([
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TODO.GET_TODO] }),
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TODO.GET_TODO_STATUS_COUNT] })
        ]),
    })
}