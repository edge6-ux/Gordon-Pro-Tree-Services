import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function GET() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: jobs } = await supabase
    .from('jobs')
    .select('id')
    .eq('customer_email', user.email ?? '')

  const jobIds = jobs?.map((j) => j.id) ?? []
  if (!jobIds.length) {
    return NextResponse.json([])
  }

  const { data: messages, error } = await supabase
    .from('messages')
    .select('*')
    .in('job_id', jobIds)
    .neq('direction', 'internal')
    .order('created_at', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(messages ?? [])
}

export async function POST(req: NextRequest) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { jobId, body } = (await req.json()) as { jobId: string; body: string }

  const { data: job } = await supabase
    .from('jobs')
    .select('id')
    .eq('id', jobId)
    .eq('customer_email', user.email ?? '')
    .single()

  if (!job) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { data: message, error } = await supabase
    .from('messages')
    .insert({
      job_id: jobId,
      direction: 'inbound',
      channel: 'email',
      subject: null,
      body,
      sent_by: user.email,
      status: 'sent',
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(message)
}
