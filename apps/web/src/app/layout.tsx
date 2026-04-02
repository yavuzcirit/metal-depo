import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: {
    default: 'MetalDepo — Premium Metal Products & Solutions',
    template: '%s | MetalDepo',
  },
  description:
    'Global supplier of premium metal products. Quality steel, aluminum, and specialty metals delivered worldwide. Trusted by manufacturers and traders in 50+ countries.',
  keywords: ['metal products', 'steel supplier', 'aluminum', 'metal trading', 'industrial metals'],
  openGraph: {
    type: 'website',
    siteName: 'MetalDepo',
    images: [{ url: '/og-image.jpg' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-steel-50 text-steel-900 antialiased">
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
