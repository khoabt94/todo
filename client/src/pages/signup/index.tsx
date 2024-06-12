import { siteConfig } from "@/configs/site";
import { SignupForm } from "@/lib/signup";
import { Link } from "react-router-dom";

export function SignupPage() {
    return (
        <div className="px-4 pt-10 justify-between flex flex-col gap-y-5 text-center">
            <div className="mb-3">
                <h3 className="text-xl font-bold">Signup</h3>
                <p className="text-base">to join our system</p>
            </div>
            <SignupForm />
            <Link to={siteConfig.paths.login()} className="">
                Already have account, please login !
            </Link>
        </div>
    )
}
