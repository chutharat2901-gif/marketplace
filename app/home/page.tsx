'use client'

import { useState, useCallback } from 'react'
import Product3DCard, { Product } from '@/components/Product3DCard'
import {
  Search,
  Cake,
  Calendar,
  Clock,
  Sparkles,
  ShoppingBag,
  Heart,
  CheckCircle2,
  Phone,
  X,
  User,
  MapPin
} from 'lucide-react'

// ข้อมูลเมนูเค้กในร้าน
const INITIAL_CAKES: Product[] = [
  {
    id: 1,
    title: 'Strawberry Shortcake Signature',
    seller: 'Chef Jean',
    sellerContact: '081-234-5678',
    condition: 'ทำสดใหม่วันต่อวัน',
    price: '฿590',
    category: 'เค้กผลไม้',
    tag: 'ขายดีอันดับ 1',
    rating: 4.9,
    description: 'สตอเบอรี่สดจากเชียงใหม่ นุ่มละมุนลิ้น ครีมสดแท้จากฝรั่งเศส'
  },
  {
    id: 2,
    title: 'Dark Chocolate Fudge Velvet',
    seller: 'Chef Marco',
    sellerContact: '082-345-6789',
    condition: 'ช็อกโกแลตนำเข้า 70%',
    price: '฿650',
    category: 'ช็อกโกแลต',
    tag: 'เข้มข้น พรีเมียม',
    rating: 5.0,
    description: 'ช็อกโกแลตแท้พรีเมียม เข้มข้น หอมนุ่ม รสชาติกลมกล่อม'
  },
  {
    id: 3,
    title: 'Matcha Minimalist Birthday',
    seller: 'Chef Yuki',
    sellerContact: '083-456-7890',
    condition: 'มัจฉะแท้จากอุจิ',
    price: '฿520',
    category: 'สไตล์เกาหลี',
    tag: 'สายมินิมอล',
    rating: 4.8,
    description: 'เค้กชาเขียวมัจฉะสไตล์มินิมอล หอมชาเขียวแท้ๆ ไม่หวานจัด'
  },
  {
    id: 4,
    title: 'Basque Burnt Cheesecake',
    seller: 'Chef Jean',
    sellerContact: '081-234-5678',
    condition: 'ครีมชีสแท้ออสเตรเลีย',
    price: '฿480',
    category: 'ชีสเค้ก',
    tag: 'หอมไหม้ละมุน',
    rating: 4.9,
    description: 'ชีสเค้กหน้าไหม้สูตรดั้งเดิม ด้านในเนื้อเยิ้มละลายในปาก'
  }
]

export default function CakeStudioPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด')
  const [savedItems, setSavedItems] = useState<number[]>([])
  const [cart, setCart] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)

  // ฟอร์มจองโต๊ะ
  const [booking, setBooking] = useState({ name: '', date: '', time: '', guests: '2 ท่าน', phone: '' })
  const [isBooked, setIsBooked] = useState(false)

  // บันทึกเค้กโปรด
  const toggleSave = useCallback((id: number) => {
    setSavedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }, [])

  // เพิ่มลงรายการสั่งซื้อ
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product)
    setCart((prev) => [...prev, product])
    setShowOrderModal(true)
  }

  // ตัวกรองเค้ก
  const filteredCakes = INITIAL_CAKES.filter((cake) => {
    const matchesSearch = cake.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'ทั้งหมด' || cake.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-pink-50/40 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 font-sans pb-24">
      {/* Header / Banner ร้าน */}
      <header className="relative bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 text-white py-12 px-6 shadow-xl overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10 text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Cake className="w-4 h-4" /> Sweet Studio & Bakery 3D
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">ร้านเค้กโฮมเมดสไตล์มินิมอล</h1>
          <p className="text-pink-100 text-sm md:text-base max-w-xl mx-auto">
            สั่งเค้กวันเกิด คัสตอมข้อความหน้าเค้ก หรือจองโต๊ะจิบชาในบรรยากาศสุดอบอุ่น
          </p>

          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => setShowBookingModal(true)}
              className="bg-white text-pink-600 hover:bg-pink-50 px-5 py-2.5 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center gap-2 active:scale-95"
            >
              <Calendar className="w-4 h-4" /> จองโต๊ะทานที่ร้าน
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 mt-8 space-y-8">
        {/* ช่องค้นหา และหมวดหมู่ */}
        <section className="space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-pink-400" />
            <input
              type="text"
              placeholder="ค้นหาเค้กที่ต้องการ เช่น ช็อกโกแลต, สตอเบอรี่..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white dark:bg-zinc-900 border border-pink-200 dark:border-pink-900/50 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 justify-center text-xs">
            {['ทั้งหมด', 'เค้กผลไม้', 'ช็อกโกแลต', 'สไตล์เกาหลี', 'ชีสเค้ก'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap font-medium ${
                  selectedCategory === cat
                    ? 'bg-pink-500 text-white shadow-md shadow-pink-500/20'
                    : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-pink-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* รายการเค้ก 3D Card */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCakes.map((cake) => (
            <Product3DCard
              key={cake.id}
              product={cake}
              isSaved={savedItems.includes(cake.id)}
              onToggleSave={toggleSave}
              onSelect={handleSelectProduct}
            />
          ))}
        </section>
      </main>

      {/* Modal สรุปออเดอร์เค้ก */}
      {showOrderModal && selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-pink-100">
            <div className="flex justify-between items-center border-b pb-3 border-zinc-100">
              <h2 className="text-lg font-bold flex items-center gap-2 text-pink-600">
                <ShoppingBag className="w-5 h-5" /> ยืนยันคำสั่งซื้อเค้ก
              </h2>
              <button onClick={() => setShowOrderModal(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500">เมนูเค้ก:</span>
                <span className="font-semibold">{selectedProduct.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">ราคารวม:</span>
                <span className="font-bold text-pink-600 text-base">{selectedProduct.price}</span>
              </div>
              <div className="bg-pink-50 dark:bg-pink-950/30 p-3 rounded-2xl text-xs text-pink-700 dark:text-pink-300">
                ✨ ร้านค้าจะเริ่มทำเค้กหลังจากได้รับการยืนยัน ติดต่อเชฟ: {selectedProduct.sellerContact}
              </div>
            </div>

            <button
              onClick={() => {
                alert('สั่งซื้อเค้กเรียบร้อยแล้ว! ทางร้านจะจัดส่งให้ตามเวลาครับ')
                setShowOrderModal(false)
              }}
              className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-2xl shadow-lg transition-all"
            >
              ยืนยันการสั่งซื้อ
            </button>
          </div>
        </div>
      )}

      {/* Modal จองโต๊ะทานที่ร้าน */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-lg font-bold text-pink-600 flex items-center gap-2">
                <Calendar className="w-5 h-5" /> จองโต๊ะจิบชา & ทานเค้ก
              </h2>
              <button onClick={() => setShowBookingModal(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {isBooked ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
                <h3 className="text-xl font-bold">จองโต๊ะสำเร็จแล้ว!</h3>
                <p className="text-xs text-zinc-500">เราได้บันทึกการจองสำหรับคุณ {booking.name} เรียบร้อยแล้ว</p>
                <button
                  onClick={() => {
                    setIsBooked(false)
                    setShowBookingModal(false)
                  }}
                  className="px-6 py-2 bg-pink-500 text-white rounded-xl text-xs font-semibold"
                >
                  ตกลง
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setIsBooked(true)
                }}
                className="space-y-3 text-xs"
              >
                <div>
                  <label className="block mb-1 font-medium text-zinc-600">ชื่อผู้จอง</label>
                  <input
                    required
                    type="text"
                    placeholder="กรอกชื่อ-นามสกุล"
                    value={booking.name}
                    onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 border focus:ring-2 focus:ring-pink-400 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block mb-1 font-medium text-zinc-600">วันที่</label>
                    <input
                      required
                      type="date"
                      value={booking.date}
                      onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-50 border focus:ring-2 focus:ring-pink-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium text-zinc-600">เวลา</label>
                    <input
                      required
                      type="time"
                      value={booking.time}
                      onChange={(e) => setBooking({ ...booking, time: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-50 border focus:ring-2 focus:ring-pink-400 outline-none"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-2xl shadow-lg mt-2"
                >
                  ยืนยันการจองโต๊ะ
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Floating Bottom Nav */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl border border-pink-100 dark:border-zinc-800 flex items-center gap-8 z-40">
        <button className="flex flex-col items-center gap-0.5 text-pink-500 font-semibold text-xs">
          <Cake className="w-5 h-5" />
          <span>หน้าหลัก</span>
        </button>
        <button
          onClick={() => setShowBookingModal(true)}
          className="flex flex-col items-center gap-0.5 text-zinc-400 hover:text-pink-500 transition-colors text-xs"
        >
          <Calendar className="w-5 h-5" />
          <span>จองโต๊ะ</span>
        </button>
        <div className="relative">
          <button className="flex flex-col items-center gap-0.5 text-zinc-400 hover:text-pink-500 transition-colors text-xs">
            <Heart className="w-5 h-5" />
            <span>ที่บันทึก ({savedItems.length})</span>
          </button>
        </div>
      </nav>
    </div>
  )
}