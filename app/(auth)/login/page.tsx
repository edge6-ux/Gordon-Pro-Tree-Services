'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(
        error.message === 'Invalid login credentials'
          ? 'Incorrect email or password'
          : error.message
      )
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-[#1A1A1A] text-[28px] font-bold">Welcome back</h1>
        <p className="font-body text-[#888780] text-[15px] mt-1">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block font-body text-sm text-[#1A1A1A] font-medium mb-1.5"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
            className="w-full border border-[#D3D1C7] rounded-xl px-4 py-3 font-body text-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-[#1C3A2B]"
          />
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="password" className="font-body text-sm text-[#1A1A1A] font-medium">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="font-body text-[#1C3A2B] text-[13px] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-[#D3D1C7] rounded-xl px-4 py-3 font-body text-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-[#1C3A2B]"
          />
        </div>

        {/* Error */}
        {error && <p className="font-body text-[#DC2626] text-[13px]">{error}</p>}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#1C3A2B] text-white font-heading text-base uppercase py-3.5 rounded-xl hover:bg-[#2D5A40] transition-colors disabled:opacity-60"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Signing in...
            </span>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 mt-6 mb-6">
        <hr className="flex-1 border-[#D3D1C7]" />
        <span className="font-body text-[#888780] text-[13px]">or</span>
        <hr className="flex-1 border-[#D3D1C7]" />
      </div>

      {/* Sign up link */}
      <p className="text-center font-body text-[#4A4A4A] text-[14px]">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="text-[#1C3A2B] font-medium hover:underline">
          Create one
        </Link>
      </p>
    </div>
  )
}
