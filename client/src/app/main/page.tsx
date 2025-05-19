"use client"
import ExpenseSplitterDashboard from "@/components/expense-splitter-dashboard"
import { useAppDispatch, useAppSelector } from "../hooks"
import { useSocketLogin } from "@/lib/socket/useSocketLogin"
import { useState } from "react"
import { useLogout } from "@/lib/queryProvider/logout"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { removeUser } from "@/lib/redux/features/userSlice"
import { removeGroup } from "@/lib/redux/features/groupSlice"
import { removeExpense } from "@/lib/redux/features/expenseSlice"

export default function DashboardPage() {
  const {user} = useAppSelector((state) => state.userDetails) 
  const {group} = useAppSelector((state) => state.groupDetails)
  const [loadinglogout, setLoadingLogout] = useState(false)
  const router = useRouter()
  const dispatch = useAppDispatch()
  useSocketLogin(user?._id, group?._id)
  

  const { logout, logoutQuery } = useLogout()

  const handleLogout = async () => {
    const isLogout = await logout()

    if (logoutQuery.isLoading) {
      setLoadingLogout(true)
    }

    if (logoutQuery.isError){
      toast.error(logoutQuery.error.message)
      setLoadingLogout(false)
      return
    }

    if (isLogout) {

      setLoadingLogout(false)
      dispatch(removeUser())
      dispatch(removeGroup())
      dispatch(removeExpense())
      router.push("/login")
      toast.success("Logout successful")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between w-full items-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Expense Splitter</h1>
            <Button onClick={() => handleLogout()} disabled={loadinglogout}  className="flex p-2 bg-emerald-700 text-white hover:bg-emerald-600 rounded-lg items-center justify-center">
              {
                loadinglogout ? "Logging out..." : "Logout"
              }
            </Button>
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



