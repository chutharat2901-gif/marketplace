'use client'

import { useState } from 'react'
import Product3DCard, { CakeProduct } from '@/components/Product3DCard'
import {
  Cake,
  ShoppingBag,
  Heart,
  Search,
  Sparkles,
  Calendar,
  X,
  CheckCircle2,
  Phone,
  Clock,
} from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'

const CATEGORIES = ['ทั้งหมด', 'สตรอว์เบอร์รี', 'ช็อกโกแลต', 'มินิมอลเกาหลี', 'พรีเมียมผลไม้', 'ชีสเค้ก']

const CAKE_PRODUCTS: CakeProduct[] = [
  {
    id: 1,
    title: 'Strawberry Shortcake ความรักหวานฉ่ำ',
    price: 590,
    category: 'สตรอว์เบอร์รี',
    tag: 'ขายดีอันดับ 1',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
    description: 'เนื้อสปันจ์เค้กนุ่มละมุน สลับชั้นครีมสดแท้จากฮอกไกโด และสตรอว์เบอร์รีสดลูกโต',
    flavors: ['นมฮอกไกโด', 'วานิลลาฝรั่งเศส'],
  },
  {
    id: 2,
    title: 'Dark Chocolate Truffle ช็อกโกแลตเข้มข้น',
    price: 650,
    category: 'ช็อกโกแลต',
    tag: 'ช็อกโกแลตแท้ 70%',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    description: 'เค้กช็อกโกแลตฟัจด์เข้มข้น แต่งหน้าด้วยช็อกโกแลตทราฟเฟิลทำมือ อร่อยเข้มลงตัว',
    flavors: ['ดาร์กช็อกโกแลต', 'มินต์ช็อกโกแลต'],
  },
  {
    id: 3,
    title: 'Korean Minimal Pastel Cake',
    price: 490,
    category: 'มินิมอลเกาหลี',
    tag: 'ฮิตใน IG',
    rating: 5.0,
    imageUrl: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80',
    description: 'เค้กแต่งสไตล์มินิมอลเกาหลี เลือกเขียนข้อความบอกความรู้สึกสุดพิเศษได้ตามใจชอบ',
    flavors: ['วานิลลาบัตเตอร์', 'ชาไทยพรีเมียม', 'เอิร์ลเกรย์'],
  },
  {
    id: 4,
    title: 'Basque Burnt Cheesecake หน้าไหม้สูตรดั้งเดิม',
    price: 520,
    category: 'ชีสเค้ก',
    tag: 'สูตรสเปนแท้',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
    description: 'ชีสเค้กหน้าไหม้เนื้อเนียนนุ่ม หอมกลิ่นกลมกล่อม ละลายในปาก',
    flavors: ['ออริจินัลชีส', 'มัทฉะอุจิ'],
  },
]

interface CartItem {
  product: CakeProduct
  size: string
  flavor: string
  customText: string
  totalPrice: number
}

export default function SweetBakeryPage() {
  const [activeCategory, setActiveCategory] = useState('ทั้งหมด')
  const [searchQuery, setSearchQuery] = useState('')
  const [savedIds, setSavedIds] = useState<number[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isBookingSuccess, setIsBookingSuccess] = useState(false)

  // Booking Form State
  const [pickupDate, setPickupDate] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')

  const toggleSave = (id: number) => {
    setSavedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const handleAddToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item])
    setIsCartOpen(true)
  }

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault()
    if (cart.length === 0) return
    setIsBookingSuccess(true)
  }

  const filteredProducts = CAKE_PRODUCTS.filter((p) => {
    const matchesCat = activeCategory === 'ทั้งหมด' || p.category === activeCategory
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  const grandTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0)

  return (
    <div className="min-h-screen pb-24 max-w-xl mx-auto bg-rose-50/30 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 font-sans border-x border-rose-100 dark:border-rose-950">
      {/* Top Banner Header */}
      <header className="sticky top-0 z-20 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-pink-100 dark:border-pink-900/30 p-5 space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Cake className="w-6 h-6 text-pink-500 animate-bounce" />
            <span className="font-black text-lg bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent">
              Sweet Bakery Lounge
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-2xl bg-pink-50 dark:bg-pink-950/50 text-pink-600 dark:text-pink-300"
            >
              <ShoppingBag className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3 text-pink-400" size={16} />
          <input
            type="text"
            placeholder="ค้นหาเค้กวันเกิด, สตรอว์เบอร์รี, ชีสเค้ก..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-pink-50/40 dark:bg-zinc-800/50 border border-pink-200/60 dark:border-pink-900/40 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
      </header>

      <main className="p-5 space-y-6">
        {/* Banner Promotion */}
        <div className="p-5 rounded-3xl bg-gradient-to-r from-pink-400 via-rose-400 to-amber-300 text-white shadow-xl shadow-pink-500/15 relative overflow-hidden">
          <div className="space-y-1 z-10 relative">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-extrabold uppercase backdrop-blur-md">
              ✨ สั่งจองเค้กล่วงหน้า 1-2 วัน
            </span>
            <h2 className="text-xl font-black">เค้กโฮมเมด ทำสดใหม่ทุกวัน</h2>
            <p className="text-xs text-pink-50">ฟรี! แต่งหน้าเค้กพิมพ์ข้อความสุดพิเศษ</p>
          </div>
        </div>

        {/* Category List */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-2xl whitespace-nowrap text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-pink-500 text-white shadow-md shadow-pink-500/20'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-pink-100 dark:border-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3D Product Cards List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredProducts.map((cake) => (
            <Product3DCard
              key={cake.id}
              product={cake}
              isSaved={savedIds.includes(cake.id)}
              onToggleSave={toggleSave}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </main>

      {/* Cart & Booking Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 space-y-5 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center border-b border-pink-100 dark:border-zinc-800 pb-3">
              <h3 className="font-black text-lg flex items-center gap-2">
                <ShoppingBag className="text-pink-500" /> รายการสั่งจองเค้ก ({cart.length})
              </h3>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 hover:text-zinc-700"
              >
                <X size={18} />
              </button>
            </div>

            {isBookingSuccess ? (
              <div className="py-10 text-center space-y-4">
                <CheckCircle2 size={64} className="mx-auto text-emerald-500 animate-bounce" />
                <h4 className="text-xl font-black">สั่งจองเค้กสำเร็จแล้ว!</h4>
                <p className="text-xs text-zinc-500">
                  ขอบคุณคุณ <span className="font-bold text-pink-600">{customerName}</span> ทางร้านได้รับรายการสั่งจองเรียบร้อยแล้ว จะติดต่อกลับทางเบอร์ {customerPhone} เพื่อยืนยันคิวรับเค้กครับ
                </p>
                <button
                  onClick={() => {
                    setCart([])
                    setIsBookingSuccess(false)
                    setIsCartOpen(false)
                  }}
                  className="w-full py-3 bg-pink-500 text-white rounded-2xl font-bold text-xs"
                >
                  กลับสู่หน้าร้านค้า
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-12 text-center text-zinc-400 space-y-2">
                <Cake size={40} className="mx-auto opacity-40" />
                <p className="text-xs">ยังไม่มีรายการเค้กในตะกร้า</p>
              </div>
            ) : (
              <form onSubmit={handleCheckout} className="space-y-4">
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {cart.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-pink-50/50 dark:bg-zinc-800/50 rounded-2xl flex justify-between items-center text-xs"
                    >
                      <div>
                        <p className="font-bold text-zinc-800 dark:text-zinc-100">{item.product.title}</p>
                        <p className="text-zinc-500 text-[10px]">
                          ขนาด: {item.size} | รส: {item.flavor}
                        </p>
                        {item.customText && (
                          <p className="text-pink-600 font-semibold text-[10px]">
                            ข้อความ: "{item.customText}"
                          </p>
                        )}
                      </div>
                      <span className="font-black text-rose-600">฿{item.totalPrice.toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                {/* Form Details */}
                <div className="space-y-3 pt-3 border-t border-pink-100 dark:border-zinc-800">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    ข้อมูลผู้สั่งจอง & วันรับเค้ก
                  </h4>
                  <input
                    type="text"
                    required
                    placeholder="ชื่อผู้สั่งจอง..."
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="tel"
                      required
                      placeholder="เบอร์โทรศัพท์..."
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                    <input
                      type="date"
                      required
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 font-black text-base">
                  <span>ราคารวมทั้งหมด:</span>
                  <span className="text-rose-600 text-xl">฿{grandTotal.toLocaleString()}</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl font-bold text-xs shadow-lg shadow-pink-500/30"
                >
                  ยืนยันการสั่งจองเค้ก
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}