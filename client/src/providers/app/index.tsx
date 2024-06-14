import useMobileDetection from "@/hooks/utils/use-mobile-device"
import { DesktopPage } from "@/pages"
import { useAuthStore, useSocketStore } from "@/store"
import { ReactNode, useEffect } from "react"
import socket from '@/lib/socket'
import Cookies from "js-cookie"
import { COOKIE_KEY } from "@/constants/cookie-key"
import { useToast } from "@/hooks/utils"
import { Project, Todo } from "@/interfaces"
import { useQueryClient } from "@tanstack/react-query"
import { QUERY_KEY } from "@/constants/query-key"
import { useNavigate } from "react-router-dom"

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const isMobile = useMobileDetection()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
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
      navigate('/')
    });

    socketStore.on('create-todo', ({ todo }: { todo: Todo.Detail }) => {
      toastSuccess(`${todo.creator.name} have been created a todo on project ${todo.project.title}`)
      Promise.all([
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TODO.GET_TODO] }),
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TODO.GET_TODO_STATUS_COUNT] })
      ])
    });


    socketStore.on('update-todo', ({ todo }: { todo: Todo.Detail }) => {
      toastSuccess(`${todo.creator.name} have been update a todo on project ${todo.project.title}`)
      Promise.all([
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TODO.GET_TODO] }),
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TODO.GET_TODO_STATUS_COUNT] })
      ])
    });


    return () => {
      socketStore.off('connect', () => console.log('connect'));
      socketStore.off('disconnect', () => console.log('disconnect'));
      socketStore.off('unauthenticated', () => console.log('unauthenticated'));
      socketStore.off('add-contributor', () => console.log('add-contributor'));
      socketStore.off('remove-contributor', () => console.log('remove-contributor'));
      socketStore.off('create-todo', () => console.log('create-todo'));
      socketStore.off('update-todo', () => console.log('update-todo'));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketStore, user]);

  if (!isMobile) return <DesktopPage />
  else return children
}