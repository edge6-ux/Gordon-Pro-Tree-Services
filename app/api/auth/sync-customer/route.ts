import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  const { name, phone, email } = (await req.json()) as {
    name: string
    phone?: string
    email: string
  }

  // Only sync to admin customer_profiles if a phone number was provided —
  // phone is the unique identifier used throughout the admin dashboard.
  if (!phone?.trim()) {
    return NextResponse.json({ skipped: true })
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  const cleanPhone = phone.replace(/\D/g, '')

  const { error } = await supabaseAdmin
    .from('customer_profiles')
    .upsert(
      {
        name: name.trim(),
        phone: cleanPhone,
        email: email.trim(),
        address: '',
        lead_source: 'website',
        referred_by: '',
        other_source: '',
        sales_rep: '',
      },
      { onConflict: 'phone', ignoreDuplicates: false }
    )

  if (error) {
    console.error('sync-customer failed:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
