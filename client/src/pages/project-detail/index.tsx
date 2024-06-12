import { Progress } from "@/components/common"
import { Status } from "@/enums"
import { useGetProject, useGetTodosStatusCount } from "@/hooks/queries"
import { FilterTodo } from "@/lib/todo/filter"
import { TodoList } from "@/lib/todo/list"
import { useMemo } from "react"
import { useParams } from "react-router-dom"

export function ProjectDetailPage() {
  const { projectId } = useParams()

  const { data: projectData } = useGetProject({
    project_id: projectId as string,
  })

  const { data: statusCountData } = useGetTodosStatusCount(
    {
      project: projectId as string,
    }
  )

  const statusCount = useMemo(() => {
    return statusCountData ? statusCountData.statusCount : null
  }, [statusCountData])



  const sortedStatusCount = useMemo(() => {
    if (!statusCount) return [];
    const result = {
      complete: {
        order: 0,
        value: 0,
        color: 'bg-[#41B06E]'
      },
      inprogress: {
        order: 1,
        value: 0,
        color: 'bg-[#10439F]'
      },
    }
    statusCount
      .filter(a => a.status !== Status.TODO)
      .forEach((curr) => {
        if (curr.status === Status.CANCELED || curr.status === Status.COMPLETED) {
          result.complete.value += curr.percentage
        } else if (curr.status === Status.IN_PROGRESS || curr.status === Status.PENDING) {
          result.inprogress.value += curr.percentage
        }
      })
    return Object.values(result)
  }, [statusCount])


  return (
    <div className="">
      <div
        className="w-full h-[150px] relative overflow-hidden flex justify-center items-center"
        style={{
          backgroundImage: `url("${projectData?.imageCover}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/30 -z-1" />
        <h3 className="text-center font-bold text-2xl relative z-10 text-white">{projectData?.title}</h3>
      </div>
      <Progress segments={sortedStatusCount} className="h-2 rounded-none" />
      <div className="w-full  px-4 mt-3">
        <FilterTodo />
      </div>
      <div className="p-4 ">
        <TodoList />
      </div>
    </div>
  )
}

