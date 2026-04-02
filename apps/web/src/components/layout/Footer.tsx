import Link from 'next/link'
import { Mail, Phone, MapPin, Linkedin, Twitter, ExternalLink } from 'lucide-react'

const productCategories = [
  { label: 'Steel Products', href: '/products?category=steel' },
  { label: 'Aluminum', href: '/products?category=aluminum' },
  { label: 'Stainless Steel', href: '/products?category=stainless' },
  { label: 'Special Alloys', href: '/products?category=alloys' },
]

const quickLinks = [
  { label: 'About Us', href: '/#about' },
  { label: 'Products', href: '/products' },
  { label: 'Contact', href: '/contact' },
  { label: 'Get a Quote', href: '/contact' },
]

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      {/* Top CTA strip */}
      <div className="bg-gold-DEFAULT">
        <div className="container-wide py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-navy-900 font-semibold text-sm tracking-wide">
            Ready to source premium metal products for your business?
          </p>
          <Link
            href="/contact"
            className="btn-primary text-xs bg-navy-900 hover:bg-navy-800 border-0 whitespace-nowrap"
          >
            Request a Quote
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="flex h-9 w-9 items-center justify-center bg-gold-DEFAULT">
                <span className="text-navy-900 font-black text-sm">MD</span>
              </div>
              <div>
                <span className="text-white font-bold text-lg tracking-wider">
                  METAL<span className="text-gold-DEFAULT">DEPO</span>
                </span>
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Your trusted partner for premium industrial metals. Quality products, competitive
              pricing, and global delivery to 50+ countries.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-none bg-white/5 text-white/60 hover:bg-gold-DEFAULT hover:text-navy-900 transition-colors"
              >
                <Linkedin size={15} />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-none bg-white/5 text-white/60 hover:bg-gold-DEFAULT hover:text-navy-900 transition-colors"
              >
                <Twitter size={15} />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-5">
              Products
            </h4>
            <ul className="space-y-3">
              {productCategories.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/50 text-sm hover:text-gold-DEFAULT transition-colors flex items-center gap-2 group"
                  >
                    <span className="h-px w-3 bg-gold-DEFAULT/30 group-hover:w-5 transition-all" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/50 text-sm hover:text-gold-DEFAULT transition-colors flex items-center gap-2 group"
                  >
                    <span className="h-px w-3 bg-gold-DEFAULT/30 group-hover:w-5 transition-all" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-gold-DEFAULT mt-0.5 shrink-0" />
                <span className="text-white/50 text-sm">
                  123 Industrial Boulevard
                  <br />
                  Istanbul, Turkey 34000
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-gold-DEFAULT shrink-0" />
                <a
                  href="tel:+905001234567"
                  className="text-white/50 text-sm hover:text-gold-DEFAULT transition-colors"
                >
                  +90 500 123 45 67
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-gold-DEFAULT shrink-0" />
                <a
                  href="mailto:info@metaldepo.com"
                  className="text-white/50 text-sm hover:text-gold-DEFAULT transition-colors"
                >
                  info@metaldepo.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/5">
        <div className="container-wide py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} MetalDepo. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="#" className="text-white/30 text-xs hover:text-white/60 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-white/30 text-xs hover:text-white/60 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
