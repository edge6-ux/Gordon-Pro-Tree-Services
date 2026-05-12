'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CheckCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase-client'

export default function SignupPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmTouched, setConfirmTouched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const passwordMismatch = confirmTouched && confirmPassword !== '' && password !== confirmPassword
  const isDisabled =
    loading ||
    !fullName.trim() ||
    !email.trim() ||
    !password ||
    !confirmPassword ||
    password !== confirmPassword

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError("Passwords don't match")
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setLoading(true)
    setError(null)

    const supabase = createClient()

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone || '',
          role: 'customer',
        },
      },
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          phone: phone || '',
          role: 'customer',
          email: email,
        })
        .eq('id', user.id)
    }

    // Sync to admin customer_profiles — never block signup if it fails
    try {
      await fetch('/api/auth/sync-customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: fullName, phone, email }),
      })
    } catch {
      // intentionally silent
    }

    // Fire welcome email — never block signup if it fails
    try {
      await fetch('/api/auth/welcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerName: fullName, customerEmail: email }),
      })
    } catch {
      // intentionally silent
    }

    if (data.session) {
      router.push('/dashboard')
      router.refresh()
      return
    }

    setSuccess(true)
  }

  if (success) {
    return (
      <div className="text-center">
        <CheckCircle className="text-[#1C3A2B] mx-auto" size={48} />
        <h1 className="font-heading text-[#1A1A1A] text-[24px] font-bold mt-4">
          Account created!
        </h1>
        <p className="font-body text-[#4A4A4A] text-[15px] mt-2 leading-relaxed">
          Check your email to confirm your account, then sign in.
        </p>
        <Link
          href="/login"
          className="mt-6 block w-full bg-[#1C3A2B] text-white font-heading text-base uppercase py-3.5 rounded-xl text-center hover:bg-[#2D5A40] transition-colors"
        >
          Sign In
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-[#1A1A1A] text-[28px] font-bold">
          Create your account
        </h1>
        <p className="font-body text-[#888780] text-[15px] mt-1 leading-relaxed">
          Track your jobs, view quotes, and stay in touch with our team
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full name */}
        <div>
          <label htmlFor="fullName" className="block font-body text-sm text-[#1A1A1A] font-medium mb-1.5">
            Full name
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Jane Smith"
            required
            className="w-full border border-[#D3D1C7] rounded-xl px-4 py-3 font-body text-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-[#1C3A2B]"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block font-body text-sm text-[#1A1A1A] font-medium mb-1.5">
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

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block font-body text-sm text-[#1A1A1A] font-medium mb-1.5">
            Phone number
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-[#D3D1C7] rounded-xl px-4 py-3 font-body text-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-[#1C3A2B]"
          />
          <p className="font-body text-[#888780] text-[12px] mt-1">
            Optional — helps us reach you about your service
          </p>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block font-body text-sm text-[#1A1A1A] font-medium mb-1.5">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-[#D3D1C7] rounded-xl px-4 py-3 font-body text-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-[#1C3A2B]"
          />
          <p className="font-body text-[#888780] text-[12px] mt-1">Minimum 8 characters</p>
        </div>

        {/* Confirm password */}
        <div>
          <label htmlFor="confirmPassword" className="block font-body text-sm text-[#1A1A1A] font-medium mb-1.5">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={() => setConfirmTouched(true)}
            required
            className="w-full border border-[#D3D1C7] rounded-xl px-4 py-3 font-body text-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-[#1C3A2B]"
          />
          {passwordMismatch && (
            <p className="font-body text-[#DC2626] text-[12px] mt-1">Passwords don&apos;t match</p>
          )}
        </div>

        {/* Terms */}
        <p className="font-body text-[#888780] text-[12px] leading-relaxed">
          By creating an account you agree to our Terms of Service and Privacy Policy.
        </p>

        {/* Error */}
        {error && <p className="font-body text-[#DC2626] text-[13px]">{error}</p>}

        {/* Submit */}
        <button
          type="submit"
          disabled={isDisabled}
          className="w-full bg-[#1C3A2B] text-white font-heading text-base uppercase py-3.5 rounded-xl hover:bg-[#2D5A40] transition-colors disabled:opacity-60"
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      {/* Sign in link */}
      <p className="text-center font-body text-[#4A4A4A] text-[14px] mt-6">
        Already have an account?{' '}
        <Link href="/login" className="text-[#1C3A2B] font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
