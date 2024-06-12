import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { SortOption, Status, StatusOption } from "@/enums"
import { Filter, ArrowDownUp, X } from 'lucide-react';
import { useHandleRouter } from "@/hooks/utils";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { useMemo } from "react";


type TodoQuery = {
    status: Status[]
    deadline: string
    sort: string
}

export function FilterTodo() {
    const { pushQuery, query } = useHandleRouter();
    const form = useForm<TodoQuery>({
        defaultValues: {
            status: (query.status || '').split('|') as Status[],
            sort: query.sort || SortOption[0].value,
        }
    })
    const statusSelected = form.watch('status')
    const renderStatus = useMemo(() => {
        const filtered = StatusOption.filter(s => statusSelected.includes(s.value))
        return filtered.map(f => f.label).join(", ");
    }, [statusSelected])

    const onChangeValues = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const cloned: any = { ...form.getValues() }
        cloned.status = cloned.status.join('|')
        pushQuery(cloned)
    }

    const onStatusCheckChange = (checked: boolean, value: Status) => {
        const newStatus = form.getValues('status')
        if (checked) {
            form.setValue('status', [...newStatus, value])
        } else {
            form.setValue('status', newStatus.filter(v => v !== value))
        }
        onChangeValues();
    }

    const onClearStatus = () => {
        form.setValue('status', [])
        onChangeValues();
    }

    return (
        <Form {...form} >
            <form className="w-full justify-between flex ">
                <DropdownMenu>
                    <div className="flex items-center gap-x-2">
                        <Filter strokeWidth={1.5} color="#b9b9b9" className="flex-shrink-0" />
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex items-center gap-x-2 rounded-full w-[150px] justify-start">
                                <p className="truncate">
                                    {renderStatus || "Status"}
                                </p>
                            </Button>
                        </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel className="flex items-center justify-between py-1">
                            <p>
                                Status
                            </p>
                            <Button
                                type="button"
                                variant={'ghost'}
                                className="p-0 h-fit"
                                onClick={onClearStatus}
                            >
                                <X strokeWidth={1.5} color="#b9b9b9" size={20} />
                            </Button>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {StatusOption.map(status => (
                            <DropdownMenuCheckboxItem
                                key={status.value}
                                checked={statusSelected.includes(status.value)}
                                onCheckedChange={(checked) => onStatusCheckChange(checked, status.value)}
                                className="py-3 pl-8"
                            >
                                <div className="flex gap-x-2 items-center">
                                    <i>
                                        {status.icon}
                                    </i>
                                    <p className={`font-medium !bg-transparent ${status.className}`}>
                                        {status.label}
                                    </p>
                                </div>
                            </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <FormField
                    control={form.control}
                    name="sort"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-x-2">
                            <Select
                                onValueChange={(value) => {
                                    field.onChange(value)
                                    onChangeValues()
                                }}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="h-10 rounded-full px-4 flex gap-x-2 !mt-0 w-[150px] text-left">
                                        <SelectValue />
                                    </SelectTrigger>
                                </FormControl>
                                <FormLabel className="flex-shrink-0 !mt-0"><ArrowDownUp strokeWidth={1.5} color="#b9b9b9" /> </FormLabel>
                                <SelectContent className="">
                                    {SortOption.map(option => (
                                        <SelectItem
                                            value={option.value}
                                            key={option.value}
                                            className=""
                                        >
                                            <p className="!bg-transparent">
                                                {option.label}
                                            </p>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />

            </form>
        </Form>
    )
}
