import { NextResponse } from 'next/server'

export async function PATCH() {
  return NextResponse.json({ error: 'Quotes are accepted in person.' }, { status: 410 })
}
