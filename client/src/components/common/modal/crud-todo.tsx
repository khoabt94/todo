import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer"
import { useCreateTodo, useUpdateTodo } from "@/hooks/queries"
import { useToast } from "@/hooks/utils"
import { Api, Common, Todo } from "@/interfaces"
import { CreatTodoForm } from "@/lib/todo/create-form"
import { useRef } from "react"

type CreateTodoPayload = Omit<Api.TodoApi.CreateTodoPayload, 'project'>

interface CreateTodoFormRef {
  getData: () => CreateTodoPayload
}

interface CRUDTodoModalProps extends Common.ModalProps {
  initialValue: Todo.Detail
  projectId: string
}

enum MODE {
  CREATE = 'CREATE',
  EDIT = 'EDIT'
}

export function CRUDTodoModal({ initialValue, open = true, onClose, projectId }: CRUDTodoModalProps) {
  const { toastError, toastSuccess } = useToast()
  const createTodoFormRef = useRef<CreateTodoFormRef>(null)
  const { mutateAsync: createTodoAsync } = useCreateTodo()
  const { mutateAsync: updateTodoAsync } = useUpdateTodo()

  const onSubmit = async () => {
    try {
      const payload = await createTodoFormRef.current?.getData();
      if (!payload) return;
      const mode = initialValue ? MODE.EDIT : MODE.CREATE
      if (mode === MODE.EDIT) {
        await updateTodoAsync({
          todo_id: initialValue._id,
          ...payload,
          project: projectId,
        })
        toastSuccess("Update todo successfully!")
      } else {
        await createTodoAsync({
          ...payload,
          project: projectId,
        })
        toastSuccess("Create todo successfully!")
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
          <DrawerTitle>{initialValue ? 'Update Todo' : 'Create New Todo'}</DrawerTitle>
        </DrawerHeader>
        <DrawerDescription className="px-4 pb-10">
          <CreatTodoForm
            ref={createTodoFormRef}
            initialValue={initialValue}
          />
        </DrawerDescription>
        <DrawerFooter className="flex w-full gap-x-2 flex-row">
          <Button variant="outline" className="flex-1" onClick={() => onClose?.()}>Cancel</Button>
          <Button className="flex-1" onClick={onSubmit}>Submit</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
