"use client"

import { useState } from "react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ArrowDown, ArrowUp, MoreVertical, Pencil, Trash } from "lucide-react"

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

interface PostCardProps {
  key: string;
  post: Post;
  currentUserId: string;
  onVote: (postId: string, voteType: "upvote" | "downvote") => Promise<void>;
  onDelete: (postId: string) => Promise<void>;
  onEdit: () => void;
}

export default function PostCard({ post, currentUserId, onVote, onDelete, onEdit }: PostCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const isAuthor = post.author.id === currentUserId

  const handleVote = (voteType: "upvote" | "downvote") => {
    onVote(post.id, voteType)
  }

  const handleDelete = () => {
    onDelete(post.id)
    setShowDeleteDialog(false)
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{post.title}</CardTitle>
          {isAuthor && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="-mr-2">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Button onClick={onEdit} className="flex items-center">
                    <Pencil className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <div className="text-sm text-muted-foreground">
          Posted by {post.author.name} • {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm">{post.description}</p>
      </CardContent>
      <CardFooter className="pt-3 flex justify-between items-center border-t">
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className={post.userVote === "upvote" ? "text-primary" : ""}
            onClick={() => handleVote("upvote")}
          >
            <ArrowUp className="h-4 w-4" />
            <span className="sr-only">Upvote</span>
          </Button>
          <span className="text-sm font-medium">{post.votes}</span>
          <Button
            variant="ghost"
            size="icon"
            className={post.userVote === "downvote" ? "text-primary" : ""}
            onClick={() => handleVote("downvote")}
          >
            <ArrowDown className="h-4 w-4" />
            <span className="sr-only">Downvote</span>
          </Button>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/posts/${post.id}`}>View Details</Link>
        </Button>
      </CardFooter>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}
