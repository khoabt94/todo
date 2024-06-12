import {
  Accordion
} from "@/components/ui/accordion";
import { useGetTodos } from "@/hooks/queries";
import { useHandleRouter } from "@/hooks/utils";
import { Todo } from "@/interfaces";
import { Loader } from "lucide-react";
import { useMemo } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from "react-router-dom";
import { TodoItem } from "./item";

export function TodoList() {
  const { projectId } = useParams()
  const { query } = useHandleRouter();

  const { data,
    fetchNextPage,
    hasNextPage,
  } = useGetTodos(
    projectId as string,
    {
      ...query,
      limit: 10,
    }
  )


  const todos = useMemo(() => {
    return data ? data?.pages.flatMap(p => p.todos) : []
  }, [data])



  return (
    <Accordion type="single" collapsible >
      {todos.length ? (<InfiniteScroll
        dataLength={todos.length} //This is important field to render the next data
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<div><Loader /></div>}
        className="w-full flex flex-col gap-y-3"
      >
        {todos.map((todo: Todo.Detail) => <TodoItem todo={todo} key={todo._id} />)}
      </InfiniteScroll>) : <p className="w-full text-center italic">No todo found. Lets create one!</p>}

    </Accordion>
  )
}
