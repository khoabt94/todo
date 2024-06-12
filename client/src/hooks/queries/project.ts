import { QUERY_KEY } from "@/constants/query-key"
import { Api } from "@/interfaces"
import { ReactQuery } from "@/interfaces/react-query"
import { addContributors, createProject, deleteContributors, deleteProject, getProject, getProjects, updateProject } from "@/services"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useGetProjects = (query: any, options: ReactQuery.Options) => {
    return useQuery<Api.ProjectApi.GetProjectsResponse>({
        queryKey: [QUERY_KEY.PROJECT.GET_PROJECTS, query],
        queryFn: getProjects,
        ...options
    })
}

export const useGetProject = ({ project_id }: Api.ProjectApi.GetProjectQuery) => {
    return useQuery<Api.ProjectApi.GetProjectResponse>({
        queryKey: [QUERY_KEY.PROJECT.GET_PROJECT, { project_id }],
        queryFn: () => getProject(project_id)
    })
}


export const useCreateProject = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: [QUERY_KEY.PROJECT.CREATE_PROJECT],
        mutationFn: createProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PROJECT.GET_PROJECTS] })
        },
    })
}

export const useUpdateProject = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: [QUERY_KEY.PROJECT.UPDATE_PROJECT],
        mutationFn: updateProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PROJECT.GET_PROJECTS] })
        },
    })
}

export const useDeleteProject = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: [QUERY_KEY.PROJECT.DELETE_PROJECT],
        mutationFn: deleteProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PROJECT.GET_PROJECTS] })
        },
    })
}

export const useAddContributors = () => {

    return useMutation({
        mutationKey: [QUERY_KEY.PROJECT.UPDATE_PROJECT],
        mutationFn: addContributors,
    })
}

export const useDeleteContributors = () => {

    return useMutation({
        mutationKey: [QUERY_KEY.PROJECT.UPDATE_PROJECT],
        mutationFn: deleteContributors,
    })
}