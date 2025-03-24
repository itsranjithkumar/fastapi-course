"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, ArrowLeft } from "lucide-react"

export default function CreatePostPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:8000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          description: description,
        }),
      });

      if (!response.ok) {
        throw new Error('Post creation failed');
      }

      const data = await response.json();
      console.log('Post created successfully:', data);
      toast({
        title: "Post published!",
        description: "Your thoughts are now live for everyone to see.",
      })
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please check your content and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
   

      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="space-y-2 text-center mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Create a New Post</h1>
          <p className="text-muted-foreground">Share your thoughts with the community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 border border-gray-300 p-4 bg-white rounded-lg shadow-md">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Enter a title for your post"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-12 rounded-xl border-border/50 bg-background/50 backdrop-blur-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Write your post content here..."
                rows={8}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[200px] rounded-xl border-border/50 bg-background/50 backdrop-blur-sm resize-none"
                required
              />
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
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Publishing post...
                </>
              ) : (
                "Publish Post"
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
