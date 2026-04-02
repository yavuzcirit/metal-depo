import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'

export function CtaSection() {
  return (
    <section className="bg-metal-gradient py-20 relative overflow-hidden">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="container-wide relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold text-xs font-semibold uppercase tracking-widest px-4 py-2 mb-6">
            Ready to Order?
          </div>
          <h2 className="text-4xl font-black text-white leading-tight tracking-tight mb-5 md:text-5xl">
            Start Sourcing Premium
            <br />
            <span className="text-gold">Metal Products Today</span>
          </h2>
          <p className="text-white/50 text-base leading-relaxed mb-10 max-w-xl mx-auto">
            Get competitive quotes within 24 hours. Our team of experts is ready to help you find
            exactly what your project needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="btn-gold">
              Request a Quote
              <ArrowRight size={16} />
            </Link>
            <a
              href="tel:+905001234567"
              className="inline-flex items-center gap-2 text-white/70 text-sm hover:text-white transition-colors"
            >
              <Phone size={15} />
              <span>+90 500 123 45 67</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
