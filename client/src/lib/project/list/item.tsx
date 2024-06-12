import { Project } from '@/interfaces'
import { NavLink } from 'react-router-dom'
import { MenuActions } from './menu'

type Props = {
  project: Project.Detail
  onClick: () => void
}

export function ProjectItem({ project, onClick }: Props) {
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
        <MenuActions project={project} onClick={onClick} />
      </div>
    </NavLink>
  )
}
