"use client"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { PasswordInput } from '@/components/ui/password-input'
import { siteConfig } from "@/configs/site"
import { useAuthActions, useToast } from '@/hooks/utils'
import { ResetPasswordFormSchema } from '@/schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from "react"
import { useForm } from 'react-hook-form'
import { redirect, useParams } from "react-router-dom"
import * as yup from 'yup'

export function ResetPasswordForm() {
    const { resetPassword } = useAuthActions()
    const { resetTokenId } = useParams()
    const { toastError } = useToast()
    const form = useForm<yup.InferType<typeof ResetPasswordFormSchema>>({
        defaultValues: {
            password: '',
            password_confirm: '',
        },
        resolver: yupResolver(ResetPasswordFormSchema),
        shouldFocusError: false,
    })

    const onSubmit = async (payload: yup.InferType<typeof ResetPasswordFormSchema>) => {
        if (!resetTokenId) {
            toastError("Invalid link")
            return;
        }
        await resetPassword(resetTokenId, payload)
        form.reset()
    }

    useEffect(() => {
        if (!resetTokenId) redirect(siteConfig.paths.login())
    }, [resetTokenId])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-4">

                <FormField
                    control={form.control}
                    name="password"
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
                    name="password_confirm"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <PasswordInput placeholder="Confirm your password" {...field} className='text-base h-[50px]' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className='mt-5' disabled={form.formState.isSubmitting}>Submit</Button>
            </form>
        </Form>
    )
}

