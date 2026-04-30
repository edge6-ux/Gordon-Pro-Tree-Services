import { NextRequest, NextResponse } from 'next/server'
import { sendWelcomeEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  const { customerName, customerEmail } = (await req.json()) as {
    customerName: string
    customerEmail: string
  }

  try {
    await sendWelcomeEmail({ customerName, customerEmail })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Welcome email failed:', err)
    return NextResponse.json({ success: false })
  }
}
