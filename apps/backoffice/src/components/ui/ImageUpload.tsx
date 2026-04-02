'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, X, Loader2 } from 'lucide-react'
import { api } from '@/lib/api'
import { getImageUrl } from '@/lib/utils'

interface ImageUploadProps {
  value?: string | null
  onChange: (url: string) => void
  onClear?: () => void
}

export function ImageUpload({ value, onChange, onClear }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    setError('')
    setUploading(true)
    try {
      const { url } = await api.uploadImage(file)
      onChange(url)
    } catch {
      setError('Upload failed. Try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      {value ? (
        <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={getImageUrl(value)}
            alt="Uploaded"
            fill
            className="object-contain"
          />
          <button
            type="button"
            onClick={() => { onClear?.(); onChange('') }}
            className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            <X size={13} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex w-full flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 py-10 transition-colors hover:border-navy-DEFAULT hover:bg-blue-50/30 disabled:opacity-60"
        >
          {uploading ? (
            <Loader2 size={24} className="animate-spin text-gray-400" />
          ) : (
            <Upload size={24} className="text-gray-400" />
          )}
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600">
              {uploading ? 'Uploading...' : 'Click to upload image'}
            </p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 5MB</p>
          </div>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
          e.target.value = ''
        }}
      />
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  )
}
