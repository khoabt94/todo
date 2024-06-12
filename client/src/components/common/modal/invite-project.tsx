
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAddContributors, useDeleteContributors, useGetProject } from "@/hooks/queries";
import { useToast } from "@/hooks/utils";
import { Common, Project, User } from "@/interfaces";
import { ProjectContributorSchema } from "@/schema";
import { useAuthStore } from "@/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as yup from 'yup'

interface InviteProjectDialogProps extends Common.ModalProps {
  initialValue: Project.Detail
}

interface ContributorItemProps {
  contributor: User.Detail,
  onClickDelete: (_id: string) => void
}

const ContributorItem = ({ contributor, onClickDelete }: ContributorItemProps) => (<div className="w-full justify-between px-4 py-2 shadow flex items-center">
  <div className="flex gap-x-4 items-center">
    <Avatar
      className="mx-auto w-[40px] h-[40px] border-2 border-white shadow-sm flex justify-center items-center"
    >
      <AvatarImage src={contributor.avatar} />
      <AvatarFallback className="bg-gray-300">{contributor.name[0]}</AvatarFallback>
    </Avatar>
    <p>{contributor.name}</p>
  </div>
  <Button
    type="button"
    variant={"ghost"}
    onClick={() => onClickDelete(contributor._id)}
  >
    <Trash2 size={20} strokeWidth={1.5} color='#EE4E4E' />
  </Button>
</div>)


export function InviteProjectDialog({ initialValue, open = true, onClose }: InviteProjectDialogProps) {
  const { mutateAsync: addContributor } = useAddContributors()
  const { mutateAsync: deleteContributor } = useDeleteContributors()
  const { data: projectData, refetch } = useGetProject({
    project_id: initialValue._id,
  })
  const { toastError, toastSuccess } = useToast()
  const { user } = useAuthStore()
  const form = useForm<yup.InferType<typeof ProjectContributorSchema>>({
    defaultValues: {
      email: ''
    },
    resolver: yupResolver(ProjectContributorSchema)
  })

  const onOpenChange = (flag: boolean) => {
    if (!flag) onClose?.()
  }

  const onAddContributor = async (values: yup.InferType<typeof ProjectContributorSchema>) => {
    const { email } = values
    if (user?.email === email) {
      toastError('Cant add this email!')
      return;
    }
    try {
      await addContributor({
        project_id: initialValue._id,
        email
      })
      refetch()
      toastSuccess(`Added contributor with email: ${email}`)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toastError(error.message)
    }

  }

  const onDeleteContributor = async (user_id: string) => {
    try {
      await deleteContributor({
        project_id: initialValue._id,
        user_id,
      })
      refetch()
      toastSuccess(`Deleted contributor!`)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toastError(error.message)
    }

  }

  return (

    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-1/2">
        <DrawerHeader className="mb-5">
          <DrawerTitle>Add contributor to {initialValue.title} project</DrawerTitle>
        </DrawerHeader>
        <DrawerDescription className="px-4 pb-10">
          <Form {...form}>
            <form className="flex flex-col gap-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full flex items-stretch gap-x-1">
                    <div className="w-[80%]">
                      <FormControl>
                        <Input placeholder="Contributor email" {...field} autoComplete="off" />
                      </FormControl>
                      <FormMessage className="mt-1" />
                    </div>
                    <Button
                      type="button"
                      variant='ghost'
                      className="p-0 flex-1 focus:bg-transparent !mt-0 flex items-center justify-center"
                      onClick={form.handleSubmit(onAddContributor)}
                    >
                      <p>Add</p>
                    </Button>
                  </FormItem>

                )}
              />
            </form>
          </Form>
          <div className="mt-4 flex flex-col gap-y-4">
            {projectData?.contributors.length ? (
              projectData?.contributors.map(con => (
                <ContributorItem key={con._id} contributor={con} onClickDelete={onDeleteContributor} />
              ))
            ) : <p className="w-full text-center italic px-4">This project dont have any contributor yet!</p>}
          </div>
        </DrawerDescription>
        <DrawerFooter className="flex w-full gap-x-2 flex-row">
          <Button className="flex-1" onClick={() => onClose?.()}>Done</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

