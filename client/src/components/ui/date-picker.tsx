import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
    FormControl,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { cn } from "@/utils/tailwind"
import { format } from "date-fns"
import { Calendar } from "./calendar"
import { CalendarIcon } from "lucide-react"
import { SelectSingleEventHandler } from "react-day-picker"

type Props = {
    value: Date | undefined
    onSelect: SelectSingleEventHandler | undefined
}

export function DatePicker({ value, onSelect }: Props) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-full text-left font-normal",
                            !value && "text-muted-foreground"
                        )}
                    >
                        {value ? (
                            format(value, "PPP")
                        ) : (
                            <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={onSelect}
                    disabled={(date) =>
                        date < new Date()
                    }
                />
            </PopoverContent>
        </Popover>
    )
}
