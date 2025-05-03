import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ExpenseSplitterHero() {
  return (
    <section className="relative py-20 overflow-hidden p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-white" />
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-[radial-gradient(circle_500px_at_50%_200px,rgba(16,185,129,0.1),transparent)]" />
      </div>

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
              Split Expenses <span className="text-emerald-600">Effortlessly</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-lg mb-8">
              The simplest way to track, split, and settle expenses with friends and groups. No more awkward money talks
              or complicated calculations.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link href="/register">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                  Get Started — It's Free
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button size="lg" variant="outline">
                  See How It Works
                </Button>
              </Link>
            </div>
            <div className="mt-8 text-sm text-gray-500">
              <p>No credit card required • Free for personal use</p>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
              <img
                src="/placeholder.svg?height=600&width=800"
                alt="Expense Splitter App Dashboard"
                className="w-full h-auto"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-emerald-100 rounded-full -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-emerald-200 rounded-full -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
