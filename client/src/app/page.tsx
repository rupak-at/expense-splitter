import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, CreditCard, PieChart, Receipt, Users, Wallet } from "lucide-react"
import ExpenseSplitterHero from "@/components/home/expense-splitter-hero"
import FeatureCard from "@/components/home/feature-card"
import HowItWorks from "@/components/home/how-it-works"
import Testimonials from "@/components/home/testimonals"
import Footer from "@/components/home/footer"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background px-4">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-6 w-6 text-emerald-600" />
            <span className="text-xl font-bold">SplitWise</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              How It Works
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-emerald-600 hover:bg-emerald-700">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <ExpenseSplitterHero />

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Split Expenses Without The Headache
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our expense splitter makes it easy to track shared expenses and settle up with friends, roommates, and
                travel companions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Users className="h-10 w-10 text-emerald-600" />}
                title="Group Management"
                description="Create groups for trips, roommates, or events. Add members easily with just their email."
              />
              <FeatureCard
                icon={<Receipt className="h-10 w-10 text-emerald-600" />}
                title="Expense Tracking"
                description="Add expenses on the go. Specify who paid and how to split it among group members."
              />
              <FeatureCard
                icon={<CreditCard className="h-10 w-10 text-emerald-600" />}
                title="Smart Settlements"
                description="Our algorithm calculates the minimum number of transactions needed to settle all debts."
              />
              <FeatureCard
                icon={<PieChart className="h-10 w-10 text-emerald-600" />}
                title="Expense Analytics"
                description="See spending patterns and category breakdowns to better understand group expenses."
              />
              <FeatureCard
                icon={<CheckCircle className="h-10 w-10 text-emerald-600" />}
                title="Debt Resolution"
                description="Clear, actionable payment instructions for settling debts between group members."
              />
              <FeatureCard
                icon={<Wallet className="h-10 w-10 text-emerald-600" />}
                title="Simplified Payments"
                description="Mark expenses as settled once payments are complete to keep track of who's paid."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <HowItWorks />

        {/* Testimonials */}
        <Testimonials />

        {/* CTA Section */}
        <section className="py-20 bg-emerald-600">
          <div className="container">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
                Ready to split expenses fairly?
              </h2>
              <p className="text-lg text-emerald-100 max-w-2xl mx-auto mb-8">
                Join thousands of users who have simplified their shared expenses with SplitWise.
              </p>
              <Link href="/register">
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50">
                  Get Started For Free
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
