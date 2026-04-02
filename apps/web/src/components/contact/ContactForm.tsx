'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { submitContact } from '@/lib/api'
import { CheckCircle2, Loader2 } from 'lucide-react'

const schema = z.object({
  name: z.string().min(1, 'Full name is required'),
  email: z.string().email('Please enter a valid email'),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormData = z.infer<typeof schema>

export function ContactForm() {
  const [sent, setSent] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    await submitContact(data)
    setSent(true)
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center bg-green-50 mb-4">
          <CheckCircle2 size={32} className="text-green-500" />
        </div>
        <h3 className="text-navy-900 font-bold text-lg mb-2">Message Sent!</h3>
        <p className="text-steel-500 text-sm max-w-sm">
          Thank you for your inquiry. Our team will review your message and respond within 24
          business hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="label-base">Full Name *</label>
          <input {...register('name')} className="input-base" placeholder="John Smith" />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <label className="label-base">Email Address *</label>
          <input {...register('email')} type="email" className="input-base" placeholder="john@company.com" />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <label className="label-base">Company</label>
          <input {...register('company')} className="input-base" placeholder="Your Company Ltd." />
        </div>
        <div>
          <label className="label-base">Phone</label>
          <input {...register('phone')} type="tel" className="input-base" placeholder="+1 234 567 8900" />
        </div>
      </div>

      <div>
        <label className="label-base">Message *</label>
        <textarea
          {...register('message')}
          rows={5}
          className="input-base resize-none"
          placeholder="Please describe the products you need, quantities, and any specific requirements..."
        />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  )
}
