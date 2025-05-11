"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ReceiptText, Calculator } from 'lucide-react'
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import axios, { isAxiosError } from "axios"
import { useQuery } from "@tanstack/react-query"
import { fetchExpense } from "@/lib/redux/features/expenseSlice"
import { Skeleton } from "./ui/skeleton"

interface Member {
  id: string
  name: string
  email: string
}

interface Expense {
  _id: string
  title: string
  amount: number
  description: string
  paidBy: { _id: string; userName: string },
  group: string
  createdAt: string
  updatedAt: string
}

interface GroupExpensesProps {
  expenses: Expense[]
  members: Member[]
  onGenerateSettlement: () => void
  isAdmin: boolean
}

const getExpense = async (id: string) => {
  try {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/expense${id}`, {withCredentials: true});
    return data?.groupExpenses
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        "Expense Creation failed"
      );
    }
    throw new Error("Unknown login error");
    }
    
  }


export default function GroupExpenses({ expenses, members, onGenerateSettlement, isAdmin }: GroupExpensesProps) {
  const {group} = useAppSelector((state) => state.groupDetails)
const {data, isLoading, error} = useQuery({
  queryKey: ["expenses", group._id],
  queryFn: () => getExpense(group._id),
  enabled: !!group._id
})
const dispatch = useAppDispatch()

useEffect(() => {
  if (!isLoading && data) {
    dispatch(fetchExpense(data))  
  }

}, [data, isLoading, dispatch])

if (error) {
  return <p>{error?.message || "something went worng"}</p>
}



  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ne-NP', {
      style: 'currency',
      currency: 'NPR'
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Group Expenses</h2>
          <Button 
            onClick={onGenerateSettlement}
            disabled={expenses.length === 0}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Calculator className="mr-2 h-4 w-4" />
            See Settlement
          </Button>
      </div>
      {
        isLoading ? (
           <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <Skeleton className="h-8 w-24 mb-2" />
              <Skeleton className="h-4 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4"><Skeleton className="h-4 w-16" /></th>
                  <th className="text-left py-3 px-4"><Skeleton className="h-4 w-16" /></th>
                  <th className="text-left py-3 px-4"><Skeleton className="h-4 w-16" /></th>
                  <th className="text-left py-3 px-4"><Skeleton className="h-4 w-16" /></th>
                  <th className="text-left py-3 px-4"><Skeleton className="h-4 w-16" /></th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4].map((i) => (
                  <tr key={i} className="border-b">
                    <td className="py-3 px-4">
                      <Skeleton className="h-5 w-32 mb-1" />
                      <Skeleton className="h-3 w-24" />
                    </td>
                    <td className="py-3 px-4"><Skeleton className="h-5 w-20" /></td>
                    <td className="py-3 px-4"><Skeleton className="h-5 w-24" /></td>
                    <td className="py-3 px-4"><Skeleton className="h-5 w-20" /></td>
                    <td className="py-3 px-4"><Skeleton className="h-5 w-16" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
        ) : (
          expenses.length === 0 || expenses[0]._id === '') ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <ReceiptText className="h-16 w-16 text-gray-400 mb-4" />
                <p className="text-gray-500 text-center">
                  No expenses added yet. Click on "Add Expense" to start tracking your group expenses.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">{formatCurrency(totalExpenses)}</div>
                    <p className="text-sm text-gray-500">Total Expenses</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">{expenses.length}</div>
                    <p className="text-sm text-gray-500">Expense Entries</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">{formatCurrency(totalExpenses / members.length)}</div>
                    <p className="text-sm text-gray-500">Average Per Person</p>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Expense List</CardTitle>
                  <CardDescription>All expenses added to this group</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Title</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Amount</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Paid By</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Date</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Split Among</th>
                        </tr>
                      </thead>
                      <tbody>
                        {expenses.map((expense, index) => (
                          <tr key={expense._id + index} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="font-medium">{expense.title}</div>
                              <div className="text-sm text-gray-500">{expense.description}</div>
                            </td>
                            <td className="py-3 px-4 font-medium">{formatCurrency(expense.amount)}</td>
                            <td className="py-3 px-4">{expense.paidBy?.userName}</td>
                            <td className="py-3 px-4">{new Date(expense.createdAt).toLocaleDateString()}</td>
                            <td className="py-3 px-4">
                              <div className="text-sm">
                                {/* {expense.splitAmong.length} people */}
                                <span className="text-gray-500 text-xs block">
                                  {/* ({formatCurrency(expense.amount / expense.splitAmong.length)} each) */}
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </>
          )
      }
    </div>
  )
}
