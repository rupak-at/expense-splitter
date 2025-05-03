"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2 } from 'lucide-react'

interface Member {
  id: string
  name: string
  email: string
}

interface AddExpenseFormProps {
  members: Member[]
  currentUserId: string
  onAddExpense: (data: { 
    title: string; 
    amount: number; 
    description: string;
    splitAmong: string[];
  }) => void
}

export default function AddExpenseForm({ members, currentUserId, onAddExpense }: AddExpenseFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    description: "",
    splitAmong: members.map(member => member.id) // Default to all members
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
      splitAmong: formData.splitAmong
    })
    
    // Reset form after submission
    setFormData({
      title: "",
      amount: "",
      description: "",
      splitAmong: members.map(member => member.id)
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

  const handleSelectAll = () => {
    setFormData({
      ...formData,
      splitAmong: members.map(member => member.id)
    })
  }

  const handleSelectNone = () => {
    setFormData({
      ...formData,
      splitAmong: []
    })
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
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
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
            <Label htmlFor="expense-description">Description (Optional)</Label>
            <Textarea
              id="expense-description"
              placeholder="Add details about this expense"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>Split Among</Label>
              <div className="space-x-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSelectAll}
                >
                  Select All
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSelectNone}
                >
                  Clear
                </Button>
              </div>
            </div>
            
            <div className="space-y-2 border rounded-md p-3">
              {members.map((member) => (
                <div key={member.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`member-${member.id}`}
                    checked={formData.splitAmong.includes(member.id)}
                    onCheckedChange={(checked) => handleSplitToggle(member.id, checked === true)}
                  />
                  <Label htmlFor={`member-${member.id}`} className="cursor-pointer">
                    {member.name} {member.id === currentUserId && "(You)"}
                  </Label>
                </div>
              ))}
            </div>
            {errors.splitAmong && <p className="text-sm text-red-500">{errors.splitAmong}</p>}
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
