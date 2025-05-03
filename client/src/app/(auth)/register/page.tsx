import RegisterForm from "@/components/forms/registerForm";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create an account</h1>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-emerald-600 hover:text-emerald-500">
              Sign in
            </a>
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}
