import { ReactNode } from 'react'
import { Header } from './components'

export function RootLayout({ children }: { children: ReactNode }) {
    return (
        <div className="bg-slate-50 min-h-screen">
            <Header />
            <div className="mt-[57px]">
                {children}
            </div>
        </div >
    )
}
