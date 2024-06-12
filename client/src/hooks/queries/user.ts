import { QUERY_KEY } from "@/constants/query-key"
import { Api } from "@/interfaces"
import { changePassword, getMyInfo, updateMyInfo } from "@/services"
import { useAuthStore } from "@/store"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useGetMyInfo = () => {
  return useQuery<Api.UserApi.GetUserInfoResponse>({
    queryKey: [QUERY_KEY.USER.GET_MY_INFO],
    queryFn: getMyInfo
  })
}

export const useUpdateMyInfo = () => {
  const { setUser } = useAuthStore()
  return useMutation({
    mutationKey: [QUERY_KEY.USER.UPDATE_MY_INFO],
    mutationFn: updateMyInfo,
    onSuccess: (data) => {
      setUser(data.user)
    },
  })
}

export const useChangePassword = () => {
  return useMutation({
    mutationKey: [QUERY_KEY.USER.CHANGE_PASSWORD],
    mutationFn: changePassword,
  })
}