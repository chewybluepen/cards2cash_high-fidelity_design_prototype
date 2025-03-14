"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, Camera, CheckCircle, Info, Trash2, Upload } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function ChangeAvatar() {
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<null | "success" | "error">(null)
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null)

  // Predefined avatars
  const avatarOptions = [
    "/placeholder.svg?height=64&width=64",
    "/placeholder.svg?height=64&width=64&text=A",
    "/placeholder.svg?height=64&width=64&text=B",
    "/placeholder.svg?height=64&width=64&text=C",
    "/placeholder.svg?height=64&width=64&text=D",
    "/placeholder.svg?height=64&width=64&text=E",
  ]

  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedAvatar) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setStatus("success")
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/profile">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">Change Avatar</h1>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>Choose a new avatar or upload your own photo</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={selectedAvatar || "/placeholder.svg?height=96&width=96"} alt="Selected Avatar" />
                  <AvatarFallback className="text-2xl">JD</AvatarFallback>
                </Avatar>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Choose from gallery</h3>
                <div className="grid grid-cols-4 gap-2">
                  {avatarOptions.map((avatar, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`rounded-md p-1 transition-all ${
                        selectedAvatar === avatar ? "ring-2 ring-blue-600 ring-offset-2" : "hover:bg-gray-100"
                      }`}
                      onClick={() => handleAvatarSelect(avatar)}
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={avatar} alt={`Avatar option ${index + 1}`} />
                        <AvatarFallback>{index + 1}</AvatarFallback>
                      </Avatar>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Upload your photo</h3>
                <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6">
                  <div className="flex flex-col items-center space-y-2 text-center">
                    <Camera className="h-8 w-8 text-gray-400" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-700">Drag and drop or click to upload</p>
                      <p className="text-xs text-gray-500">PNG, JPG or GIF (max. 2MB)</p>
                    </div>
                    <Button type="button" variant="outline" size="sm">
                      <Upload className="mr-1 h-4 w-4" />
                      Choose File
                    </Button>
                  </div>
                </div>
              </div>

              {status === "success" && (
                <Alert className="bg-green-50 text-green-800">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Success!</AlertTitle>
                  <AlertDescription>Your profile picture has been updated successfully.</AlertDescription>
                </Alert>
              )}

              {status === "error" && (
                <Alert variant="destructive">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    There was a problem updating your profile picture. Please try again.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading || !selectedAvatar}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
              <Button type="button" variant="outline" className="w-full" asChild>
                <Link href="/profile">Cancel</Link>
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-4">
          <Button variant="outline" className="w-full text-red-600 hover:bg-red-50 hover:text-red-700">
            <Trash2 className="mr-2 h-4 w-4" />
            Remove Current Avatar
          </Button>
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}

