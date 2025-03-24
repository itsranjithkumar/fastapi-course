"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Menu, User, LogOut, Plus, Settings } from "lucide-react"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <img src="/logo.svg" alt="Your Logo" className="h-15 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <Button asChild variant="ghost" size="sm" className="text-sm">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="text-sm">
            <Link href="/create-post">Create Post</Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="text-sm">
            <Link href="/profile">Profile</Link>
          </Button>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden h-8 w-8 p-0"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle Menu</span>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent side="left" className="w-[300px] p-0">
              <div className="border-b border-border/40 px-6 py-4">
                <Link
                  href="/"
                  className="flex items-center"
                  onClick={() => setOpen(false)}
                >
                  <img src="/logo.png" alt="Your Logo" className="h-8 w-auto" />
                </Link>
              </div>
              <nav className="flex flex-col p-6">
                <div className="space-y-4">
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex items-center text-sm font-medium transition-colors hover:text-primary"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/create-post"
                    onClick={() => setOpen(false)}
                    className="flex items-center text-sm font-medium transition-colors hover:text-primary"
                  >
                    Create Post
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center text-sm font-medium transition-colors hover:text-primary"
                  >
                    Profile
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          <div className="hidden md:flex items-center gap-2">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-full"
            >
              <Link href="/create-post">
                <Plus className="h-4 w-4" />
                <span className="sr-only">Create Post</span>
              </Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full"
                >
                  <User className="h-4 w-4" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 rounded-xl border-border/50"
              >
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" /> Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 focus:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}