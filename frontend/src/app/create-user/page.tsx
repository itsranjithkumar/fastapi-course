"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, ArrowLeft } from "lucide-react"

export default function CreateUserPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("User")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // This would be replaced with your actual API call
      // Example: await fetch('/api/users', { method: 'POST', body: JSON.stringify({ name, email, password, role }) })
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulating API call

      toast({
        title: "Welcome aboard!",
        description: "The new user has been added successfully.",
      })
      router.push("/dashboard?tab=users")
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please check your information and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
     

      <main className="max-w-xl mx-auto px-6 py-12">
        <div className="space-y-2 text-center mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Create New User</h1>
          <p className="text-muted-foreground">Add a new member to your team</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 border border-gray-300 p-4 bg-white rounded-lg shadow-md">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 rounded-xl border-border/50 bg-background/50 backdrop-blur-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl border-border/50 bg-background/50 backdrop-blur-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 rounded-xl border-border/50 bg-background/50 backdrop-blur-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-sm font-medium">
                Role
              </Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="h-12 rounded-xl border-border/50 bg-background/50 backdrop-blur-sm">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Moderator">Moderator</SelectItem>
                  <SelectItem value="User">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-4">
            <Button
              type="submit"
              className="h-12 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="h-12 rounded-xl hover:bg-accent transition-colors"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
