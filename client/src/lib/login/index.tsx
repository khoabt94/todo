import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { PasswordInput } from '@/components/ui/password-input'
import { LoginFormSchema } from "@/schema"
import * as yup from 'yup'
import { useAuthActions } from "@/hooks/utils"
import { Link } from "react-router-dom";
import { siteConfig } from "@/configs/site"

export function LoginForm() {
    const { login } = useAuthActions()
    const form = useForm<yup.InferType<typeof LoginFormSchema>>({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(LoginFormSchema),
        shouldFocusError: false,
    })

    const onSubmit = async (payload: yup.InferType<typeof LoginFormSchema>) => {
        login(payload)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-6">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Your email" {...field} className='text-base h-[50px]' />
                            </FormControl>
                            <FormMessage className='text-left' />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <PasswordInput placeholder="Your password" {...field} className='text-base h-[50px]' />
                            </FormControl>
                            <FormMessage className='text-left' />
                        </FormItem>
                    )}
                />
                <Link to={siteConfig.paths.forgotPassword()} className="ml-auto -mt-4">
                    Forgot Password
                </Link>
                <Button type="submit" className='mt-5'>Submit</Button>
            </form>
        </Form>
    )
}

