import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUploadFile } from "@/hooks/utils";
import { Project } from "@/interfaces";
import { ProjectFormSchema } from "@/schema";
import * as yup from 'yup';
import { ChangeEvent, forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { cn } from "@/utils/tailwind";
import { Label } from "@/components/ui/label"

type Props = {
    initialValue?: Project.Detail
}

export const CreatProjectForm = forwardRef(({ initialValue }: Props, ref) => {
    const form = useForm<yup.InferType<typeof ProjectFormSchema>>({
        defaultValues: {
            title: initialValue?.title || '',
            description: initialValue?.description || '',
            imageCover: initialValue?.imageCover || '',
        },
        resolver: yupResolver(ProjectFormSchema)
    })
    const { uploadFile } = useUploadFile()
    useImperativeHandle(ref, () => ({
        getData: async () => {
            if (await form.trigger()) {
                return form.getValues();
            }
            return null;
        },
    }));

    const imageCover = form.watch('imageCover')

    const handleUploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            await uploadFile(file, (imageUrl: string) => form.setValue('imageCover', imageUrl))
        }
    }

    return (

        <Form {...form}>
            <form className="flex flex-col gap-y-5">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Input project title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div>
                    <Label
                        htmlFor={'image-cover'}
                    />
                    <FormLabel>Cover image</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="Input image cover"
                            type="file"
                            id='image-cover'
                            onChange={handleUploadFile}
                        />
                    </FormControl>
                </div>

                {imageCover ? (
                    <div
                        className="w-full h-[200px] rounded-lg shadow"
                        style={{
                            backgroundImage: `url("${imageCover}")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}

                    />
                ) : null}
                {form.formState.errors.imageCover ? (<p
                    className={cn("text-sm font-medium text-red-500 dark:text-red-900")}
                >
                    {form.formState.errors.imageCover.message}
                </p>) : null}




                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell us a little bit about your todo"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
})
