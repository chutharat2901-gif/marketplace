'use client'

import { useState, useRef, MouseEvent } from 'react'
import { Heart, ShoppingBag, Star, Sparkles, Eye } from 'lucide-react'

export interface Product {
  id: number
  title: string
  price: number
  category: string
  tag: string
  rating: number
  imageUrl: string
  description: string
  flavors: string[]
}

export type CakeProduct = Product

interface Product3DCardProps {
  product: Product
  isSaved: boolean
  onToggleSave: (id: number, e?: MouseEvent) => void
  onAddToCart: (item: {
    product: Product
    size: string
    flavor: string
    customText: string
    totalPrice: number
  }) => void
  onQuickView: (product: Product) => void
}

export default function Product3DCard({
  product,
  isSaved,
  onToggleSave,
  onAddToCart,
  onQuickView,
}: Product3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [selectedSize, setSelectedSize] = useState<'1 ปอนด์' | '2 ปอนด์' | '3 ปอนด์'>('1 ปอนด์')
  const [selectedFlavor, setSelectedFlavor] = useState(product.flavors[0] || 'คลาสสิก')
  const [customText, setCustomText] = useState('')

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setRotate({ x: -y / 12, y: x / 12 })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotate({ x: 0, y: 0 })
  }

  const sizePriceAdd = selectedSize === '2 ปอนด์' ? 300 : selectedSize === '3 ปอนด์' ? 600 : 0
  const totalPrice = product.price + sizePriceAdd

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1200px' }}
      className="w-full h-full transition-all duration-200 ease-out"
    >
      <div
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateZ(${isHovered ? '20px' : '0px'})`,
          transformStyle: 'preserve-3d',
          transition: isHovered ? 'none' : 'transform 0.5s ease',
        }}
        className="relative h-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl rounded-3xl border border-pink-100 dark:border-pink-900/30 p-5 shadow-lg hover:shadow-2xl hover:shadow-pink-500/20 transition-shadow duration-300 flex flex-col justify-between group"
      >
        {/* Header Tag */}
        <div className="flex justify-between items-center mb-3" style={{ transform: 'translateZ(30px)' }}>
          <span className="px-3 py-1 text-[11px] font-extrabold rounded-full bg-pink-100 dark:bg-pink-950 text-pink-600 dark:text-pink-300 flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> {product.tag}
          </span>
          <button
            onClick={(e) => onToggleSave(product.id, e)}
            className="p-2 rounded-full hover:bg-pink-50 dark:hover:bg-zinc-800 text-pink-500 transition-colors"
          >
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-pink-500 text-pink-500' : ''}`} />
          </button>
        </div>

        {/* 3D Dynamic Image Container */}
        <div 
          className="relative h-60 w-full rounded-2xl overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center mb-4 cursor-pointer"
          onClick={() => onQuickView(product)}
          style={{ transform: 'translateZ(40px)' }}
        >
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="px-4 py-2 bg-white/90 dark:bg-zinc-900/90 rounded-full text-xs font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-1.5 shadow-lg backdrop-blur-md">
              <Eye size={14} /> ดูรายละเอียดเพิ่มเติม
            </span>
          </div>

          {customText && (
            <div 
              style={{ transform: 'translateZ(50px)' }}
              className="absolute bottom-3 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-pink-600 dark:text-pink-300 max-w-[85%] truncate shadow-xl border border-pink-200 dark:border-pink-800 animate-bounce"
            >
              🎂 "{customText}"
            </div>
          )}

          <div className="absolute top-2 right-2 bg-amber-400/90 backdrop-blur-md px-2.5 py-1 rounded-xl text-xs font-black text-zinc-900 flex items-center gap-1 shadow-md">
            <Star className="w-3.5 h-3.5 fill-zinc-900" /> {product.rating}
          </div>
        </div>

        {/* Form Controls & Options */}
        <div className="space-y-3" style={{ transform: 'translateZ(25px)' }}>
          <div>
            <h3 
              onClick={() => onQuickView(product)}
              className="font-black text-lg text-zinc-800 dark:text-zinc-100 line-clamp-1 cursor-pointer hover:text-pink-500 transition-colors"
            >
              {product.title}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-0.5">
              {product.description}
            </p>
          </div>

          {/* เลือกขนาด */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">ขนาดเค้ก</span>
            <div className="flex gap-1.5">
              {(['1 ปอนด์', '2 ปอนด์', '3 ปอนด์'] as const).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                    selectedSize === size
                      ? 'border-pink-500 bg-pink-500 text-white shadow-md shadow-pink-500/30 font-bold'
                      : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-pink-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* เลือกรสชาติ */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">รสชาติแป้ง/ครีม</span>
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {product.flavors.map((flavor) => (
                <button
                  key={flavor}
                  type="button"
                  onClick={() => setSelectedFlavor(flavor)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-lg border whitespace-nowrap transition-all ${
                    selectedFlavor === flavor
                      ? 'border-rose-400 bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 font-bold'
                      : 'border-zinc-200 dark:border-zinc-800 text-zinc-500'
                  }`}
                >
                  {flavor}
                </button>
              ))}
            </div>
          </div>

          {/* พิมพ์ข้อความบนหน้าเค้ก */}
          <input
            type="text"
            maxLength={25}
            placeholder="✍️ พิมพ์ข้อความแต่งหน้าเค้ก (ฟรี)..."
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            className="w-full px-3.5 py-2 text-xs rounded-xl bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-100 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-pink-400 text-zinc-800 dark:text-zinc-200 placeholder-zinc-400"
          />

          {/* Price & Submit Button */}
          <div className="pt-3 flex items-center justify-between border-t border-pink-100 dark:border-zinc-800/80">
            <div>
              <span className="text-[10px] text-zinc-400 font-semibold block">ราคารวม</span>
              <p className="text-xl font-black text-rose-600 dark:text-pink-400">
                ฿{totalPrice.toLocaleString()}
              </p>
            </div>
            <button
              onClick={() =>
                onAddToCart({
                  product,
                  size: selectedSize,
                  flavor: selectedFlavor,
                  customText,
                  totalPrice,
                })
              }
              className="px-4 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-2xl font-bold text-xs shadow-lg shadow-pink-500/30 flex items-center gap-2 active:scale-95 transition-all"
            >
              <ShoppingBag className="w-4 h-4" /> สั่งจองเค้ก
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}