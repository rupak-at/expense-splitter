"use client"

import type React from "react"

import { useState } from "react"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react"

const RegisterSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters long" })
    .max(50, { message: "Full name must be less than 50 characters" }),
  userName: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must be less than 20 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[A-Z]/, { message: "Contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, { message: "Contain at least one special character" }),
})

type FormData = z.infer<typeof RegisterSchema>

export default function RegisterForm() {
  const [formData, setFormData] = useState<Partial<FormData>>({
    fullName: "",
    userName: "",
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null)
  const [passwordVisible, setPasswordVisible] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    try {
      RegisterSchema.parse(formData)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string[]> = {}
        error.errors.forEach((err) => {
          const field = err.path[0] as string
          if (!fieldErrors[field]) {
            fieldErrors[field] = []
          }
          fieldErrors[field].push(err.message)
        })
        setErrors(fieldErrors)
      }
      return false
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // api call
  }

  return (
    <div className="mt-8 rounded-lg bg-white p-8 shadow sm:mx-auto sm:w-full sm:max-w-md">
      {submitStatus && (
        <Alert
          className={`mb-6 ${
            submitStatus.success
              ? "border-emerald-500 bg-emerald-50 text-emerald-700"
              : "border-red-500 bg-red-50 text-red-700"
          }`}
        >
          {submitStatus.success ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          <AlertDescription>{submitStatus.message}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            autoComplete="name"
            className={`mt-1 ${errors.fullName ? "border-red-500 ring-red-500" : ""}`}
            required
          />
          {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName[0]}</p>}
        </div>

        <div>
          <Label htmlFor="userName">Username</Label>
          <Input
            id="userName"
            name="userName"
            type="text"
            value={formData.userName}
            onChange={handleChange}
            autoComplete="username"
            className={`mt-1 ${errors.userName ? "border-red-500 ring-red-500" : ""}`}
            required
          />
          {errors.userName && <p className="mt-1 text-sm text-red-600">{errors.userName[0]}</p>}
        </div>

        <div>
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            className={`mt-1 ${errors.email ? "border-red-500 ring-red-500" : ""}`}
            required
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email[0]}</p>}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
          </div>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={passwordVisible ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              className={`mt-1 pr-10 ${errors.password ? "border-red-500 ring-red-500" : ""}`}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <div className="mt-1 text-sm text-red-600">
              <p>Password must:</p>
              <ul className="list-disc pl-5">
                {errors.password.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Register"}
          </Button>
        </div>
      </form>
    </div>
  )
}
