"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LockKeyhole } from "lucide-react"

// Mock kullanıcılar
const MOCK_USERS = [
  { email: "admin@example.com", password: "admin123", name: "Admin User" },
  { email: "user@example.com", password: "user123", name: "Regular User" },
]

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Mock authentication
    setTimeout(() => {
      const user = MOCK_USERS.find((u) => u.email === email && u.password === password)

      if (user) {
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(user))
        router.push("/dashboard")
      } else {
        setError("Email veya şifre hatalı")
        setIsLoading(false)
      }
    }, 800)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
      <Card className="w-full max-w-md border-slate-800 bg-slate-900/50 backdrop-blur">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center">
            <LockKeyhole className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">Hoş Geldiniz</CardTitle>
          <CardDescription className="text-slate-400">Dashboard'a erişmek için giriş yapın</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-200">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-200">
                Şifre
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>
            {error && (
              <p className="text-sm text-red-400 bg-red-950/50 p-3 rounded-md border border-red-900">{error}</p>
            )}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
              {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </Button>
          </form>
          <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <p className="text-xs text-slate-400 mb-2 font-semibold">Demo Hesapları:</p>
            <div className="space-y-1 text-xs text-slate-500">
              <p>Admin: admin@example.com / admin123</p>
              <p>User: user@example.com / user123</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
