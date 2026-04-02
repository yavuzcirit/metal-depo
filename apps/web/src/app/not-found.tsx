import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-steel-50 text-center px-4">
      <div className="text-[120px] font-black text-steel-100 leading-none">404</div>
      <h1 className="text-3xl font-black text-navy-900 mt-4 mb-3">Page Not Found</h1>
      <p className="text-steel-500 text-base mb-8 max-w-sm">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/" className="btn-primary">
        <ArrowLeft size={16} />
        Back to Home
      </Link>
    </div>
  )
}
