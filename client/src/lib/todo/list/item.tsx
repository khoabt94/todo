import { CRUDTodoModal } from "@/components/common/modal";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PriorityOption, Status, StatusOption } from "@/enums";
import { useUpdateTodo } from "@/hooks/queries";
import { useOpenModal } from "@/hooks/utils";
import { Todo } from "@/interfaces";
import { cn } from "@/utils/tailwind";
import { BellOff, BellRing, Dot, Pencil } from 'lucide-react';
import moment from 'moment';
import { useMemo } from "react";

type TodoItemProps = {
  todo: Todo.Detail
}

export function TodoItem({ todo }: TodoItemProps) {
  const { _id, deadline, description, should_notify, title, priority, status } = todo
  const { open } = useOpenModal()
  const openCreateTodoDrawer = () => {
    open(CRUDTodoModal, {
      initialValue: todo,
      projectId: todo.project._id
    })
  }
  const renderStatus = useMemo(() => StatusOption.find(s => s.value === status), [status])
  const { mutate: updateTodo } = useUpdateTodo()
  const onChangeStatus = (value: Status) => {
    updateTodo({
      todo_id: _id,
      status: value,
      project: todo.project._id
    })
  }


  const onChangeNotify = () => {
    updateTodo({
      todo_id: _id,
      should_notify: !should_notify,
      project: todo.project._id
    })
  }


  return (
    <AccordionItem value={_id} className="rounded-lg shadow px-4 bg-white relative">
      <AccordionTrigger className="hover:no-underline gap-x-2 ">
        <div className="flex-1 flex items-center  justify-between">
          <div className="w-[300px]">
            <div className="flex items-center gap-x-1">
              {renderStatus ? (
                <i>
                  {renderStatus.icon}
                </i>
              ) : null}
              <Dot className="p-0" size={16} color="#61677A" />
              <p className="text-left truncate">
                {title}
              </p>
            </div>
            <p className="text-xs text-gray-500 text-left">
              {moment(deadline).format('HH:mm')}
              {" "}
              <span className="font-medium text-gray-600">
                {moment(deadline).format('DD/MM/YYYY')}
              </span>
            </p>
          </div>

          <Button
            variant={'ghost'}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChangeNotify()
            }}
            className="px-1"
          >
            {should_notify ? <BellRing fill="" /> : <BellOff />}
          </Button>
        </div>

      </AccordionTrigger>
      <div className={cn('bg-slate-500 absolute top-0 bottom-0 left-0 w-[6px] rounded-tl-lg rounded-bl-lg', PriorityOption[priority].className)} />
      <AccordionContent>
        {description}
        <div className="flex gap-x-4 mt-3 justify-end h-8 items-center w-full">
          <Select onValueChange={onChangeStatus} defaultValue={todo.status}>
            <SelectTrigger className="w-[150px] h-full rounded-lg">
              <SelectValue placeholder="Select a verified email to display" />
            </SelectTrigger>
            <SelectContent>
              {StatusOption.map(status => (
                <SelectItem
                  value={status.value}
                  key={status.value}
                  className=""
                >
                  <div className="flex gap-x-2 items-center">
                    <i>
                      {status.icon}
                    </i>
                    <p className={`font-medium !bg-transparent ${status.className}`}>
                      {status.label}
                    </p>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="button" variant={'ghost'} className="p-0 h-full" onClick={openCreateTodoDrawer}>
            <Pencil strokeWidth={1.5} />
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
