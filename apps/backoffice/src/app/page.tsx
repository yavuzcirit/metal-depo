import { api } from '@/lib/api'
import { Package, Tag, Image, MessageSquare, TrendingUp, Eye } from 'lucide-react'
import Link from 'next/link'

async function getDashboardStats() {
  try {
    const [products, categories, banners, contact] = await Promise.allSettled([
      api.getProducts('limit=1') as Promise<{ total: number }>,
      api.getCategories() as Promise<unknown[]>,
      api.getBanners() as Promise<unknown[]>,
      api.getContactStats() as Promise<{ total: number; unread: number }>,
    ])

    return {
      products: products.status === 'fulfilled' ? (products.value as any).total : 0,
      categories: categories.status === 'fulfilled' ? (categories.value as any[]).length : 0,
      banners: banners.status === 'fulfilled' ? (banners.value as any[]).length : 0,
      messages: contact.status === 'fulfilled' ? contact.value.total : 0,
      unread: contact.status === 'fulfilled' ? contact.value.unread : 0,
    }
  } catch {
    return { products: 0, categories: 0, banners: 0, messages: 0, unread: 0 }
  }
}

export default async function DashboardPage() {
  const stats = await getDashboardStats()

  const cards = [
    { label: 'Total Products', value: stats.products, icon: Package, href: '/products', color: 'bg-blue-50 text-blue-600' },
    { label: 'Categories', value: stats.categories, icon: Tag, href: '/categories', color: 'bg-purple-50 text-purple-600' },
    { label: 'Banners', value: stats.banners, icon: Image, href: '/banners', color: 'bg-amber-50 text-amber-600' },
    { label: 'Messages', value: stats.messages, icon: MessageSquare, href: '/messages', color: 'bg-green-50 text-green-600', badge: stats.unread > 0 ? stats.unread : undefined },
  ]

  const quickLinks = [
    { label: 'Add Product', href: '/products/new', icon: Package },
    { label: 'Add Category', href: '/categories/new', icon: Tag },
    { label: 'Add Banner', href: '/banners/new', icon: Image },
    { label: 'View Messages', href: '/messages', icon: MessageSquare },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Welcome back</h2>
        <p className="text-gray-400 text-sm mt-1">Here&apos;s an overview of your store</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, icon: Icon, href, color, badge }) => (
          <Link key={label} href={href} className="card p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
                <Icon size={18} />
              </div>
              {badge && (
                <span className="badge badge-red">{badge} new</span>
              )}
            </div>
            <p className="text-3xl font-black text-gray-800">{value}</p>
            <p className="text-sm text-gray-400 mt-1">{label}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="card p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {quickLinks.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 hover:border-navy hover:bg-navy-50 hover:text-navy transition-all"
            >
              <Icon size={15} className="text-gray-400" />
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="card p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <TrendingUp size={15} className="text-green-500" />
            Portfolio Overview
          </h3>
          <ul className="space-y-2">
            <li className="flex justify-between text-sm">
              <span className="text-gray-500">Active Products</span>
              <span className="font-medium text-gray-800">{stats.products}</span>
            </li>
            <li className="flex justify-between text-sm">
              <span className="text-gray-500">Product Categories</span>
              <span className="font-medium text-gray-800">{stats.categories}</span>
            </li>
            <li className="flex justify-between text-sm">
              <span className="text-gray-500">Active Banners</span>
              <span className="font-medium text-gray-800">{stats.banners}</span>
            </li>
          </ul>
        </div>
        <div className="card p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Eye size={15} className="text-blue-500" />
            Inbox
          </h3>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-3xl font-black text-gray-800">{stats.unread}</p>
              <p className="text-xs text-gray-400">Unread messages</p>
            </div>
            <div className="h-12 w-px bg-gray-100" />
            <div>
              <p className="text-3xl font-black text-gray-800">{stats.messages}</p>
              <p className="text-xs text-gray-400">Total inquiries</p>
            </div>
          </div>
          {stats.unread > 0 && (
            <Link href="/messages" className="btn-primary mt-4 text-xs w-full justify-center">
              View Unread Messages
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
