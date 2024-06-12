import { useAuthStore } from "@/store"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UpdateInfoSchema } from '@/schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useUpdateMyInfo } from "@/hooks/queries"
import { useToast, useUploadFile } from "@/hooks/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChangeEvent, useRef } from "react"
import { Loader } from "lucide-react"

export function AccountInfoPage() {
  const { user } = useAuthStore()
  const { toastSuccess, toastError } = useToast()
  const { mutateAsync: updateMyInfo } = useUpdateMyInfo()
  const avatarInputRef = useRef<HTMLInputElement>(null)
  const form = useForm<yup.InferType<typeof UpdateInfoSchema>>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      avatar: user?.avatar
    },
    resolver: yupResolver(UpdateInfoSchema),
    shouldFocusError: false,
  })
  const { uploadFile, isUploading } = useUploadFile()
  const currentAvatar = form.watch('avatar')
  const onSubmit = async (payload: yup.InferType<typeof UpdateInfoSchema>) => {
    try {
      await updateMyInfo(payload)
      toastSuccess("Update info successfully!")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toastError(error.message)
    }
  }

  const onClickAvatar = () => {
    if (avatarInputRef && avatarInputRef.current) avatarInputRef.current.click()
  }

  const handleUploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      await uploadFile(file, (imageUrl: string) => form.setValue('avatar', imageUrl))
    }
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h3 className="text-xl text-center">Hello <span className="font-bold capitalize">{user?.name}</span>!</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-4 mt-4">
          <Avatar
            className="mx-auto w-[80px] h-[80px] border-2 border-white shadow flex justify-center items-center"
            onClick={onClickAvatar}
          >
            {isUploading ? <Loader /> : (
              <>
                <AvatarImage src={currentAvatar} />
                <AvatarFallback className="bg-gray-300">{user?.name[0]}</AvatarFallback>
              </>
            )}
          </Avatar>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Your name" {...field} className='text-base h-[50px]' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Your email" disabled {...field} className='text-base h-[50px]' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <Button type="submit" className='mt-5' disabled={form.formState.isSubmitting}>Update Info</Button>
        </form>
      </Form>
      <input type="file" ref={avatarInputRef} className="hidden" onChange={handleUploadFile} />
    </div>

  )
}
