import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

// Load Inter font with Latin subset
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Overlock Breach - Cyberpunk Hacking Game",
  description:
    "A cyberpunk-style mini-game where you control a virus escaping from antivirus programs inside a computer system maze.",
  keywords: ["cyberpunk", "game", "hacking", "virus", "maze"],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

