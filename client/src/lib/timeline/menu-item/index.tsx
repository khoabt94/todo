import { NavLink } from 'react-router-dom'

type Props = {
    link: string
    title: string
}

export function MenuItem({ link, title }: Props) {
    return (
        <NavLink
            className={({ isActive }) =>
                isActive ? "font-medium bg-slate-100" : "bg-white"
            }
            to={`/${link}`}
        >
            <p
                className='py-2'
            >
                {title}
            </p>
        </NavLink>
    )
}
