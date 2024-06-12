import {
    Pencil,
    Trash2,
    EllipsisVertical,
    UserPlus
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useOpenModal, useToast } from "@/hooks/utils"
import { DeleteConfirmModal, CRUDProjectModal, InviteProjectDialog } from "@/components/common/modal"
import { Project } from "@/interfaces"
import { useDeleteProject } from "@/hooks/queries"
import { useNavigate } from "react-router-dom"
import { siteConfig } from "@/configs/site"

type Props = {
    project: Project.Detail
    onClick: () => void
}

export function MenuActions({ project, onClick }: Props) {
    const { open } = useOpenModal()
    const { toastError, toastSuccess } = useToast()
    const navigate = useNavigate()
    const { mutateAsync: deleteProject } = useDeleteProject()
    const openUpdateProjectDrawer = () => {
        open(CRUDProjectModal, {
            initialValue: project
        })
        onClick()
    }

    const openDeleteConfirmDialog = () => {
        open(DeleteConfirmModal, {
            onSubmit: async () => {
                try {
                    await deleteProject(project._id)
                    toastSuccess("Delete project successfully!")
                    navigate(siteConfig.paths.home())
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (error: any) {
                    toastError(error.message)
                }
            }
        })
        onClick()
    }

    const openInviteProjectDialog = () => {
        open(InviteProjectDialog, {
            initialValue: project
        })
        onClick()
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="px-0">
                    <EllipsisVertical size={20} strokeWidth={1.5} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
                <DropdownMenuItem className="px-0 py-2">
                    <Button
                        type="button"
                        variant={"ghost"}
                        className='flex flex-row gap-x-3'
                        onClick={openUpdateProjectDrawer}
                    >
                        <Pencil size={20} strokeWidth={1.5} />
                        <span className="text-sm">Edit</span>
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem className="px-0 py-2">
                    <Button
                        type="button"
                        variant={"ghost"}
                        className='flex flex-row gap-x-3'
                        onClick={openInviteProjectDialog}
                    >
                        <UserPlus size={20} strokeWidth={1.5} />
                        <span className="text-sm">Invite</span>
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem className="px-0 py-2">
                    <Button
                        type="button"
                        variant={"ghost"}
                        className='flex flex-row gap-x-3'
                        onClick={openDeleteConfirmDialog}
                    >
                        <Trash2 size={20} strokeWidth={1.5} color='#EE4E4E' />
                        <span className="text-[#EE4E4E]">Delete</span>
                    </Button>
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
