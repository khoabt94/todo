import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle
} from "@/components/ui/drawer"
import { siteConfig } from "@/configs/site"
import { useCreateProject, useUpdateProject } from "@/hooks/queries"
import { useToast } from "@/hooks/utils"
import { Api, Common, Project } from "@/interfaces"
import { CreatProjectForm } from "@/lib/project/create-form"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"

type CreateProjectPayload = Api.ProjectApi.CreateProjectPayload

interface CreateProjectFormRef {
    getData: () => CreateProjectPayload
}

interface CRUDTodoModalProps extends Common.ModalProps {
    initialValue: Project.Detail
}

enum MODE {
    CREATE = 'CREATE',
    EDIT = 'EDIT'
}

export function CRUDProjectModal({ initialValue, open = true, onClose }: CRUDTodoModalProps) {
    const { toastError, toastSuccess } = useToast()
    const navigate = useNavigate()
    const createProjectFormRef = useRef<CreateProjectFormRef>(null)
    const { mutateAsync: createProjectAsync } = useCreateProject()
    const { mutateAsync: updateProjectAsync } = useUpdateProject()
    const onSubmit = async () => {
        try {
            const payload = await createProjectFormRef.current?.getData();
            if (!payload) return;

            const mode = initialValue ? MODE.EDIT : MODE.CREATE
            if (mode === MODE.EDIT) {
                await updateProjectAsync({
                    project_id: initialValue._id,
                    ...payload
                })
                navigate(siteConfig.paths.project(initialValue._id))
                toastSuccess("Update project successfully!")
            } else {
                const res = await createProjectAsync(payload)
                toastSuccess("Create project successfully!")
                navigate(siteConfig.paths.project(res.project._id))

            }

            onClose?.()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toastError(error.message)
        }
    }

    const onOpenChange = (flag: boolean) => {
        if (!flag) onClose?.()
    }

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{initialValue ? `Update ${initialValue.title} Project` : 'Create New Project'}</DrawerTitle>
                </DrawerHeader>
                <DrawerDescription className="px-4 pb-10">
                    <CreatProjectForm ref={createProjectFormRef} initialValue={initialValue} />
                </DrawerDescription>
                <DrawerFooter className="flex w-full gap-x-2 flex-row">
                    <Button variant="outline" className="flex-1" onClick={() => onClose?.()}>Cancel</Button>
                    <Button className="flex-1" onClick={onSubmit}>Submit</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
