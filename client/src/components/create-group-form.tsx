"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X, Plus, Loader2 } from 'lucide-react'

interface CreateGroupFormProps {
  onCreateGroup: (data: { name: string; description: string; members: string[] }) => void
  onCancel: () => void
}

export default function CreateGroupForm({ onCreateGroup, onCancel }: CreateGroupFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    members: [""] // Start with one empty member field
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = "Group name is required"
    }
    
    // Validate email format for all members
    formData.members.forEach((member, index) => {
      if (member && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member)) {
        newErrors[`member-${index}`] = "Please enter a valid email"
      }
    })
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    // Filter out empty member fields
    const filteredMembers = formData.members.filter(member => member.trim() !== "")
    
    onCreateGroup({
      name: formData.name,
      description: formData.description,
      members: filteredMembers
    })
  }

  const addMemberField = () => {
    setFormData({
      ...formData,
      members: [...formData.members, ""]
    })
  }

  const removeMemberField = (index: number) => {
    const updatedMembers = [...formData.members]
    updatedMembers.splice(index, 1)
    setFormData({
      ...formData,
      members: updatedMembers
    })
  }

  const updateMemberEmail = (index: number, value: string) => {
    const updatedMembers = [...formData.members]
    updatedMembers[index] = value
    setFormData({
      ...formData,
      members: updatedMembers
    })
    
    // Clear error when typing
    if (errors[`member-${index}`]) {
      const newErrors = { ...errors }
      delete newErrors[`member-${index}`]
      setErrors(newErrors)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a New Expense Group</CardTitle>
        <CardDescription>Fill in the details to create your expense splitting group</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="group-name">Group Name</Label>
            <Input
              id="group-name"
              placeholder="e.g., Summer Trip 2023"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value })
                if (errors.name) {
                  const newErrors = { ...errors }
                  delete newErrors.name
                  setErrors(newErrors)
                }
              }}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="group-description">Description (Optional)</Label>
            <Textarea
              id="group-description"
              placeholder="Describe what this group is for"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          
          <div className="space-y-3">
            <Label>Group Members</Label>
            <p className="text-sm text-gray-500">Add the email addresses of people you want to split expenses with</p>
            
            {formData.members.map((member, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  placeholder="Email address"
                  value={member}
                  onChange={(e) => updateMemberEmail(index, e.target.value)}
                  className={errors[`member-${index}`] ? "border-red-500" : ""}
                />
                {index > 0 && (
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeMemberField(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
                {errors[`member-${index}`] && (
                  <p className="text-sm text-red-500">{errors[`member-${index}`]}</p>
                )}
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addMemberField}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Another Member
            </Button>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onCancel} type="button">
            Cancel
          </Button>
          <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Group"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
