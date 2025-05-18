"use client"
import ExpenseSplitterDashboard from "@/components/expense-splitter-dashboard"
import { useAppSelector } from "../hooks"
import { useSocketLogin } from "@/lib/socket/useSocketLogin"
import Link from "next/link"

export default function DashboardPage() {
  const {user} = useAppSelector((state) => state.userDetails) 
  const {group} = useAppSelector((state) => state.groupDetails)

  if (!(user?._id === "") || !(group?._id === "")) {
    useSocketLogin(user?._id, group?._id)
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between w-full items-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Expense Splitter</h1>
            <div className="flex p-2 bg-emerald-700 text-white hover:bg-emerald-600 rounded-lg items-center justify-center">
              Logout
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <ExpenseSplitterDashboard />
        </div>
      </main>
    </div>
  )
}
