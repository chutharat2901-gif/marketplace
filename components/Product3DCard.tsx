'use client'

import { useState, useRef, MouseEvent } from 'react'
import { Heart, ShoppingBag, Star, Cake, Sparkles } from 'lucide-react'

export interface Product {
  id: number
  title: string
  seller?: string
  sellerContact?: string
  condition?: string
  price: string
  category?: string
  tag?: string
  rating?: number
  image?: string
  imageUrl?: string // เพิ่มรองรับ imageUrl
  description?: string
  location?: string // เพิ่มรองรับ location
  flavorOptions?: string[]
}

interface Product3DCardProps {
  product: Product
  isSaved: boolean
  onToggleSave: (id: number, e?: MouseEvent) => void
  onSelect: (product: Product) => void
}

export default function Product3DCard({
  product,
  isSaved,
  onToggleSave,
  onSelect,
}: Product3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [selectedSize, setSelectedSize] = useState<'1ปอนด์' | '2ปอนด์'>('1ปอนด์')
  const [customText, setCustomText] = useState('')

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setRotate({ x: -y / 12, y: x / 12 })
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotate({ x: 0, y: 0 })
  }

  const basePrice = parseInt(product.price.replace(/[^0-9]/g, '')) || 0
  const finalPrice = selectedSize === '2ปอนด์' ? basePrice + 350 : basePrice
  const displayImage = product.imageUrl || product.image

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
      className="w-full transition-all duration-200 ease-out"
    >
      <div
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
          transition: isHovered ? 'none' : 'transform 0.5s ease',
        }}
        className="relative bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-3xl border border-pink-100 dark:border-pink-900/30 p-5 shadow-xl hover:shadow-2xl hover:shadow-pink-500/10 transition-shadow duration-300 flex flex-col justify-between"
      >
        {/* Badge ด้านบน */}
        <div className="flex justify-between items-center mb-3">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-pink-100 dark:bg-pink-950 text-pink-600 dark:text-pink-300 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> {product.tag || 'สินค้าคุณภาพ'}
          </span>
          <button
            onClick={(e) => onToggleSave(product.id, e)}
            className="p-2 rounded-full hover:bg-pink-50 dark:hover:bg-zinc-800 text-pink-500 transition-colors"
          >
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-pink-500 text-pink-500' : ''}`} />
          </button>
        </div>

        {/* รูปภาพ */}
        <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-gradient-to-br from-pink-50 to-orange-50 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center group mb-4">
          <div 
            style={{ transform: `translateZ(${isHovered ? '40px' : '0px'})` }}
            className="transition-transform duration-300 ease-out flex flex-col items-center w-full h-full"
          >
            {displayImage ? (
              <img src={displayImage} alt={product.title} className="w-full h-full object-cover" />
            ) : (
              <Cake className="w-24 h-24 text-pink-400 group-hover:scale-110 transition-transform duration-300 my-auto" />
            )}
            {customText && (
              <div className="absolute bottom-3 bg-white/80 dark:bg-black/70 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-medium text-pink-600 dark:text-pink-300 max-w-[80%] truncate shadow-sm">
                ✍️ "{customText}"
              </div>
            )}
          </div>
          
          <div className="absolute top-2 right-2 bg-yellow-400/90 backdrop-blur-xs px-2.5 py-1 rounded-lg text-xs font-bold text-zinc-900 flex items-center gap-1">
            <Star className="w-3 h-3 fill-zinc-900" /> {product.rating || 4.9}
          </div>
        </div>

        {/* รายละเอียด */}
        <div className="space-y-3">
          <div>
            <h3 className="font-bold text-lg text-zinc-800 dark:text-zinc-100 line-clamp-1">{product.title}</h3>
            {product.seller && (
              <p className="text-xs text-zinc-500 dark:text-zinc-400">ผู้ขาย: {product.seller}</p>
            )}
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800">
            <div>
              <span className="text-xs text-zinc-400">ราคา</span>
              <p className="text-xl font-black text-pink-600 dark:text-pink-400">{product.price}</p>
            </div>
            <button
              onClick={() => onSelect(product)}
              className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-2xl font-medium text-xs shadow-lg shadow-pink-500/25 flex items-center gap-1.5 active:scale-95 transition-all"
            >
              <ShoppingBag className="w-3.5 h-3.5" /> รายละเอียด
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}