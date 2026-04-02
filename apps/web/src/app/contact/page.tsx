import type { Metadata } from 'next'
import { ContactForm } from '@/components/contact/ContactForm'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us — Get a Quote',
  description: 'Get in touch with MetalDepo for quotes, product inquiries, or partnership opportunities.',
}

const contactInfo = [
  {
    icon: MapPin,
    title: 'Our Location',
    lines: ['123 Industrial Boulevard', 'Istanbul, Turkey 34000'],
  },
  {
    icon: Phone,
    title: 'Phone',
    lines: ['+90 500 123 45 67', '+90 212 345 67 89'],
  },
  {
    icon: Mail,
    title: 'Email',
    lines: ['info@metaldepo.com', 'sales@metaldepo.com'],
  },
  {
    icon: Clock,
    title: 'Business Hours',
    lines: ['Mon–Fri: 08:00 – 18:00', 'Sat: 09:00 – 14:00 (UTC+3)'],
  },
]

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-navy-950 pt-28 pb-16">
        <div className="container-wide">
          <div className="divider-gold mb-4" />
          <h1 className="text-4xl font-black text-white tracking-tight mb-3 md:text-5xl">
            Get in Touch
          </h1>
          <p className="text-white/50 text-lg max-w-xl">
            Ready to source premium metal products? Our team will respond within 24 hours with a
            competitive quote.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-steel-50 py-16">
        <div className="container-wide">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-0">
              <div className="bg-navy-DEFAULT text-white p-8 mb-0">
                <h2 className="text-xl font-bold mb-2">Contact Information</h2>
                <p className="text-white/50 text-sm mb-8">
                  Reach out directly or use the form to send us a message.
                </p>

                <div className="space-y-7">
                  {contactInfo.map(({ icon: Icon, title, lines }) => (
                    <div key={title} className="flex items-start gap-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-white/5">
                        <Icon size={15} className="text-gold-DEFAULT" />
                      </div>
                      <div>
                        <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">
                          {title}
                        </p>
                        {lines.map((line) => (
                          <p key={line} className="text-white/80 text-sm">{line}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="h-48 bg-steel-200 flex items-center justify-center">
                <span className="text-steel-400 text-sm">Map Placeholder</span>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-white p-8 shadow-card">
                <h2 className="text-xl font-bold text-navy-900 mb-2">Send Us a Message</h2>
                <p className="text-steel-500 text-sm mb-8">
                  Fill in your details and we&apos;ll get back to you with a personalized quote.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
