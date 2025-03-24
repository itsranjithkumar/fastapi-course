"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Plus, Users, FileText } from "lucide-react"
import PostCard from "../components/post-card"
import { useAuth } from "@/components/auth-provider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UserManagement from "../components/user-management"

type Post = {
  id: string
  title: string
  description: string
  author: {
    id: string
    name: string
  }
  votes: number
  userVote?: "upvote" | "downvote" | null
  createdAt: string
}

type User = {
  id: string
  name: string
  email: string
  role?: string
  createdAt: string
}

export default function DashboardPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [isLoadingPosts, setIsLoadingPosts] = useState(true)
  const [isLoadingUsers, setIsLoadingUsers] = useState(true)
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // This would be replaced with your actual API call
        // Example: const response = await fetch('/api/posts')
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulating API call

        // Mock data
        const mockPosts: Post[] = [
          {
            id: "1",
            title: "Getting Started with Next.js",
            description: "Next.js is a React framework that gives you building blocks to create web applications.",
            author: {
              id: "user1",
              name: "John Doe",
            },
            votes: 15,
            userVote: null,
            createdAt: new Date().toISOString(),
          },
          {
            id: "2",
            title: "Why Tailwind CSS is Amazing",
            description:
              "Tailwind CSS is a utility-first CSS framework that can be composed to build any design, directly in your markup.",
            author: {
              id: "user2",
              name: "Jane Smith",
            },
            votes: 8,
            userVote: "upvote",
            createdAt: new Date(Date.now() - 86400000).toISOString(),
          },
          {
            id: "3",
            title: "The Power of TypeScript",
            description:
              "TypeScript adds static type definitions to JavaScript, providing better tooling at any scale.",
            author: {
              id: "user1",
              name: "John Doe",
            },
            votes: 12,
            userVote: "downvote",
            createdAt: new Date(Date.now() - 172800000).toISOString(),
          },
        ]

        setPosts(mockPosts)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch posts. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setIsLoadingPosts(false)
      }
    }

    const fetchUsers = async () => {
      try {
        // This would be replaced with your actual API call
        // Example: const response = await fetch('/api/users')
        await new Promise((resolve) => setTimeout(resolve, 1200)) // Simulating API call

        // Mock data
        const mockUsers: User[] = [
          {
            id: "user1",
            name: "John Doe",
            email: "john.doe@example.com",
            role: "Admin",
            createdAt: new Date(Date.now() - 3000000000).toISOString(),
          },
          {
            id: "user2",
            name: "Jane Smith",
            email: "jane.smith@example.com",
            role: "User",
            createdAt: new Date(Date.now() - 2000000000).toISOString(),
          },
          {
            id: "user3",
            name: "Bob Johnson",
            email: "bob.johnson@example.com",
            role: "User",
            createdAt: new Date(Date.now() - 1000000000).toISOString(),
          },
        ]

        setUsers(mockUsers)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch users. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setIsLoadingUsers(false)
      }
    }

    fetchPosts()
    fetchUsers()
  }, [toast])

  const handleVote = async (postId: string, voteType: "upvote" | "downvote") => {
    try {
      // This would be replaced with your actual API call
      // Example: await fetch('/api/vote', { method: 'POST', body: JSON.stringify({ postId, voteType }) })

      // Update local state optimistically
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id === postId) {
            const voteChange =
              post.userVote === voteType
                ? -1 // Removing vote
                : post.userVote === null
                  ? 1 // Adding new vote
                  : 2 // Changing vote direction

            return {
              ...post,
              votes:
                post.userVote === voteType
                  ? post.votes - (voteType === "upvote" ? 1 : -1)
                  : post.userVote === null
                    ? post.votes + (voteType === "upvote" ? 1 : -1)
                    : post.votes + (voteType === "upvote" ? 2 : -2),
              userVote: post.userVote === voteType ? null : voteType,
            }
          }
          return post
        }),
      )
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register vote. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeletePost = async (postId: string) => {
    try {
      // This would be replaced with your actual API call
      // Example: await fetch(`/api/posts/${postId}`, { method: 'DELETE' })

      // Update local state
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId))

      toast({
        title: "Success",
        description: "Post deleted successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete post. Please try again.",
        variant: "destructive",
      })
    }
  }

  
  const isLoading = isLoadingPosts || isLoadingUsers

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
   

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Dashboard
          </h1>
          <div className="flex gap-3">
            <Button
              asChild
              className="h-10 px-6 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <Link href="/create-post">
                <Plus className="mr-2 h-4 w-4" /> New Post
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-10 px-6 rounded-full border-border/50 hover:bg-accent transition-colors"
            >
              
            </Button>
          </div>
        </div>

        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="h-12 bg-background border border-border/50 rounded-full p-1">
            <TabsTrigger value="posts" className="flex items-center rounded-full px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
              <FileText className="mr-2 h-4 w-4" /> Posts
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center rounded-full px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
              <Users className="mr-2 h-4 w-4" /> Users
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-6">
            {posts.length === 0 ? (
              <div className="text-center py-16 px-6 rounded-3xl border border-border/50 bg-background/50 backdrop-blur-sm">
                <h3 className="text-xl font-medium">No posts yet</h3>
                <p className="text-muted-foreground mt-2">Be the first to create a post!</p>
                <Button
                  asChild
                  className="mt-6 h-10 px-6 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  <Link href="/create-post">Create Post</Link>
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    currentUserId={user?.id || ""}
                    onVote={handleVote}
                    onDelete={handleDeletePost}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <UserManagement users={users} onDeleteUser={handleDeleteUser} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

