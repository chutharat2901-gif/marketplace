'use client'
import Product3DCard from '@/components/Product3DCard'
import { useState, useEffect, useCallback } from 'react'
import {
  Search,
  Bookmark,
  Sparkles,
  BookOpen,
  ArrowUpRight,
  Check,
  X,
  Star,
  ShoppingBag,
  Eye,
  Tablet,
  MousePointer,
  PenTool,
  Package,
  QrCode,
} from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'

interface Product {
  id: number
  title: string
  seller: string
  condition: string
  price: string
  category: string
  tag: string
  rating: number
  imageUrl: string
  description: string
  location: string
}

const CATEGORIES = [
  'ทั้งหมด',
  'iPad & Gadgets',
  'อุปกรณ์ไอที',
  'หนังสือ & เอกสารเรียน',
  'เครื่องเขียน & สมุด',
  'ของใช้ & กระเป๋า',
]

const PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'iPad Air 5 (M1) 64GB Wi-Fi + Apple Pencil 2',
    seller: 'พี่เกรซ ปี 4 วิศวะ',
    condition: 'สภาพ 95% สุขภาพแบต 91%',
    price: '14,500 บาท',
    category: 'iPad & Gadgets',
    tag: 'หลุดจอง/ราคาดี',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    description: 'แถมเคส magnetic และติดฟิล์มกระดาษเรียบร้อยแล้ว พร้อมกล่องและสายชาร์จแท้ นัดรับหน้าตึกกิจกรรมได้เลย',
    location: 'ใต้ตึกกิจกรรมนักศึกษา (ซุ้ม B01)',
  },
  {
    id: 2,
    title: 'Logitech Pebble M350 เมาส์ไร้สาย เสียงเงียบ',
    seller: 'คุณตั้ม คณะบริหาร',
    condition: 'มือสอง สภาพดี 90%',
    price: '390 บาท',
    category: 'อุปกรณ์ไอที',
    tag: 'ของมันต้องมี',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80',
    description: 'เชื่อมต่อผ่าน Bluetooth / USB Receiver ได้ น้ำหนักเบา เสียงคลิกเงียบมาก เหมาะอ่านหนังสือในห้องสมุด',
    location: 'โซนไอที หน้าโรงอาหารกลาง',
  },
  {
    id: 3,
    title: 'หนังสือชีทสรุป แคลคูลัส 1 & 2 + ข้อสอบเก่าพร้อมเฉลย',
    seller: 'ชมรมวิชาการ',
    condition: 'พิมพ์ใหม่ 2026',
    price: '150 บาท',
    category: 'หนังสือ & เอกสารเรียน',
    tag: 'Best Seller',
    rating: 5.0,
    imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80',
    description: 'สรุปสูตรลับ และลายมือจดละเอียด อ่านเข้าใจง่าย ปูพื้นฐานแน่น เหมาะสำหรับคนเตรียมสอบกลางภาค',
    location: 'ลานไทร หน้าลานกิจกรรม',
  },
  {
    id: 4,
    title: 'เซ็ตสมุดสันห่วง A5 (กระดาษถนอมสายตา 80 แกรม)',
    seller: 'ร้านเครื่องเขียนคุณป้า',
    condition: 'ของใหม่ 100%',
    price: '89 บาท (แพ็ก 3 เล่ม)',
    category: 'เครื่องเขียน & สมุด',
    tag: 'สุดคุ้ม',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80',
    description: 'สมุดบันทึกแบบตารางกริด หมึกไม่ซึม เขียนง่าย เหมาะจดเลกเชอร์หรือทำ Bullet Journal',
    location: 'บูธเครื่องเขียน 12',
  },
  {
    id: 5,
    title: 'กระเป๋าใส่ iPad กันกระแทก (ใส่ iPad Pro 11 / Air 5 ได้)',
    seller: 'Shop.Campus',
    condition: 'ของใหม่ พร้อมส่ง',
    price: '250 บาท',
    category: 'ของใช้ & กระเป๋า',
    tag: 'สไตล์มินิมอล',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    description: 'ผ้ากันน้ำ มีช่องเก็บปากกา Apple Pencil และสายชาร์จแยกต่างหาก บุฟองน้ำกันกระแทกอย่างดี',
    location: 'ซุ้มแฟชั่น ถนนคนเดินวิทยาลัย',
  },
  {
    id: 6,
    title: 'ปากกาไฮไลท์สีพาสเทล 6 สี (ไม่ซึมทะลุกระดาษ)',
    seller: 'Stationery Corner',
    condition: 'ของใหม่นำเข้า',
    price: '65 บาท',
    category: 'เครื่องเขียน & สมุด',
    tag: 'ฮิตใน TikTok',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=600&q=80',
    description: 'สีหวานเนียนตา ไม่เข้มจนทับตัวหนังสือ หัวปากกาเน้นข้อความได้สองขนาด ความยาวใช้งานได้นาน',
    location: 'บูธเครื่องเขียน 12',
  },
]

export default function CampusMarketPage() {
  const [activeCategory, setActiveCategory] = useState('ทั้งหมด')
  const [searchQuery, setSearchQuery] = useState('')
  const [savedItems, setSavedItems] = useState<number[]>([])
  const [currentTab, setCurrentTab] = useState<'market' | 'explore' | 'saved'>('market')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const toggleSave = useCallback((id: number, e?: React.MouseEvent) => {
    e?.stopPropagation()
    setSavedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    )
  }, [])

  const closeModal = useCallback(() => {
    setSelectedProduct(null)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    if (selectedProduct) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedProduct, closeModal])

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = activeCategory === 'ทั้งหมด' || product.category === activeCategory
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.seller.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (currentTab === 'saved') {
      <div className="grid grid-cols-1 gap-4">
  {filteredProducts.map((product) => (
    <Product3DCard
      key={product.id}
      product={product}
      isSaved={savedItems.includes(product.id)}
      onToggleSave={toggleSave}
      onSelect={setSelectedProduct}
    />
  ))}
</div>
      return savedItems.includes(product.id) && matchesCategory && matchesSearch
    }

    if (currentTab === 'explore') {
      return (product.rating >= 4.9 || product.tag.includes('ฮิต') || product.tag.includes('คุ้ม')) && matchesCategory && matchesSearch
    }

    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen pb-32 max-w-xl mx-auto bg-[#F9F9FB] dark:bg-[#121316] text-[#1D1E20] dark:text-[#ECEEDF] font-sans transition-colors duration-500 relative border-x border-slate-200 dark:border-slate-800">
      {/* Header Bar */}
      <div className="h-1.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600" />

      <header className="px-5 pt-5 pb-4 space-y-3 border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-[#F9F9FB]/95 dark:bg-[#121316]/95 backdrop-blur-md z-20">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-full text-[10px] font-bold tracking-wider uppercase">
              Campus Flea Market
            </span>
          </div>
          <ThemeToggle />
        </div>

        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            ตลาดนัดวิทยาลัย 🛍️
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            ไอแพด มือสอง เครื่องเขียน สรุปชีท และอุปกรณ์การเรียนราคานักศึกษา
          </p>
        </div>

        {/* Search Box */}
        <div className="relative pt-1">
          <Search className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหา ไอแพด, เมาส์, สมุดโน้ต, ปากกา..."
            className="w-full pl-10 pr-9 py-2 bg-white dark:bg-[#1C1D21] border border-slate-300 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 transition-all text-slate-800 dark:text-slate-100"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Clear Search"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </header>

      <main className="px-5 py-5 space-y-6">
        {/* Banner Announcement */}
        {currentTab !== 'saved' && (
          <div className="relative overflow-hidden p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md flex items-center justify-between">
            <div className="space-y-1 z-10">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/20 text-[10px] font-bold tracking-wide uppercase backdrop-blur-md">
                <Sparkles size={10} />
                <span>สแกนจ่ายง่าย ไม่ต้องพกเงินสด</span>
              </span>
              <h2 className="text-base font-bold">ดีลเด็ดอุปกรณ์การเรียนวันนี้</h2>
              <p className="text-[11px] text-blue-100 opacity-90">
                พร้อมนัดรับตรงตึกกิจกรรม และลานไทรตลอดช่วงพักเที่ยง!
              </p>
            </div>
            <QrCode className="w-12 h-12 text-white/30 shrink-0" />
          </div>
        )}

        {/* Categories */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
            <span>หมวดหมู่สินค้า</span>
            {currentTab === 'saved' && (
              <span className="text-blue-600 dark:text-blue-400">
                บันทึกไว้ {savedItems.length} ชิ้น
              </span>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all text-xs font-medium ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white dark:bg-[#1C1D21] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {currentTab === 'saved'
                ? `รายการที่เซฟไว้ (${filteredProducts.length})`
                : currentTab === 'explore'
                ? `สินค้ายอดนิยม (${filteredProducts.length})`
                : `สินค้าทั้งหมด (${filteredProducts.length})`}
            </h3>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-14 space-y-3 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6">
              <Package size={36} className="mx-auto text-slate-300 dark:text-slate-700" />
              <p className="text-xs text-slate-500">
                {currentTab === 'saved'
                  ? 'ยังไม่มีสินค้าที่คุณบันทึกไว้'
                  : 'ไม่พบสินค้าที่คุณค้นหา ลองเปลี่ยนคำค้นดูนะ'}
              </p>
              <button
                onClick={() => {
                  setActiveCategory('ทั้งหมด')
                  setSearchQuery('')
                  setCurrentTab('market')
                }}
                className="text-xs text-blue-600 dark:text-blue-400 font-bold underline"
              >
                ดูสินค้าทั้งหมดในตลาด
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredProducts.map((product) => {
                const isSaved = savedItems.includes(product.id)
                return (
                  <div
                    key={product.id}
                    className="group relative border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 bg-white dark:bg-[#1A1B1E] hover:shadow-lg transition-all duration-300 flex gap-3.5 items-center"
                  >
                    {/* Product Image */}
                    <div
                      onClick={() => setSelectedProduct(product)}
                      className="w-24 h-24 shrink-0 relative rounded-xl overflow-hidden cursor-pointer bg-slate-100 dark:bg-slate-800"
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Eye size={18} className="text-white drop-shadow-md" />
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 space-y-1 pr-5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300">
                          {product.tag}
                        </span>
                        <div className="flex items-center gap-0.5 text-[10px] text-amber-500 font-bold">
                          <Star size={10} className="fill-amber-400 text-amber-400" />
                          <span>{product.rating}</span>
                        </div>
                      </div>

                      <h4
                        onClick={() => setSelectedProduct(product)}
                        className="font-bold text-sm leading-snug cursor-pointer line-clamp-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {product.title}
                      </h4>

                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        ผู้ขาย: <span className="font-medium text-slate-700 dark:text-slate-300">{product.seller}</span>
                      </p>

                      <div className="pt-1 flex items-center justify-between">
                        <span className="text-sm font-black text-blue-600 dark:text-blue-400">
                          {product.price}
                        </span>
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="flex items-center gap-0.5 text-[11px] text-slate-600 dark:text-slate-400 hover:text-blue-600 font-medium"
                        >
                          รายละเอียด <ArrowUpRight size={12} />
                        </button>
                      </div>
                    </div>

                    {/* Bookmark Button */}
                    <button
                      onClick={(e) => toggleSave(product.id, e)}
                      className="absolute top-3.5 right-3.5 p-1 text-slate-400 hover:text-blue-600 transition-colors"
                      aria-label={isSaved ? 'ยกเลิกการเซฟ' : 'เซฟสินค้า'}
                    >
                      {isSaved ? (
                        <Check size={18} className="text-emerald-500" />
                      ) : (
                        <Bookmark size={18} />
                      )}
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white dark:bg-[#1A1B1E] text-slate-900 dark:text-slate-100 max-w-md w-full p-5 rounded-3xl shadow-2xl relative space-y-4 animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <div className="flex gap-4 items-start">
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.title}
                className="w-24 h-24 rounded-2xl object-cover bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-700"
              />
              <div className="space-y-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                  {selectedProduct.category}
                </span>
                <h3 className="text-base font-bold leading-tight">{selectedProduct.title}</h3>
                <p className="text-xs text-slate-500">
                  โดย: <span className="font-semibold text-slate-700 dark:text-slate-300">{selectedProduct.seller}</span>
                </p>
                <div className="text-[11px] font-medium text-amber-600 dark:text-amber-400 pt-0.5">
                  📌 {selectedProduct.condition}
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-[#121316] p-3 rounded-xl space-y-1 text-xs text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
              <div className="font-semibold text-slate-800 dark:text-slate-200">รายละเอียดสินค้า:</div>
              <p className="leading-relaxed">{selectedProduct.description}</p>
              <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-200 dark:border-slate-800 mt-2">
                📍 จุดนัดรับ: <span className="font-medium text-slate-700 dark:text-slate-300">{selectedProduct.location}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">ราคาขาย</span>
                <span className="text-xl font-black text-blue-600 dark:text-blue-400">
                  {selectedProduct.price}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={(e) => toggleSave(selectedProduct.id, e)}
                  className="p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-xs flex items-center gap-1 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Bookmark size={16} />
                </button>

                <button
                  onClick={() => {
                    alert(`ส่งข้อความหา "${selectedProduct.seller}" เรียบร้อยแล้ว! กรุณารอนัดรับสินค้าที่นัดหมาย`)
                    closeModal()
                  }}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md shadow-blue-500/20"
                >
                  <ShoppingBag size={14} />
                  <span>ทักแชต / จองสินค้า</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Bottom Navigation */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30 w-full max-w-xs px-4">
        <nav className="flex items-center justify-around py-3 px-6 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-full shadow-2xl">
          <button
            onClick={() => setCurrentTab('market')}
            className={`flex flex-col items-center gap-1 transition-opacity ${
              currentTab === 'market' ? 'opacity-100 font-bold' : 'opacity-50 hover:opacity-100'
            }`}
          >
            <BookOpen size={16} />
            <span className="text-[9px]">หน้าแรก</span>
          </button>

          <button
            onClick={() => setCurrentTab('explore')}
            className={`flex flex-col items-center gap-1 transition-opacity ${
              currentTab === 'explore' ? 'opacity-100 font-bold' : 'opacity-50 hover:opacity-100'
            }`}
          >
            <Sparkles size={16} />
            <span className="text-[9px]">ฮิต/คุ้มค่า</span>
          </button>

          <button
            onClick={() => setCurrentTab('saved')}
            className={`flex flex-col items-center gap-1 transition-opacity relative ${
              currentTab === 'saved' ? 'opacity-100 font-bold' : 'opacity-50 hover:opacity-100'
            }`}
          >
            <Bookmark size={16} />
            <span className="text-[9px]">เซฟไว้</span>
            {savedItems.length > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 bg-blue-600 text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                {savedItems.length}
              </span>
            )}
          </button>
        </nav>
      </div>
    </div>
  )
}