import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-extrabold text-gray-900 sm:text-6xl md:text-7xl">
          Welcome to the Social Media Platform
        </h1>
        <p className="max-w-2xl text-lg text-gray-600 mx-auto">
          Connect with others, share your thoughts, and engage with the community in a seamless and intuitive way.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <Button asChild size="lg" className="bg-blue-600 text-white hover:bg-blue-700 transition duration-300 ease-in-out">
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out">
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    </div>
  )
}