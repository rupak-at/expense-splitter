import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Users } from 'lucide-react'

interface NoGroupViewProps {
  onCreateGroup: () => void
}

export default function NoGroupView({ onCreateGroup }: NoGroupViewProps) {
  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle>You're not in any expense group</CardTitle>
        <CardDescription>Create a group to start splitting expenses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-8">
          <Users className="h-16 w-16 text-gray-400 mb-4" />
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Create a group for your trip or shared expenses. Add members and start tracking who paid for what.
            When you're done, generate a settlement report to see who owes whom.
          </p>
          <Button onClick={onCreateGroup} className="bg-emerald-600 hover:bg-emerald-700">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Expense Group
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
