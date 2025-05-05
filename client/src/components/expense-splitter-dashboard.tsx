"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NoGroupView from "@/components/no-group-view"
import CreateGroupForm from "@/components/create-group-form"
import GroupExpenses from "@/components/group-expense"
import AddExpenseForm from "@/components/add-expense-form"
import SettlementReport from "@/components/settlement-report"
import { useSelector } from "react-redux"
import { User } from "@/utils/type"
import { useAppSelector } from "@/app/hooks"

const mockUser = {
  id: "user-1",
  name: "John Doe",
  email: "john@example.com",
}

const mockGroup = {
  id: "group-1",
  name: "Summer Trip 2023",
  description: "Expenses for our summer trip to the beach",
  createdAt: "2023-05-15T10:30:00Z",
  members: [
    { id: "user-1", name: "John Doe", email: "john@example.com" },
    { id: "user-2", name: "Jane Smith", email: "jane@example.com" },
    { id: "user-3", name: "Bob Johnson", email: "bob@example.com" },
  ],
  isAdmin: true, // Current user is admin of this group
}

// Mock expenses data
const mockExpenses = [
  {
    id: "exp-1",
    title: "Groceries",
    amount: 120.50,
    description: "Food for the weekend",
    paidBy: { id: "user-1", name: "John Doe" },
    date: "2023-05-16T14:30:00Z",
    splitAmong: ["user-1", "user-2", "user-3"]
  },
  {
    id: "exp-2",
    title: "Gas",
    amount: 45.75,
    description: "Fuel for the road trip",
    paidBy: { id: "user-2", name: "Jane Smith" },
    date: "2023-05-17T10:15:00Z",
    splitAmong: ["user-1", "user-2", "user-3"]
  },
  {
    id: "exp-3",
    title: "Restaurant",
    amount: 89.25,
    description: "Dinner at seafood place",
    paidBy: { id: "user-3", name: "Bob Johnson" },
    date: "2023-05-17T19:45:00Z",
    splitAmong: ["user-1", "user-2", "user-3"]
  },
]

// Mock settlement data
const mockSettlement = [
  { from: { id: "user-1", name: "John Doe" }, to: { id: "user-2", name: "Jane Smith" }, amount: 15.25 },
  { from: { id: "user-1", name: "John Doe" }, to: { id: "user-3", name: "Bob Johnson" }, amount: 20.50 },
]

export default function ExpenseSplitterDashboard() {
  const {user} = useAppSelector((state) => state.userDetails)
  // const [hasGroup, setHasGroup] = useState(false)
  const [group, setGroup] = useState<typeof mockGroup | null>(null)
  const [isCreatingGroup, setIsCreatingGroup] = useState(false)
  const [expenses, setExpenses] = useState<typeof mockExpenses>([])
  const [settlement, setSettlement] = useState<typeof mockSettlement | null>(null)
  const [activeTab, setActiveTab] = useState("expenses")


  const handleAddExpense = (expenseData: { 
    title: string; 
    amount: number; 
    description: string;
    splitAmong: string[];
  }) => {
    const newExpense = {
      id: `exp-${expenses.length + 1}`,
      title: expenseData.title,
      amount: expenseData.amount,
      description: expenseData.description,
      paidBy: { id: mockUser.id, name: mockUser.name },
      date: new Date().toISOString(),
      splitAmong: expenseData.splitAmong
    }

    setExpenses([...expenses, newExpense])
    setActiveTab("expenses")
  }

  const handleGenerateSettlement = () => {
    //  API to calculate the settlement
    
  }

  const handleLeaveGroup = () => {
    //  API to leave the group
 
  }

  return (
    <div className="space-y-6">
      {/* Group management section */}
      {user.groups.length > 0 ? (
        <div className="space-y-6">
          {/* Group info header */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{group?.name}</h2>
                <p className="text-gray-500">{group?.description}</p>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <span>{group?.members.length} members</span>
                  <span className="mx-2">•</span>
                  <span>Created {new Date(group?.createdAt || "").toLocaleDateString()}</span>
                </div>
              </div>
              <button 
                onClick={handleLeaveGroup}
                className="px-3 py-1 bg-red-50 text-red-700 rounded-md text-sm hover:bg-red-100"
              >
                Leave Group
              </button>
            </div>
          </div>

          {/* Tabs for expenses, add expense, and settlement */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
              <TabsTrigger value="add">Add Expense</TabsTrigger>
              <TabsTrigger value="settlement">Settlement</TabsTrigger>
            </TabsList>

            <TabsContent value="expenses">
              <GroupExpenses 
                expenses={expenses} 
                members={group?.members || []} 
                onGenerateSettlement={handleGenerateSettlement}
                isAdmin={group?.isAdmin || false}
              />
            </TabsContent>

            <TabsContent value="add">
              <AddExpenseForm 
                members={group?.members || []} 
                currentUserId={mockUser.id}
                onAddExpense={handleAddExpense} 
              />
            </TabsContent>

            <TabsContent value="settlement">
              <SettlementReport 
                settlement={settlement} 
                expenses={expenses}
                onGenerateSettlement={handleGenerateSettlement}
              />
            </TabsContent>
          </Tabs>
        </div>
      ) : isCreatingGroup ? (
        <CreateGroupForm

        />
      ) : (
        <NoGroupView onCreateGroup={() => setIsCreatingGroup(true)} />
      )}
    </div>
  )
}
