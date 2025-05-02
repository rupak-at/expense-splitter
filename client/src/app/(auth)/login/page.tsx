import LoginForm from "@/components/loginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h1>
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/register" className="font-medium text-emerald-600 hover:text-emerald-500">
              Register
            </a>
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
