import { Button } from "@/components/ui/button"
import { SheetTrigger } from "@/components/ui/sheet"
import { useOpenModal } from "@/hooks/utils"
import { cn } from "@/utils/tailwind"
import { AlignJustify, CirclePlus } from "lucide-react"
import { CRUDTodoModal } from "@/components/common/modal"
import { useAuthStore } from "@/store"
import { useLocation } from "react-router-dom"
import { useMemo } from "react"

const pathToHideCreateTodoBtn = [
  '/timeline'
]

export default function Navbar() {
  const { open } = useOpenModal()
  const location = useLocation()
  const { user } = useAuthStore()
  const openCreateTodoDrawer = () => {
    open(CRUDTodoModal, {
      projectId: (location.pathname).split('/').pop()
    })
  }

  const shouldHideBtn = useMemo(() => {
    return pathToHideCreateTodoBtn.some(path => location.pathname.includes(path))
  }, [location.pathname])

  return (
    <div className={cn('flex px-4 py-2 w-full justify-between items-center transition-all border-b-[1px] border-b-gray-600 fixed top-0 backdrop-blur-xl z-50')}>
      {user ? (<SheetTrigger>
        <AlignJustify />
      </SheetTrigger>) : null}
      <img src="/public/logo.png" alt="logo" className="h-10 w-fit mx-auto" />
      {(user && !shouldHideBtn) ? (<Button
        type="button"
        variant={"ghost"}
        onClick={openCreateTodoDrawer}
        className="pr-0"
      >
        <CirclePlus />
      </Button>) : null}

    </div>
  )
}
