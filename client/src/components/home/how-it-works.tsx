import { ArrowRight } from "lucide-react"

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Split expenses in three simple steps. No more spreadsheets or calculator apps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
              <span className="text-2xl font-bold text-emerald-600">1</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Create a Group</h3>
            <p className="text-gray-600">
              Start by creating a group for your trip, event, or household. Add members by email to join the expense
              splitting.
            </p>
          </div>

          <div className="flex flex-col items-center text-center relative">
            <div className="hidden md:block absolute left-0 top-8 w-full h-0.5 bg-emerald-100 -z-10" />
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
              <span className="text-2xl font-bold text-emerald-600">2</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Add Expenses</h3>
            <p className="text-gray-600">
              Record expenses as they happen. Specify who paid and how to split it among group members.
            </p>
          </div>

          <div className="flex flex-col items-center text-center relative">
            <div className="hidden md:block absolute left-0 top-8 w-full h-0.5 bg-emerald-100 -z-10" />
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
              <span className="text-2xl font-bold text-emerald-600">3</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Settle Up</h3>
            <p className="text-gray-600">
              Generate a settlement report that shows exactly who owes whom and how much. Simplify payments between
              members.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <a
            href="#"
            className="inline-flex items-center text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
          >
            Watch Demo Video
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
