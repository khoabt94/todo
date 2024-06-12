import { useGetProjects } from "@/hooks/queries"
import { useMemo } from "react"
import { ProjectItem } from "./item"

type Props = {
  onClick: () => void
}

export function ProjectList({ onClick }: Props) {
  const { data } = useGetProjects({}, {
  }
  )
  const projects = useMemo(() => data?.projects || [], [data])

  return (
    <div className="flex flex-col gap-y-4 w-full">
      {projects.length ? projects.map((project) => (
        <ProjectItem
          onClick={onClick}
          project={project}
          key={project._id}
        />
      ))
        : <p className="w-full text-center italic">No project found. Lets create one!</p>
      }
    </div>
  )

}
