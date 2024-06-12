import { Accordion } from "@/components/ui/accordion"
import { Status, Timeline } from "@/enums"
import { useGetTimeline } from "@/hooks/queries"
import { Todo } from "@/interfaces"
import { TodoItem } from "@/lib/todo/list/item"
import { getQueryDate } from "@/utils/timeline"
import moment from "moment"
import { useMemo } from "react"
import { useParams } from "react-router-dom"

export function TimelinePage() {
    const { timelineSlug } = useParams()
    const { data,
    } = useGetTimeline({
        ...getQueryDate(timelineSlug as Timeline),
        sort: 'deadline',
        status: [Status.TODO, Status.IN_PROGRESS, Status.PENDING].join('|')
    })

    const todos = useMemo(() => {
        if (!data) return [];
        const rawData = data.todos
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const groups = rawData.reduce((groups: any, todo) => {
            const date = moment(todo.deadline).format('MM/DD/YYYY');
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(todo);
            return groups;
        }, {});

        // Edit: to add it in the array format instead
        const groupArrays = Object.keys(groups).map((date) => {
            return {
                date,
                todos: groups[date]
            };
        });

        return groupArrays
    }, [data])

    return (
        <Accordion type="single" collapsible className="flex flex-col gap-y-4 p-4">
            <ol className="relative border-s border-gray-200 dark:border-gray-700">
                {todos.map((group) => (
                    <li className="mb-10 ms-4">
                        <div className="absolute w-3 h-3 bg-gray-300 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />
                        <time className="mb-1 text-base font-medium leading-none text-gray-500 dark:text-gray-500">{moment(group.date).format('ll')}</time>
                        <div className="flex flex-col gap-y-4 mt-4">
                            {group.todos.map((todo: Todo.Detail) => <TodoItem todo={todo} key={todo._id} />)}
                        </div>
                    </li>
                ))}




            </ol>


            {/* {todos.map((todo: Todo.Detail) => <TodoItem todo={todo} key={todo._id} />)} */}
        </Accordion>
    )
}
