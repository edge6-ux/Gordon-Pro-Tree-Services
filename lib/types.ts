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
  customer_email?: string
  property_address: string
  description_of_work: string
  total_cost: number
  status: string
  date: string
  customer_signature: string | null
  signed_at: string | null
  job_id?: string | null
  sales_rep?: string | null
  hours_estimate?: number | null
  wet_dry?: string | null
  tree_services_cost?: number | null
  stump_removal_cost?: number | null
  discount?: number | null
  card_fee_applied?: boolean | null
}

export type AIResult = {
  no_tree_detected?: boolean
  species_name: string
  species_confidence: 'high' | 'medium' | 'low'
  species_description: string
  key_characteristics: string[]
  site_considerations: string[]
  crew_tips: string[]
  generated_at?: string
}

export type CustomerFinding = {
  severity: 'high' | 'medium' | 'low'
  plain_english: string
}

export type CustomerResult = {
  species_name: string
  species_blurb: string
  safety_status: 'attention_needed' | 'monitor' | 'healthy'
  safety_summary: string
  findings: CustomerFinding[]
  recommendation: string
  recommended_service: string
  preventative_tips: string[]
  urgency: 'emergency' | 'soon' | 'routine' | 'none'
}

export type CustomerSubmission = {
  id: string
  created_at: string
  service_type: string
  urgency: string
  property_address: string
  photo_urls: string[]
  ai_result: AIResult | null
  customer_result: CustomerResult | null
  reference_code: string
  status: string
  job_id?: string | null
}

export type JobWithSubmission = CustomerJob & {
  submission: CustomerSubmission | null
}
