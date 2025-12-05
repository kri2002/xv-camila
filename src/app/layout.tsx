import type { Metadata } from 'next'
import { Playfair_Display, Lato } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'XV Años | Jatziry',
  description: 'Estás invitado a mi celebración',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={cn('min-h-screen bg-neutral-50 font-sans antialiased', playfair.variable, lato.variable)}>
        {children}
      </body>
    </html>
  )
}