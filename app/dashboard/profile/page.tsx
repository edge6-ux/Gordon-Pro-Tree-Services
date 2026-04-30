'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import { getInitials } from '@/lib/utils'

// ─── Toggle ───────────────────────────────────────────────────────────────────

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ${
        checked ? 'bg-[#1C3A2B]' : 'bg-gray-200'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  )
}

// ─── Section label ────────────────────────────────────────────────────────────

function SectionLabel({ children, color }: { children: string; color?: string }) {
  return (
    <p
      className={`font-body text-[11px] uppercase tracking-wider pb-3 border-b border-gray-100 mb-5 ${
        color ?? 'text-[#888780]'
      }`}
    >
      {children}
    </p>
  )
}

// ─── Field ────────────────────────────────────────────────────────────────────

function Field({
  label,
  helper,
  children,
}: {
  label: string
  helper?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block font-body text-[#1A1A1A] text-[13px] font-medium mb-1.5">
        {label}
      </label>
      {children}
      {helper && (
        <p className="font-body text-[#888780] text-[12px] mt-1">{helper}</p>
      )}
    </div>
  )
}

const INPUT =
  'w-full border border-[#D3D1C7] rounded-xl px-4 py-2.5 font-body text-[14px] bg-white focus:outline-none focus:ring-2 focus:ring-[#1C3A2B]'

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const router = useRouter()

  // — load state
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState('')
  const [originalEmail, setOriginalEmail] = useState('')

  // — personal info
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [personalSaving, setPersonalSaving] = useState(false)
  const [personalSaved, setPersonalSaved] = useState(false)
  const [personalError, setPersonalError] = useState<string | null>(null)
  const [emailVerificationSent, setEmailVerificationSent] = useState(false)

  // — password
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordSaving, setPasswordSaving] = useState(false)
  const [passwordSaved, setPasswordSaved] = useState(false)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  // — notification prefs (localStorage)
  const [jobStatusUpdates, setJobStatusUpdates] = useState(true)
  const [quoteNotifications, setQuoteNotifications] = useState(true)
  const [messageNotifications, setMessageNotifications] = useState(true)
  const [prefsSaved, setPrefsSaved] = useState(false)

  // — delete account
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      setUserId(user.id)
      setOriginalEmail(user.email ?? '')
      setEmail(user.email ?? '')
      setFullName(profile?.full_name ?? '')
      setPhone(profile?.phone ?? '')
      setLoading(false)
    }

    void load()

    // Load notification prefs from localStorage
    try {
      const stored = localStorage.getItem('notification_prefs')
      if (stored) {
        const parsed = JSON.parse(stored) as {
          jobStatus?: boolean
          quoteNotifs?: boolean
          messageNotifs?: boolean
        }
        setJobStatusUpdates(parsed.jobStatus ?? true)
        setQuoteNotifications(parsed.quoteNotifs ?? true)
        setMessageNotifications(parsed.messageNotifs ?? true)
      }
    } catch {}
  }, [router])

  async function handleSavePersonal() {
    setPersonalSaving(true)
    setPersonalError(null)
    setEmailVerificationSent(false)
    try {
      const supabase = createClient()
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ full_name: fullName, phone })
        .eq('id', userId)
      if (profileError) throw new Error(profileError.message)

      if (email !== originalEmail) {
        const { error: emailError } = await supabase.auth.updateUser({ email })
        if (emailError) throw new Error(emailError.message)
        setEmailVerificationSent(true)
        setOriginalEmail(email)
      }

      setPersonalSaved(true)
      setTimeout(() => setPersonalSaved(false), 2000)
    } catch (err) {
      setPersonalError(err instanceof Error ? err.message : 'Failed to save changes')
    } finally {
      setPersonalSaving(false)
    }
  }

  async function handleUpdatePassword() {
    setPasswordError(null)
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match')
      return
    }
    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters')
      return
    }
    setPasswordSaving(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({ password: newPassword })
      if (error) throw new Error(error.message)
      setNewPassword('')
      setConfirmPassword('')
      setPasswordSaved(true)
      setTimeout(() => setPasswordSaved(false), 2000)
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : 'Failed to update password')
    } finally {
      setPasswordSaving(false)
    }
  }

  function handleSavePrefs() {
    try {
      localStorage.setItem(
        'notification_prefs',
        JSON.stringify({
          jobStatus: jobStatusUpdates,
          quoteNotifs: quoteNotifications,
          messageNotifs: messageNotifications,
        })
      )
    } catch {}
    setPrefsSaved(true)
    setTimeout(() => setPrefsSaved(false), 2000)
  }

  async function handleDeleteAccount() {
    setDeleting(true)
    setDeleteError(null)
    try {
      const res = await fetch('/api/dashboard/account', { method: 'DELETE' })
      if (!res.ok) {
        const data = (await res.json()) as { error?: string }
        throw new Error(data.error ?? 'Failed to delete account')
      }
      const supabase = createClient()
      await supabase.auth.signOut()
      router.push('/')
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Failed to delete account')
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="w-6 h-6 border-2 border-[#1C3A2B] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <>
      <div className="max-w-2xl mx-auto">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="font-heading text-[#1A1A1A] text-[26px] font-bold">My Profile</h1>
          <p className="font-body text-[#888780] text-[14px] mt-1">
            Manage your account details
          </p>
        </div>

        {/* ─── Personal Information ─────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 shadow-sm">
          <SectionLabel>Personal Information</SectionLabel>

          {/* Avatar row */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-[#1C3A2B] flex items-center justify-center shrink-0">
              <span className="font-heading text-white text-[22px] font-bold">
                {getInitials(fullName || 'U')}
              </span>
            </div>
            <div>
              <p className="font-body text-[#1A1A1A] text-[16px] font-bold">{fullName}</p>
              <p className="font-body text-[#888780] text-[14px]">{email}</p>
              <button
                type="button"
                disabled
                title="Coming soon"
                className="font-body text-[#1C3A2B] text-[13px] mt-1 opacity-40 cursor-not-allowed"
              >
                Change photo
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <Field label="Full name">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={INPUT}
              />
            </Field>

            <Field
              label="Email address"
              helper="Changing your email requires verification"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={INPUT}
              />
            </Field>

            <Field label="Phone number" helper="Used for job updates and scheduling">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={INPUT}
              />
            </Field>
          </div>

          {emailVerificationSent && (
            <p className="font-body text-[#1C3A2B] text-[13px] mt-3">
              A confirmation email has been sent to your new address.
            </p>
          )}

          {personalError && (
            <p className="font-body text-[#DC2626] text-[13px] mt-3">{personalError}</p>
          )}

          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={handleSavePersonal}
              disabled={personalSaving}
              className="bg-[#1C3A2B] text-white font-body text-[14px] font-medium px-5 py-2.5 rounded-xl hover:bg-[#2D5A40] transition-colors disabled:opacity-60"
            >
              {personalSaving ? 'Saving...' : personalSaved ? 'Saved ✓' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* ─── Change Password ──────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 shadow-sm">
          <SectionLabel>Change Password</SectionLabel>

          <div className="space-y-4">
            <Field label="New password" helper="Minimum 8 characters">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={INPUT}
              />
            </Field>

            <Field label="Confirm new password">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={INPUT}
              />
              {passwordError && (
                <p className="font-body text-[#DC2626] text-[13px] mt-1">{passwordError}</p>
              )}
            </Field>
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={handleUpdatePassword}
              disabled={passwordSaving || !newPassword}
              className="bg-[#1C3A2B] text-white font-body text-[14px] font-medium px-5 py-2.5 rounded-xl hover:bg-[#2D5A40] transition-colors disabled:opacity-60"
            >
              {passwordSaving ? 'Saving...' : passwordSaved ? 'Saved ✓' : 'Update Password'}
            </button>
          </div>
        </div>

        {/* ─── Notification Preferences ─────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 shadow-sm">
          <SectionLabel>Notification Preferences</SectionLabel>
          <p className="font-body text-[#888780] text-[13px] mb-4">
            Choose how you hear from us
          </p>

          <div className="space-y-4">
            {[
              {
                label: 'Job Status Updates',
                description: 'Email me when my job status changes',
                value: jobStatusUpdates,
                onChange: setJobStatusUpdates,
              },
              {
                label: 'Quote Notifications',
                description: 'Email me when a new quote is ready for review',
                value: quoteNotifications,
                onChange: setQuoteNotifications,
              },
              {
                label: 'Message Notifications',
                description: 'Email me when Gordon Pro sends a message',
                value: messageNotifications,
                onChange: setMessageNotifications,
              },
            ].map(({ label, description, value, onChange }) => (
              <div key={label} className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-body text-[#1A1A1A] text-[14px] font-medium">{label}</p>
                  <p className="font-body text-[#888780] text-[13px] mt-0.5">{description}</p>
                </div>
                <Toggle checked={value} onChange={onChange} />
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={handleSavePrefs}
              className="bg-[#1C3A2B] text-white font-body text-[14px] font-medium px-5 py-2.5 rounded-xl hover:bg-[#2D5A40] transition-colors"
            >
              {prefsSaved ? 'Saved ✓' : 'Save Preferences'}
            </button>
          </div>
        </div>

        {/* ─── Danger Zone ──────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border-[1.5px] border-[#FCEBEB] p-6">
          <SectionLabel color="text-[#E24B4A]">Account</SectionLabel>

          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-body text-[#1A1A1A] text-[14px] font-bold">Delete Account</p>
              <p className="font-body text-[#888780] text-[13px] mt-1">
                Permanently delete your account and all associated data.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="font-body text-[14px] text-[#E24B4A] border border-[#E24B4A] bg-white px-4 py-2 rounded-xl hover:bg-red-50 transition-colors shrink-0"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* ─── Delete confirmation modal ────────────────────────────────── */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowDeleteModal(false)
              setDeleteConfirmText('')
            }
          }}
        >
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6">
            <h2 className="font-heading text-[#1A1A1A] text-[20px] font-bold text-center">
              Delete your account?
            </h2>
            <p className="font-body text-[#4A4A4A] text-[14px] text-center mt-2">
              This cannot be undone. All your data will be permanently deleted.
            </p>

            <div className="mt-4">
              <label className="block font-body text-[13px] font-medium text-[#1A1A1A] mb-1.5">
                Type <strong>DELETE</strong> to confirm
              </label>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="DELETE"
                className="w-full border border-[#D3D1C7] rounded-xl px-4 py-2.5 font-body text-[14px] focus:outline-none focus:ring-2 focus:ring-[#E24B4A]"
              />
            </div>

            {deleteError && (
              <p className="font-body text-[#DC2626] text-[13px] mt-3 text-center">
                {deleteError}
              </p>
            )}

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  setShowDeleteModal(false)
                  setDeleteConfirmText('')
                  setDeleteError(null)
                }}
                className="flex-1 bg-white border border-gray-200 text-[#4A4A4A] font-body text-[14px] py-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={deleteConfirmText !== 'DELETE' || deleting}
                className="flex-1 bg-[#E24B4A] text-white font-body text-[14px] py-3 rounded-xl hover:bg-[#c73f3e] transition-colors disabled:opacity-60"
              >
                {deleting ? 'Deleting...' : 'Delete Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
