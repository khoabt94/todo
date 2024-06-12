import { CRUDProjectModal, LogoutConfirmModal } from '@/components/common/modal'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { SheetContent, SheetHeader } from '@/components/ui/sheet'
import { siteConfig } from '@/configs/site'
import { Timeline } from '@/enums'
import { useOpenModal } from '@/hooks/utils'
import { ProjectList } from '@/lib/project/list'
import { MenuItem } from '@/lib/timeline/menu-item'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

type Props = {
  closeNavbar: () => void
}

export default function Sidebar({ closeNavbar }: Props) {
  const { open } = useOpenModal()
  const openCreateProjectDrawer = () => {
    open(CRUDProjectModal, {})
    closeNavbar()
  }
  const openLogoutConfirm = () => {
    open(LogoutConfirmModal, {})
    closeNavbar()
  }
  return (
    <SheetContent
      side="left"
      className='flex flex-col'
    >
      <SheetHeader className="flex justify-center">
        <img src="/public/logo.png" alt="logo" className="h-10 w-fit block mx-auto" />
      </SheetHeader>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="timeline" className="border-none">
          <AccordionTrigger className="hover:no-underline gap-x-2">
            <div className="flex-1 flex items-center justify-between">
              <p className="text-left truncate">
                Your timeline
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex gap-y-4 flex-col px-4">
              <MenuItem link={`timeline/${Timeline.THIS_WEEK}`} title='This week' />
              <MenuItem link={`timeline/${Timeline.NEXT_WEEK}`} title='Next week' />
              <MenuItem link={`timeline/${Timeline.THIS_MONTH}`} title='This month' />
              <MenuItem link={`timeline/${Timeline.NEXT_MONTH}`} title='Next month' />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="projects" className="border-none">
          <AccordionTrigger className="hover:no-underline gap-x-3">
            <div className="flex-1 flex items-center justify-between">
              <p className="text-left truncate">
                Projects
              </p>
              <Button
                type="button"
                variant={"ghost"}
                className='px-2'
                onClick={openCreateProjectDrawer}
              >
                <Plus />
              </Button>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ProjectList onClick={closeNavbar} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="account" className="border-none">
          <AccordionTrigger className="hover:no-underline gap-x-3">
            <div className="flex-1 flex items-center justify-between">
              <p className="text-left truncate">
                Account Settings
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className='flex flex-col gap-y-6 px-4 mt-3'>
              <Link to={siteConfig.paths.accountInfo()}>Account Info</Link>
              <Link to={siteConfig.paths.accountPassword()}>Change Password</Link>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>


      <Button className='w-full mt-auto' onClick={openLogoutConfirm}>
        Logout
      </Button>
    </SheetContent >
  )
}
