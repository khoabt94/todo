import { useGetProjects } from "@/hooks/queries"

export function HomePage() {
  useGetProjects({}, {})
  return (
    <div className="flex justify-center items-center w-full px-4 pt-10">
      <h3 className="text-2xl text-center italic text-gray-500">
        Please enter one of your current projects
        or create a new one 😊!
      </h3>
    </div>
  )
}

