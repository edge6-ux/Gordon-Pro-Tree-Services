'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'

const AUTH_PATHS = ['/login', '/signup']

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = AUTH_PATHS.some((p) => pathname === p)
  const isDashboard = pathname?.startsWith('/dashboard')

  if (isAuthPage || isDashboard) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
