"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Mail, User } from "lucide-react"
import PostCard from "../components/post-card"
import { useAuth } from "@/components/auth-provider"

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

export default function ProfilePage() {
  const [userPosts, setUserPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        // This would be replaced with your actual API call
        // Example: const response = await fetch('/api/user/posts')
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulating API call

        // Mock data
        const mockPosts: Post[] = [
          {
            id: "1",
            title: "Getting Started with Next.js",
            description: "Next.js is a React framework that gives you building blocks to create web applications.",
            author: {
              id: user?.id || "user1",
              name: user?.name || "John Doe",
            },
            votes: 15,
            userVote: null,
            createdAt: new Date().toISOString(),
          },
          {
            id: "3",
            title: "The Power of TypeScript",
            description:
              "TypeScript adds static type definitions to JavaScript, providing better tooling at any scale.",
            author: {
              id: user?.id || "user1",
              name: user?.name || "John Doe",
            },
            votes: 12,
            userVote: "downvote",
            createdAt: new Date(Date.now() - 172800000).toISOString(),
          },
        ]

        setUserPosts(mockPosts)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch user posts. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserPosts()
  }, [toast, user])

  const handleVote = async (postId: string, voteType: "upvote" | "downvote") => {
    try {
      // This would be replaced with your actual API call
      // Example: await fetch('/api/vote', { method: 'POST', body: JSON.stringify({ postId, voteType }) })

      // Update local state optimistically
      setUserPosts((prevPosts) =>
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

  const handleDelete = async (postId: string) => {
    try {
      // This would be replaced with your actual API call
      // Example: await fetch(`/api/posts/${postId}`, { method: 'DELETE' })

      // Update local state
      setUserPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId))

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Profile</CardTitle>
          <CardDescription>Manage your account and view your posts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium">{user?.name || "John Doe"}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="mr-1 h-4 w-4" />
                  {user?.email || "john.doe@example.com"}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="posts">My Posts</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="mt-6">
          {userPosts.length === 0 ? (
            <div className="text-center py-10">
              <h3 className="text-lg font-medium">No posts yet</h3>
              <p className="text-muted-foreground mt-1">You haven't created any posts yet.</p>
              <Button asChild className="mt-4">
                <Link href="/create-post">Create Post</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {userPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  currentUserId={user?.id || ""}
                  onVote={handleVote}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="activity" className="mt-6">
          <div className="text-center py-10">
            <h3 className="text-lg font-medium">Activity Feed</h3>
            <p className="text-muted-foreground mt-1">Your recent activity will appear here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

