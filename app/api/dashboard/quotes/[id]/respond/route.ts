import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: quote } = await supabase
    .from('quotes')
    .select('customer_email, job_id')
    .eq('id', params.id)
    .single()

  if (!quote || quote.customer_email !== user.email) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { action } = (await req.json()) as {
    action: 'accept' | 'decline'
    reason?: string
  }

  const { error: updateError } = await supabase
    .from('quotes')
    .update({
      status: action === 'accept' ? 'accepted' : 'declined',
      ...(action === 'accept' && { signed_at: new Date().toISOString() }),
    })
    .eq('id', params.id)

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  if (quote.job_id) {
    await supabase
      .from('jobs')
      .update({ status: action === 'accept' ? 'assigned' : 'reviewed' })
      .eq('id', quote.job_id)
  }

  return NextResponse.json({ success: true })
}
