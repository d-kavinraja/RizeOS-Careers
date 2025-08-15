"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Zap, User, Plus, FileText } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 lg:h-20 xl:h-24 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 lg:space-x-3">
          <div className="flex h-8 w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-5 w-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7 text-primary-foreground" />
          </div>
          <span className="text-xl lg:text-2xl xl:text-3xl font-bold">RizeOS</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
          <Link
            href="/jobs"
            className="text-sm lg:text-base xl:text-lg font-medium hover:text-primary transition-colors"
          >
            Jobs
          </Link>
          <Link
            href="/companies"
            className="text-sm lg:text-base xl:text-lg font-medium hover:text-primary transition-colors"
          >
            Companies
          </Link>
          <Link
            href="/feed"
            className="text-sm lg:text-base xl:text-lg font-medium hover:text-primary transition-colors"
          >
            Feed
          </Link>
          <Link
            href="/about"
            className="text-sm lg:text-base xl:text-lg font-medium hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm lg:text-base xl:text-lg font-medium hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-2 lg:space-x-3 xl:space-x-4">
          <Button
            variant="outline"
            size="sm"
            className="lg:text-base lg:px-4 lg:py-2 xl:px-6 xl:py-3 bg-transparent"
            asChild
          >
            <Link href="/resume">
              <FileText className="h-4 w-4 lg:h-5 lg:w-5 mr-1 lg:mr-2" />
              Resume AI
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="lg:text-base lg:px-4 lg:py-2 xl:px-6 xl:py-3 bg-transparent"
            asChild
          >
            <Link href="/post-job">
              <Plus className="h-4 w-4 lg:h-5 lg:w-5 mr-1 lg:mr-2" />
              Post Job
            </Link>
          </Button>
          <Button variant="ghost" size="sm" className="lg:text-base lg:px-4 lg:py-2 xl:px-6 xl:py-3" asChild>
            <Link href="/auth/login">
              <User className="h-4 w-4 lg:h-5 lg:w-5 mr-1 lg:mr-2" />
              Login
            </Link>
          </Button>
        </div>

        <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container py-4 space-y-4">
            <Link href="/jobs" className="block text-sm font-medium hover:text-primary transition-colors">
              Jobs
            </Link>
            <Link href="/companies" className="block text-sm font-medium hover:text-primary transition-colors">
              Companies
            </Link>
            <Link href="/feed" className="block text-sm font-medium hover:text-primary transition-colors">
              Feed
            </Link>
            <Link href="/about" className="block text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="block text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
            <div className="pt-4 space-y-2 border-t">
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent" asChild>
                <Link href="/resume">
                  <FileText className="h-4 w-4 mr-2" />
                  Resume AI
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent" asChild>
                <Link href="/post-job">
                  <Plus className="h-4 w-4 mr-2" />
                  Post Job
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                <Link href="/auth/login">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
