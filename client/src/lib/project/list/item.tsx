import { Project } from '@/interfaces'
import { NavLink } from 'react-router-dom'
import { MenuActions } from './menu'
import { useAuthStore } from '@/store'
import { useMemo } from 'react'

type Props = {
  project: Project.Detail
  onClick: () => void
}

export function ProjectItem({ project, onClick }: Props) {
  const { user } = useAuthStore()

  const showActionBtns = useMemo(() => {
    if (!user) return false;
    return project.owner._id === user._id
  }, [project, user])

  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? "font-medium bg-slate-100" : "bg-white"
      }
      to={`/project/${project._id}`}
    >
      <div
        className='w-full px-4 py-3 rounded-md shadow-md flex justify-between items-center'
      >
        <p className=''>
          {project.title}
        </p>
        {showActionBtns ? <MenuActions project={project} onClick={onClick} /> : null}

      </div>
    </NavLink>
  )
}
