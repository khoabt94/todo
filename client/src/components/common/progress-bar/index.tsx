import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/utils/tailwind"


type ProgressSegment = {
    value: number
    color?: string
}

type Props = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    segments: ProgressSegment[]
}

const Progress = React.forwardRef<
    React.ElementRef<typeof ProgressPrimitive.Root>,
    Props
>(
    ({ className, segments, ...props }, ref) => {

        return (
            <ProgressPrimitive.Root
                ref={ref}
                className={cn(
                    "relative h-6 w-full overflow-hidden rounded bg-secondary",
                    className
                )}
                {...props}
            >
                {segments.map((segment, index) => (
                    <ProgressPrimitive.Indicator
                        key={index}
                        className={cn("h-full transition-all absolute", segment.color ? segment.color : "bg-primary")}
                        style={{
                            width: `${index === 0 ? segment.value : segment.value + segments[index - 1].value}%`,
                            zIndex: segments.length - index
                        }}
                    />
                ))}
            </ProgressPrimitive.Root>
        )
    }
)

Progress.displayName = "Progress"

export { Progress }