import { ReactNode, useEffect } from "react"
import { useAuthStore } from "@/store"
import AppLoading from "@/components/ui/app-loading"

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const { isFetchingUser, refreshToken, setIsFetchingUser } = useAuthStore()
    const handleRefreshToken = async () => {
        try {
            await refreshToken()
        } catch (error) {
            console.error(error)
        } finally {
            setIsFetchingUser(false)
        }
    }

    useEffect(() => {
        handleRefreshToken()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (isFetchingUser) return <AppLoading />

    return children
}
