import { Shield, Package, Globe2, Headphones, Zap, BarChart3 } from 'lucide-react'

const reasons = [
  {
    icon: Shield,
    title: 'Certified Quality',
    desc: 'All products come with full material certification and traceability documentation.',
  },
  {
    icon: Package,
    title: 'Wide Product Range',
    desc: 'From standard profiles to custom specifications — we have it or we source it.',
  },
  {
    icon: Globe2,
    title: 'Global Logistics',
    desc: 'Extensive shipping network covering sea, air, and land freight worldwide.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    desc: 'Dedicated account managers and technical support available around the clock.',
  },
  {
    icon: Zap,
    title: 'Fast Quotation',
    desc: 'Receive competitive quotes within 24 hours for any product inquiry.',
  },
  {
    icon: BarChart3,
    title: 'Competitive Pricing',
    desc: 'Direct factory relationships ensure the best market prices consistently.',
  },
]

export function WhyUsSection() {
  return (
    <section className="bg-steel-50 py-20">
      <div className="container-wide">
        <div className="text-center mb-14">
          <div className="flex justify-center mb-4">
            <div className="divider-gold" />
          </div>
          <h2 className="section-title">Why Choose MetalDepo?</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            We combine industry expertise with cutting-edge logistics to deliver the metals you
            need — on time, every time.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((item) => (
            <div
              key={item.title}
              className="group bg-white p-8 border-b-2 border-transparent hover:border-gold shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              <div className="flex h-12 w-12 items-center justify-center bg-navy-50 text-navy mb-5 group-hover:bg-gold group-hover:text-navy-900 transition-colors duration-300">
                <item.icon size={22} />
              </div>
              <h3 className="text-navy-900 font-bold text-base mb-2">{item.title}</h3>
              <p className="text-steel-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
