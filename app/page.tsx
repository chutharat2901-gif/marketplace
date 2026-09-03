'use client'

import { useState } from 'react'
import Product3DCard, { Product } from '@/components/Product3DCard'
import {
  Cake,
  ShoppingBag,
  Search,
  X,
  CheckCircle2,
  Sparkles,
  Phone,
  Calendar,
  Heart,
  ChevronRight,
} from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'

const CATEGORIES = ['ทั้งหมด', 'สตรอว์เบอร์รี', 'ช็อกโกแลต', 'มินิมอลเกาหลี', 'พรีเมียมผลไม้', 'ชีสเค้ก']

const CAKE_PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'Strawberry Shortcake ความรักหวานฉ่ำ',
    price: 590,
    category: 'สตรอว์เบอร์รี',
    tag: 'ขายดีอันดับ 1',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
    description: 'เนื้อสปันจ์เค้กนุ่มละมุน สลับชั้นครีมสดแท้จากฮอกไกโด และสตรอว์เบอร์รีสดลูกโตอิมพอร์ต',
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
    description: 'ชีสเค้กหน้าไหม้เนื้อเนียนนุ่ม หอมกลิ่นครีมชีสกลมกล่อม ละลายในปาก',
    flavors: ['ออริจินัลชีส', 'มัทฉะอุจิ'],
  },
  {
    id: 5,
    title: 'Fresh Mango & Passion Fruit Layer Cake',
    price: 620,
    category: 'พรีเมียมผลไม้',
    tag: 'เมนูฤดูกาล',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=800&q=80',
    description: 'เค้กมะม่วงน้ำดอกไม้สดผสมเสาวรส รสชาติเปรี้ยวหวานกลมกล่อม สดชื่นทุกคำ',
    flavors: ['วานิลลามะม่วง', 'เสาวรสครีมสด'],
  },
  {
    id: 6,
    title: 'Matcha Uji Red Bean Crepe Cake',
    price: 580,
    category: 'พรีเมียมผลไม้',
    tag: 'ชาเขียวเกรดพิธีการ',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    description: 'เครปเค้กชาเขียวมัทฉะเรียงชั้นละมุนแทรกซอสถั่วแดงกวนสไตล์เกียวโต',
    flavors: ['มัทฉะเข้มข้น', 'มัทฉะนมสด'],
  },
]

interface CartItem {
  product: Product
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
  const [selectedProductView, setSelectedProductView] = useState<Product | null>(null)
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
    <div className="min-h-screen bg-rose-50/30 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 font-sans">
      {/* Navbar Full Width */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-pink-100 dark:border-pink-900/30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-pink-500 to-rose-400 rounded-2xl text-white shadow-lg shadow-pink-500/30">
              <Cake className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <h1 className="font-black text-xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
                Sweet Bakery Lounge
              </h1>
              <p className="text-[10px] text-zinc-400 font-semibold hidden sm:block">
                ร้านเค้กโฮมเมดพรีเมียม สั่งจองล่วงหน้า
              </p>
            </div>
          </div>

          {/* Search Bar Center */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-3 text-pink-400" size={18} />
              <input
                type="text"
                placeholder="ค้นหาเค้กวันเกิด, สตรอว์เบอร์รี, ชีสเค้ก..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200/60 dark:border-pink-900/40 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative px-4 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-sm shadow-lg shadow-pink-500/25 flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline">ตะกร้าสั่งจอง</span>
              {cart.length > 0 && (
                <span className="bg-white text-pink-600 text-xs w-5 h-5 rounded-full flex items-center justify-center font-black">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3.5 top-3 text-pink-400" size={16} />
            <input
              type="text"
              placeholder="ค้นหาเค้กวันเกิด, สตรอว์เบอร์รี..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-pink-50/50 dark:bg-zinc-800/60 border border-pink-200/60 dark:border-pink-900/40 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Banner Section */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 text-white shadow-2xl shadow-pink-500/20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 z-10 max-w-xl">
            <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider backdrop-blur-md inline-flex items-center gap-1.5">
              <Sparkles size={14} /> สั่งจองเค้กออนไลน์ล่วงหน้า 1-2 วัน
            </span>
            <h2 className="text-3xl sm:text-4xl font-black leading-tight">
              เติมความหวานให้วันพิเศษ ด้วยเค้กโฮมเมดสุดพรีเมียม
            </h2>
            <p className="text-sm text-pink-100">
              อบใหม่ทุกวันด้วยวัตถุดิบนำเข้าชั้นดี เลือกขนาด รสชาติ พร้อมพิมพ์ข้อความหน้าเค้กฟรี!
            </p>
          </div>
          <div className="z-10 bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/20 text-center space-y-2 min-w-[200px]">
            <p className="text-xs font-bold uppercase text-pink-100">บริการจัดส่ง</p>
            <p className="text-lg font-black">รับหน้าร้าน / Delivery</p>
            <span className="text-[10px] bg-white text-pink-600 font-bold px-2.5 py-0.5 rounded-full inline-block">
              เปิดรับออเดอร์ทุกวัน
            </span>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-2xl whitespace-nowrap text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/25 scale-105'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-pink-100 dark:border-zinc-800 hover:border-pink-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3D Product Grid Layout (Responsive 1, 2, 3 columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((cake) => (
            <Product3DCard
              key={cake.id}
              product={cake}
              isSaved={savedIds.includes(cake.id)}
              onToggleSave={toggleSave}
              onAddToCart={handleAddToCart}
              onQuickView={(p) => setSelectedProductView(p)}
            />
          ))}
        </div>
      </main>

      {/* Quick View Modal */}
      {selectedProductView && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-xl rounded-3xl p-6 space-y-6 relative border border-pink-100 dark:border-zinc-800 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedProductView(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-800"
            >
              <X size={20} />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="h-64 rounded-2xl overflow-hidden bg-pink-50">
                <img
                  src={selectedProductView.imageUrl}
                  alt={selectedProductView.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-3">
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-pink-100 text-pink-600">
                  {selectedProductView.category}
                </span>
                <h3 className="text-xl font-black">{selectedProductView.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{selectedProductView.description}</p>
                <div className="pt-2">
                  <span className="text-xs text-zinc-400 block font-semibold">ราคาเริ่มต้น</span>
                  <span className="text-2xl font-black text-rose-600">฿{selectedProductView.price}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Drawer Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-6 space-y-5 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center border-b border-pink-100 dark:border-zinc-800 pb-3">
              <h3 className="font-black text-lg flex items-center gap-2">
                <ShoppingBag className="text-pink-500" /> ตะกร้าสั่งจองเค้ก ({cart.length})
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
                <h4 className="text-xl font-black">สั่งจองเค้กเรียบร้อยแล้ว!</h4>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                  ขอบคุณคุณ <span className="font-bold text-pink-600">{customerName}</span> ทางร้านได้รับการสั่งจองเค้กเรียบร้อยแล้ว จะติดต่อกลับเบอร์ {customerPhone} เพื่อยืนยันเวลานัดรับเค้กครับ
                </p>
                <button
                  onClick={() => {
                    setCart([])
                    setIsBookingSuccess(false)
                    setIsCartOpen(false)
                  }}
                  className="w-full py-3.5 bg-pink-500 text-white rounded-2xl font-bold text-xs shadow-lg shadow-pink-500/30"
                >
                  กลับสู่หน้าร้านค้า
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-12 text-center text-zinc-400 space-y-2">
                <Cake size={48} className="mx-auto opacity-30" />
                <p className="text-xs font-semibold">ยังไม่มีรายการสั่งจองเค้กในตะกร้า</p>
              </div>
            ) : (
              <form onSubmit={handleCheckout} className="space-y-4">
                <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
                  {cart.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-pink-50/50 dark:bg-zinc-800/50 rounded-2xl flex justify-between items-center text-xs border border-pink-100 dark:border-zinc-800"
                    >
                      <div className="space-y-0.5">
                        <p className="font-bold text-zinc-800 dark:text-zinc-100">{item.product.title}</p>
                        <p className="text-zinc-500 text-[11px]">
                          ขนาด: <span className="font-semibold">{item.size}</span> | รสชาติ: <span className="font-semibold">{item.flavor}</span>
                        </p>
                        {item.customText && (
                          <p className="text-pink-600 font-semibold text-[11px]">
                            ข้อความหน้าเค้ก: "{item.customText}"
                          </p>
                        )}
                      </div>
                      <span className="font-black text-rose-600 text-sm">฿{item.totalPrice.toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                {/* Booking Form Inputs */}
                <div className="space-y-3 pt-3 border-t border-pink-100 dark:border-zinc-800">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    ข้อมูลผู้สั่งจอง & นัดรับเค้ก
                  </h4>
                  <input
                    type="text"
                    required
                    placeholder="ชื่อผู้สั่งจอง..."
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="tel"
                      required
                      placeholder="เบอร์โทรศัพท์..."
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                    <input
                      type="date"
                      required
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 font-black text-base">
                  <span>ราคารวมทั้งหมด:</span>
                  <span className="text-rose-600 text-2xl">฿{grandTotal.toLocaleString()}</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl font-bold text-xs shadow-xl shadow-pink-500/30 hover:opacity-95 transition-opacity"
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