"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token")

        if (token) {
          // This would be replaced with your actual API call to validate the token
          // Example: const response = await fetch('/api/me', { headers: { Authorization: `Bearer ${token}` } })

          // Mock user data
          const mockUser: User = {
            id: "user1",
            name: "John Doe",
            email: "john.doe@example.com",
          }

          setUser(mockUser)
        }
      } catch (error) {
        console.error("Authentication error:", error)
        localStorage.removeItem("token")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Redirect unauthenticated users from protected routes
  useEffect(() => {
    if (!isLoading) {
      const protectedRoutes = ["/dashboard", "/profile", "/create-post", "/edit-post"]
      const isProtectedRoute = protectedRoutes.some((route) => pathname?.startsWith(route))

      if (isProtectedRoute && !user) {
        router.push("/login")
      }

      // Redirect authenticated users from auth pages
      const authRoutes = ["/login", "/signup"]
      const isAuthRoute = authRoutes.includes(pathname || "")

      if (isAuthRoute && user) {
        router.push("/dashboard")
      }
    }
  }, [isLoading, user, pathname, router])

  const login = async (email: string, password: string) => {
    // This would be replaced with your actual API call
    // Example: const response = await fetch('/api/login', { method: 'POST', body: JSON.stringify({ email, password }) })

    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Mock validation
        if (email && password) {
          // Store token
          localStorage.setItem("token", "mock-jwt-token")

          // Set user
          const mockUser: User = {
            id: "user1",
            name: "John Doe",
            email: email,
          }

          setUser(mockUser)
          resolve()
        } else {
          reject(new Error("Invalid credentials"))
        }
      }, 1000)
    })
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

