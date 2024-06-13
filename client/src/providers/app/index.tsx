import useMobileDetection from "@/hooks/utils/use-mobile-device"
import { DesktopPage } from "@/pages"
import { useAuthStore, useSocketStore } from "@/store"
import { ReactNode, useEffect } from "react"
import socket from '@/lib/socket'
import Cookies from "js-cookie"
import { COOKIE_KEY } from "@/constants/cookie-key"
import { useToast } from "@/hooks/utils"
import { Project } from "@/interfaces"
import { useQueryClient } from "@tanstack/react-query"
import { QUERY_KEY } from "@/constants/query-key"

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const isMobile = useMobileDetection()
  const queryClient = useQueryClient()
  const { setSocket, socket: socketStore } = useSocketStore()
  const { user } = useAuthStore()
  const { toastSuccess } = useToast()

  useEffect(() => {
    setSocket(socket)
  }, [])

  useEffect(() => {
    if (!socketStore || !user) return;
    const access_token = Cookies.get(COOKIE_KEY.ACCESS_TOKEN)
    socketStore.emit('authenticate', { access_token })
    socketStore.on('unauthenticated', () => socketStore.disconnect());
    socketStore.on('add-contributor', ({ project }: { project: Project.Detail }) => {
      toastSuccess(`You have been added to project ${project.title}`)
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PROJECT.GET_PROJECTS], refetchType: 'all' })
    });

    socketStore.on('remove-contributor', ({ project }: { project: Project.Detail }) => {
      toastSuccess(`You have been removed from project ${project.title}`)
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PROJECT.GET_PROJECTS], refetchType: 'all' })
    });


    return () => {
      socketStore.off('connect', () => console.log('disconnect'));
      socketStore.off('disconnect', () => console.log('disconnect'));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketStore, user]);

  if (!isMobile) return <DesktopPage />
  else return children
}