import { Sheet } from "@/components/ui/sheet"
import Navbar from "./navbar"
import Sidebar from "./sidebar"
import { useState } from "react"

export function Header() {
    const [open, setOpen] = useState(false)
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <Navbar />
            <Sidebar closeNavbar={() => setOpen(false)} />
        </Sheet >
    )
}
