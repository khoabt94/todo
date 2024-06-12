import useMobileDetection from "@/hooks/utils/use-mobile-device"
import { DesktopPage } from "@/pages"
import { ReactNode } from "react"

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const isMobile = useMobileDetection()

  if (!isMobile) return <DesktopPage />
  else return children
}