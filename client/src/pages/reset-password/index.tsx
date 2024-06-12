import { ResetPasswordForm } from "@/lib/reset-password";


//resetTokenId
export function ResetPasswordPage() {
    return (
        <div className="px-4 pt-10 justify-between flex flex-col gap-y-5 text-center">
            <div className="mb-3">
                <h3 className="text-xl font-bold">Reset Password</h3>
                <p className="text-base">Now you can provide your new password</p>
            </div>
            <ResetPasswordForm />
        </div>
    )
}
