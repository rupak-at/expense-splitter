"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, Download } from "lucide-react"

interface Expense {
  id: string
  title: string
  amount: number
  description: string
  paidBy: { id: string; name: string }
  date: string
  splitAmong: string[]
}

interface Settlement {
  from: { id: string; name: string }
  to: { id: string; name: string }
  amount: number
}

interface SettlementReportProps {
  settlement: Settlement[] | null
  expenses: Expense[]
  onGenerateSettlement: () => void
}

export default function SettlementReport({ settlement, expenses, onGenerateSettlement }: SettlementReportProps) {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  if (!settlement || settlement.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Settlement Report</CardTitle>
          <CardDescription>Generate a report to see who owes whom</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <Calculator className="h-16 w-16 text-gray-400 mb-4" />
          <p className="text-gray-500 text-center mb-6">
            {expenses.length === 0
              ? "No expenses have been added yet. Add some expenses first."
              : "Click the button below to generate a settlement report."}
          </p>
          <Button
            onClick={onGenerateSettlement}
            disabled={expenses.length === 0}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Generate Settlement
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Settlement Report</h2>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export as PDF
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
          <CardDescription>Total expenses: {formatCurrency(totalExpenses)}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <h3 className="font-medium text-emerald-800 mb-2">Payment Instructions</h3>
              {settlement.map((payment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-emerald-100 last:border-0"
                >
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700 font-medium">
                      {payment.from.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{payment.from.name}</p>
                      <p className="text-sm text-gray-500">pays</p>
                    </div>
                  </div>
                  <div className="font-bold text-emerald-700">{formatCurrency(payment.amount)}</div>
                  <div className="flex items-center">
                    <div className="mr-3 text-right">
                      <p className="font-medium">{payment.to.name}</p>
                      <p className="text-sm text-gray-500">receives</p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-medium">
                      {payment.to.name.charAt(0)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h3 className="font-medium mb-2">Expense Breakdown</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-4 font-medium text-gray-500">Expense</th>
                      <th className="text-left py-2 px-4 font-medium text-gray-500">Paid By</th>
                      <th className="text-right py-2 px-4 font-medium text-gray-500">Amount</th>
                      <th className="text-right py-2 px-4 font-medium text-gray-500">Split</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((expense) => (
                      <tr key={expense.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-4">{expense.title}</td>
                        <td className="py-2 px-4">{expense.paidBy.name}</td>
                        <td className="py-2 px-4 text-right">{formatCurrency(expense.amount)}</td>
                        <td className="py-2 px-4 text-right">
                          {formatCurrency(expense.amount / expense.splitAmong.length)} × {expense.splitAmong.length}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="font-medium">
                      <td className="py-2 px-4" colSpan={2}>
                        Total
                      </td>
                      <td className="py-2 px-4 text-right">{formatCurrency(totalExpenses)}</td>
                      <td className="py-2 px-4"></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
