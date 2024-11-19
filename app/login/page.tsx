import { LoginForm } from "@/components/login-form"
import { login } from './actions'

export default function Page() {
    return (

        <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
            <div className="relative hidden flex-col justify-between bg-black p-10 text-white md:flex">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-8 w-8"
                        >
                            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold">Acme Inc</span>
                </div>
                <blockquote className="space-y-2">
                    <p className="text-lg">
                        &ldquo;This library has saved me countless hours of work and helped me deliver stunning designs to my clients faster than ever before.&rdquo;
                    </p>
                    <footer className="text-sm">Sofia Davis</footer>
                </blockquote>
            </div>
            <div className="flex items-center justify-center p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <LoginForm login={login} />
                </div>
            </div>
        </div>

    )
}
