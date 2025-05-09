"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NoGroupView from "@/components/no-group-view"
import CreateGroupForm from "@/components/create-group-form"
import GroupExpenses from "@/components/group-expense"
import AddExpenseForm from "@/components/add-expense-form"
import SettlementReport from "@/components/settlement-report"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { getGroup } from "@/lib/queryProvider/getGroup"
import { setGroup } from "@/lib/redux/features/groupSlice"
import { addExpense } from "@/lib/queryProvider/addExpense"
import { setExpense } from "@/lib/redux/features/expenseSlice"
import { toast } from "sonner"

const mockUser = {
  id: "user-1",
  name: "John Doe",
  email: "john@example.com",
}



// Mock settlement data
const mockSettlement = [
  { from: { id: "user-1", name: "John Doe" }, to: { id: "user-2", name: "Jane Smith" }, amount: 15.25 },
  { from: { id: "user-1", name: "John Doe" }, to: { id: "user-3", name: "Bob Johnson" }, amount: 20.50 },
]

export default function ExpenseSplitterDashboard() {
  const {user} = useAppSelector((state) => state.userDetails)
  // const [hasGroup, setHasGroup] = useState(false)
  const {expense} = useAppSelector((state) => state.expenseDetails)
  const [isCreatingGroup, setIsCreatingGroup] = useState(false)
  const [expenses, setExpenses] = useState([])
  const [settlement, setSettlement] = useState<typeof mockSettlement | null>(null)
  const [activeTab, setActiveTab] = useState("expenses")
  const dispatch = useAppDispatch()


  const {group} = useAppSelector((state) => state.groupDetails)
  const {data, isLoading} = getGroup()
  const { mutate , data: expenseData, isPending: expenseLoading} = addExpense()

  useEffect(() => {
    if (!isLoading && data) {
      console.log(data)
      dispatch(setGroup(data))
    }

  }, [data, isLoading, dispatch])


  const handleAddExpense = (expenseData: { title: string; amount: number; description: string;}) => {

    const exp = {...expenseData, groupId: group._id,}

    console.log(expenseData)

    mutate(exp, {
      onSuccess: (data) => {
        console.log(data)
        dispatch(setExpense(data))
        toast.success("Expense added successfully")
        setActiveTab("expenses")
      },
      onError: () => {
        console.log("error")
        toast.error("Failed to add expense")
      }
    })
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
      {group.members.length > 0 ? (

          <div className="space-y-6">
          {/* Group info header */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{group?.groupName}</h2>
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
                expenses={expense} 
                members={group?.members || []} 
                onGenerateSettlement={handleGenerateSettlement}
                isAdmin={group?.createdBy === user._id.toString() || false}
              />
            </TabsContent>

            <TabsContent value="add">
              <AddExpenseForm 
                members={group?.members || []} 
                currentUserId={user._id}
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
        )
       : isCreatingGroup ? (
        <CreateGroupForm

        />
      ) : (
        <NoGroupView onCreateGroup={() => setIsCreatingGroup(true)} />
      )}
    </div>
  )
}
