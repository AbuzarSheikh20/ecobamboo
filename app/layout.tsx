import type { Metadata } from 'next'
import './globals.css'
import { Inter } from "next/font/google";
import GradientOverlay from '@/components/gradient-overlay';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GradientOverlay />
        {children}
      </body>
    </html>
  )
}
