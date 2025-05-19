"use client";

import { useAppSelector } from "@/app/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSplit } from "@/lib/queryProvider/getSplit";
import { Split } from "@/utils/type";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Calendar, DollarSign, User } from "lucide-react";
import Link from "next/link";

const Page = () => {
  const { group } = useAppSelector((state) => state.groupDetails);
  const { data, isLoading } = useGetSplit(group?._id);
  const { expense } = useAppSelector((state) => state.expenseDetails);

  if (!isLoading && data) {
    console.log(data);
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold text-emerald-700 mb-8">
            Expense Tracker
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-8 px-4">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-3xl font-bold text-emerald-700 mb-8">
            Expense Tracker
          </h1>
          <div>
            <Link href={"/main"}>
              <span className="border px-2 py-1.5 rounded-lg bg-blue-400 text-white hover:bg-blue-500 transition-all duration-100">
                Back
              </span>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="payments" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="payments" className="text-emerald-700">
              Payments Due
            </TabsTrigger>
            <TabsTrigger value="expenses" className="text-emerald-700">
              Expense Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="payments" className="space-y-4">
            <h2 className="text-2xl font-semibold text-emerald-600 mb-4">
              Who Pays Who
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.map((payment: Split, index: number) => (
                <Card
                  key={index}
                  className="border-emerald-200 hover:shadow-md transition-shadow"
                >
                  <CardHeader className="bg-emerald-50 pb-2">
                    <CardTitle className="text-emerald-700 text-lg">
                      Payment #{index + 1}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <User className="h-5 w-5 text-emerald-500 mr-2" />
                        <span className="font-medium">{payment.from}</span>
                      </div>
                      <ArrowRight className="h-5 w-5 text-emerald-500" />
                      <div className="flex items-center">
                        <span className="font-medium">{payment.to}</span>
                        <User className="h-5 w-5 text-emerald-500 ml-2" />
                      </div>
                    </div>
                    <div className="flex justify-center items-center bg-emerald-100 py-3 rounded-md">
                      <span className="h-5 w-5 text-emerald-600">Rs.</span>
                      <span className="text-xl font-bold text-emerald-700">
                        {payment.amount}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="expenses" className="space-y-4">
            <h2 className="text-2xl font-semibold text-emerald-600 mb-4">
              Expense Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {expense.map((expense) => (
                <Card
                  key={expense._id}
                  className="border-emerald-200 hover:shadow-md transition-shadow"
                >
                  <CardHeader className="bg-emerald-50 pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-emerald-700">
                        {expense.title}
                      </CardTitle>
                      <div className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Rs.{expense.amount}
                      </div>
                    </div>
                    <CardDescription>{expense.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-emerald-500 mr-2" />
                        <span className="text-gray-600">
                          {expense.paidBy.userName}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-emerald-500 mr-2" />
                        <span className="text-gray-600">
                          {new Date(expense.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
