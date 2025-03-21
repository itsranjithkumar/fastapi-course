import type React from "react"
import { Inter } from "next/font/google"
import { Toaster } from "../components/ui/sonner"
import Navbar from "../components/navbar"
import { AuthProvider } from "../components/auth-provider" // Ensure this is imported

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Social Media Platform",
  description: "A platform to share and interact with posts",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider> {/* Wrap your components with AuthProvider */}
          <div className="min-h-screen bg-background">
            <Navbar />
            <main className="container mx-auto py-4 px-4 md:px-6">{children}</main>
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}