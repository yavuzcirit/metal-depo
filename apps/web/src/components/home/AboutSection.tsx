import Link from 'next/link'
import { CheckCircle2, Globe, Award, Truck } from 'lucide-react'

const features = [
  { icon: Globe, text: 'Export to 50+ countries worldwide' },
  { icon: Award, text: 'ISO 9001:2015 certified quality management' },
  { icon: Truck, text: 'Reliable logistics and fast delivery' },
  { icon: CheckCircle2, text: 'Competitive pricing with volume discounts' },
]

export function AboutSection() {
  return (
    <section className="bg-navy-950 py-24 overflow-hidden" id="about">
      <div className="container-wide">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-center">
          {/* Left — Text */}
          <div>
            <div className="divider-gold mb-4" />
            <h2 className="text-4xl font-black text-white leading-tight tracking-tight mb-6 md:text-5xl">
              Your Global Metal
              <span className="text-gold"> Supply Partner</span>
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-6">
              With over two decades of experience in the metal industry, MetalDepo has established
              itself as a leading supplier of high-quality steel, aluminum, and specialty metal
              products to businesses across the globe.
            </p>
            <p className="text-white/60 text-base leading-relaxed mb-10">
              Our commitment to quality, competitive pricing, and exceptional customer service has
              made us the preferred partner for manufacturers, construction firms, and metal
              traders worldwide.
            </p>

            <ul className="space-y-3 mb-10">
              {features.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <Icon size={16} className="text-gold shrink-0" />
                  <span className="text-white/70 text-sm">{text}</span>
                </li>
              ))}
            </ul>

            <Link href="/contact" className="btn-gold">
              Partner With Us
            </Link>
          </div>

          {/* Right — Visual grid */}
          <div className="relative grid grid-cols-2 gap-4">
            {/* Decorative boxes */}
            <div className="aspect-square bg-gradient-to-br from-navy-800 to-steel-800 flex items-center justify-center">
              <div className="text-center p-6">
                <div className="text-5xl font-black text-gold mb-2">20+</div>
                <div className="text-white/50 text-xs uppercase tracking-widest">Years in Metal Industry</div>
              </div>
            </div>
            <div className="aspect-square bg-gold flex items-center justify-center mt-8">
              <div className="text-center p-6">
                <div className="text-5xl font-black text-navy-900 mb-2">50+</div>
                <div className="text-navy-700 text-xs uppercase tracking-widest">Export Destinations</div>
              </div>
            </div>
            <div className="aspect-square bg-gradient-to-br from-steel-800 to-navy-900 flex items-center justify-center -mt-8">
              <div className="text-center p-6">
                <div className="text-5xl font-black text-white mb-2">5K+</div>
                <div className="text-white/50 text-xs uppercase tracking-widest">Product SKUs</div>
              </div>
            </div>
            <div className="aspect-square bg-gradient-to-br from-navy-700 to-navy-900 flex items-center justify-center">
              <div className="text-center p-6">
                <div className="text-5xl font-black text-gold mb-2">99%</div>
                <div className="text-white/50 text-xs uppercase tracking-widest">Client Satisfaction</div>
              </div>
            </div>

            {/* Accent line */}
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 h-24 w-1 bg-gold-gradient hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  )
}
