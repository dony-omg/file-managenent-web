import { LoginForm } from "@/components/login-form"
import Image from "next/image"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Login Form Section */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link href="/" className="inline-block">
              <Image src="/placeholder.svg" alt="Logo" width={48} height={48} className="mx-auto h-12 w-auto" />
            </Link>
            <h1 className="mt-6 text-3xl font-bold">Welcome back</h1>
            <p className="mt-2 text-sm text-muted-foreground">Sign in to your account to continue</p>
          </div>

          <LoginForm />

          <div className="text-center text-sm">
            <p className="text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-medium text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="hidden lg:block lg:flex-1">
        <div className="relative h-full w-full bg-muted">
          <Image src="/placeholder.svg?height=1080&width=1920" alt="Login" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20 p-8 flex flex-col justify-end">
            <blockquote className="space-y-2">
              <p className="text-lg">
                "This document management system has transformed how our team collaborates and shares information."
              </p>
              <footer className="text-sm">Sofia Rodriguez, Product Manager</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  )
}

