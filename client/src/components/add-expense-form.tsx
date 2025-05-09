"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from 'lucide-react'

interface Member {
  _id: string
  fullName: string
  userName: string
  email: string
  groups: string[]
  createdAt?: Date
  updatedAt?: Date
}

interface AddExpenseFormProps {
  members: Member[]
  currentUserId: string
  onAddExpense: (data: { 
    title: string; 
    amount: number; 
    description: string;
  }) => void
}

export default function AddExpenseForm({ members, currentUserId, onAddExpense }: AddExpenseFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    description: "",
    splitAmong: members.map(member => member._id) // Default to all members
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }
    
    if (!formData.amount) {
      newErrors.amount = "Amount is required"
    } else if (isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Please enter a valid positive amount"
    }
    
    if (formData.splitAmong.length === 0) {
      newErrors.splitAmong = "Select at least one person to split with"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    onAddExpense({
      title: formData.title,
      amount: parseFloat(formData.amount),
      description: formData.description,
    })
    
    // Reset form after submission
    setFormData({
      title: "",
      amount: "",
      description: "",
      splitAmong: members.map(member => member._id)
    })
    setIsSubmitting(false)
  }

  const handleSplitToggle = (memberId: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        splitAmong: [...formData.splitAmong, memberId]
      })
    } else {
      setFormData({
        ...formData,
        splitAmong: formData.splitAmong.filter(id => id !== memberId)
      })
    }
    
    // Clear error when changing selection
    if (errors.splitAmong) {
      const newErrors = { ...errors }
      delete newErrors.splitAmong
      setErrors(newErrors)
    }
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Expense</CardTitle>
        <CardDescription>Enter the details of the expense you paid for</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="expense-title">Expense Title</Label>
            <Input
              id="expense-title"
              placeholder="e.g., Dinner, Taxi, Hotel"
              value={formData.title}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value })
                if (errors.title) {
                  const newErrors = { ...errors }
                  delete newErrors.title
                  setErrors(newErrors)
                }
              }}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="expense-amount">Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">Rs </span>
              <Input
                id="expense-amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => {
                  setFormData({ ...formData, amount: e.target.value })
                  if (errors.amount) {
                    const newErrors = { ...errors }
                    delete newErrors.amount
                    setErrors(newErrors)
                  }
                }}
                className={`pl-7 ${errors.amount ? "border-red-500" : ""}`}
              />
            </div>
            {errors.amount && <p className="text-sm text-red-500">{errors.amount}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="expense-description">Description</Label>
            <Textarea
              id="expense-description"
              placeholder="Add details about this expense"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end">
          <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Add Expense"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
