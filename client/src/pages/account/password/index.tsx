import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { PasswordInput } from "@/components/ui/password-input"
import { COOKIE_KEY } from "@/constants/cookie-key"
import { useChangePassword } from "@/hooks/queries"
import { useToast } from "@/hooks/utils"
import { ChangePasswordSchema } from '@/schema'
import { yupResolver } from '@hookform/resolvers/yup'
import Cookies from "js-cookie"
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

export function AccountPasswordPage() {
  const { toastSuccess, toastError } = useToast()
  const { mutateAsync: changePassword } = useChangePassword()
  const form = useForm<yup.InferType<typeof ChangePasswordSchema>>({
    defaultValues: {
      old_password: '',
      new_password: '',
      confirm_password: ''
    },
    resolver: yupResolver(ChangePasswordSchema),
    shouldFocusError: false,
  })

  const onSubmit = async ({ new_password, old_password }: yup.InferType<typeof ChangePasswordSchema>) => {
    try {
      const res = await changePassword({
        new_password,
        old_password
      })
      toastSuccess("Change password successfully!")
      Cookies.set(COOKIE_KEY.ACCESS_TOKEN, res.access_token)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toastError(error.message)
    } finally {
      form.reset()
    }
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h3 className="text-xl text-center">Change your password</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-4 mt-4">
          <FormField
            control={form.control}
            name="old_password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput placeholder="Your password" {...field} className='text-base h-[50px]' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="new_password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput placeholder="Your password" {...field} className='text-base h-[50px]' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput placeholder="Confirm password" {...field} className='text-base h-[50px]' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className='mt-5' disabled={form.formState.isSubmitting}>Change password</Button>
        </form>
      </Form>
    </div >

  )
}
