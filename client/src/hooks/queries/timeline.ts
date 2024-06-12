import { QUERY_KEY } from "@/constants/query-key"
import { Api } from "@/interfaces"
import { getTimeline } from "@/services"
import { useQuery } from "@tanstack/react-query"


export const useGetTimeline = (query: Api.TodoApi.GetTodosQuery) => {
    return useQuery({
        queryKey: [QUERY_KEY.TIMELINE.GET_TIMELINE, query],
        queryFn: () => getTimeline(query),
    })
}
