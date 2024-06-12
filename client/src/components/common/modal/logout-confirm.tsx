import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useAuthActions } from "@/hooks/utils"
import { Common } from "@/interfaces"

export function LogoutConfirmModal({ open = true, onClose }: Common.ModalProps) {
    const { logout } = useAuthActions()


    const onOpenChange = (flag: boolean) => {
        if (!flag) onClose?.()
    }

    const onConfirm = () => {
        logout()
        onClose?.()
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[350px] rounded-lg">
                <DialogHeader>
                    <DialogTitle>Are you sure to logout?</DialogTitle>
                    <DialogDescription>
                        You will not receive notification about your todo
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex gap-x-4 w-full flex-row">
                    <Button type="button" onClick={onClose} variant={'outline'} className="flex-1">No</Button>
                    <Button type="button" onClick={onConfirm} className="flex-1">Yes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
