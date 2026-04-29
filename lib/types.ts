export type CustomerProfile = {
  id: string
  full_name: string
  email: string
  phone: string
  role: string
  active: boolean
  created_at: string
}

export type CustomerJob = {
  id: string
  created_at: string
  customer_name: string
  customer_phone: string
  customer_email: string
  property_address: string
  status: string
  service_type?: string
  reference_code: string
  scheduled_date: string | null
  scheduled_time: string | null
  completed_at: string | null
  submission_id: string
}

export type CustomerMessage = {
  id: string
  created_at: string
  direction: string
  job_id: string
  body: string
}

export type CustomerQuote = {
  id: string
  created_at: string
  customer_name: string
  property_address: string
  description_of_work: string
  total_cost: number
  status: string
  date: string
  customer_signature: string | null
  signed_at: string | null
}

export type CustomerSubmission = {
  id: string
  created_at: string
  service_type: string
  urgency: string
  property_address: string
  photo_urls: string[]
  ai_result: unknown | null
  customer_result: unknown | null
  reference_code: string
  status: string
}
