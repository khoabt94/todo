import { DatePicker } from "@/components/ui/date-picker";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { TimePicker12HourWrapper } from "@/components/ui/time-picker-12hour-wrapper";
import { Priority, PriorityOption } from "@/enums";
import { Todo } from "@/interfaces";
import { TodoFormSchema } from "@/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';

type Props = {
    initialValue?: Partial<Todo.Detail>
}

export const CreatTodoForm = forwardRef(({ initialValue }: Props, ref) => {
    const form = useForm<yup.InferType<typeof TodoFormSchema>>({
        defaultValues: {
            title: '',
            should_notify: true,
            deadline: undefined,
            priority: Priority.MEDIUM,
            description: '',
        },
        resolver: yupResolver(TodoFormSchema)
    })

    useImperativeHandle(ref, () => ({
        getData: async () => {
            if (await form.trigger()) {
                return form.getValues();
            }
            return null;
        },
    }));

    useEffect(() => {
        if (initialValue) {
            form.reset({
                ...initialValue,
                deadline: initialValue?.deadline ? new Date(initialValue.deadline) : undefined,
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialValue])


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
                                <Input placeholder="Input todo title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="should_notify"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-x-2">
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormLabel className="!mt-0">Should notify you?</FormLabel>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="deadline"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Deadline</FormLabel>
                            <TimePicker12HourWrapper
                                date={field.value}
                                onChange={field.onChange}
                            />


                            <DatePicker onSelect={field.onChange} value={field.value} />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Priority</FormLabel>
                            <Select
                                onValueChange={(value: string) => field.onChange(Number(value))}
                                value={String(field.value)}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a verified email to display" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {PriorityOption.map(option => (
                                        <SelectItem
                                            value={String(option.value)}
                                            key={option.value}
                                            className=""
                                        >
                                            <div className="flex gap-x-2 items-center">
                                                <i>
                                                    {option.icon}
                                                </i>
                                                <p>
                                                    {option.label}
                                                </p>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />

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
