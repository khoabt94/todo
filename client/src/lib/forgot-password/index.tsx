import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuthActions } from "@/hooks/utils"
import { ForgotPasswordFormSchema } from "@/schema"
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

export function ForgotPasswordForm() {
    const { createResetPasswordToken } = useAuthActions()
    const form = useForm<yup.InferType<typeof ForgotPasswordFormSchema>>({
        defaultValues: {
            email: '',
        },
        resolver: yupResolver(ForgotPasswordFormSchema),
        shouldFocusError: false,
    })

    const onSubmit = async (payload: yup.InferType<typeof ForgotPasswordFormSchema>) => {
        await createResetPasswordToken(payload)
        form.reset()
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

                <Button type="submit" className='mt-5' disabled={form.formState.isSubmitting}>Submit</Button>
            </form>
        </Form>
    )
}

