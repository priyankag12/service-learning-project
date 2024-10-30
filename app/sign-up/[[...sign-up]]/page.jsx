import { SignUp } from "@clerk/nextjs";
import "./sign-up.scss";

export default function Page() {
    return (
        <div className="container">
            <SignUp redirectUrl="/instructor/dashboard"/>
        </div>
    )
}