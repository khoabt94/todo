import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Common } from "@/interfaces"

export function DeleteConfirmModal({ open = true, onClose, onSubmit }: Common.ModalProps) {

    const onOpenChange = (flag: boolean) => {
        if (!flag) onClose?.()
    }

    const onConfirm = () => {
        onSubmit?.()
        onClose?.()
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[350px] rounded-lg">
                <DialogHeader>
                    <DialogTitle>Are you sure to archive this project?</DialogTitle>
                    <DialogDescription>
                        This action can not be undone
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex gap-x-4 w-full flex-row">
                    <Button type="button" onClick={onClose} variant={'outline'} className="flex-1">Cancel</Button>
                    <Button type="button" onClick={onConfirm} className="flex-1">Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
