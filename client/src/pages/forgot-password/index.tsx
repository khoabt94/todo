import { siteConfig } from "@/configs/site";
import { ForgotPasswordForm } from "@/lib/forgot-password";
import { Link } from "react-router-dom";

export function ForgotPasswordPage() {
    return (
        <div className="px-4 pt-10 justify-between flex flex-col gap-y-5 text-center">
            <div className="mb-3">
                <h3 className="text-xl font-bold">Forgot Password</h3>
                <p className="text-base">Please provide your email to receive instruction</p>
            </div>
            <ForgotPasswordForm />

            <Link to={siteConfig.paths.login()} className="">
                If you dont forget your password, let's login!
            </Link>
        </div>
    )
}
