import type { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left panel — hidden on mobile */}
      <div className="hidden lg:flex flex-col bg-[#1C3A2B] w-1/2 p-12 justify-between">
        {/* Top: logo + tagline */}
        <div>
          <div className="w-14 h-14 rounded-full bg-[#C8922A] flex items-center justify-center">
            <span className="font-heading text-white text-xl font-bold">GP</span>
          </div>
          <h1 className="font-heading text-white text-[28px] font-bold mt-4">
            Gordon Pro Tree Service
          </h1>
          <p className="font-body text-white/70 text-base mt-2">
            North Georgia&apos;s trusted tree service professionals
          </p>
        </div>

        {/* Middle: testimonial card */}
        <div className="bg-white/10 rounded-2xl p-6">
          <div className="font-heading text-[#C8922A] text-5xl leading-none">&ldquo;</div>
          <p className="font-body text-white text-[15px] leading-relaxed mt-2">
            Gordon Pro did an amazing job removing a large oak that was threatening our home.
            Professional, fast, and fair pricing.
          </p>
          <p className="font-body text-white/60 text-[13px] mt-4">
            — Sarah M., Gainesville GA
          </p>
        </div>

        {/* Bottom: copyright */}
        <p className="font-body text-white/40 text-xs">
          © 2026 Gordon Pro Tree Service. All rights reserved.
        </p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center bg-[#F5F2ED] p-8">
        <div className="max-w-md w-full">
          {children}
        </div>
      </div>
    </div>
  )
}
