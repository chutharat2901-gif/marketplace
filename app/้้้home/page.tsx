'use client'

import Link from 'next/link'
import { PlusCircle, Search, Home as HomeIcon, Tag, User, Sparkles } from 'lucide-react'

interface Product {
  id: string
  title: string
  price: number
  seller: string
  major: string
  image: string
  category: string
  condition: string
}

const mockProducts: Product[] = [
  {
    id: '1',
    title: 'หนังสือเรียน แคลคูลัส 1 สำหรับวิศวะ (สภาพ 95%)',
    price: 180,
    seller: 'พี่มาร์ค',
    major: 'วิศวกรรมคอมพิวเตอร์ ปี 3',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400',
    category: 'หนังสือ',
    condition: 'มือสองสภาพดี'
  },
  {
    id: '2',
    title: 'หูฟัง Bluetooth เสียงดี เบสแน่น',
    price: 350,
    seller: 'แก้ว',
    major: 'บริหารธุรกิจ ปี 2',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400',
    category: 'ไอที/อุปกรณ์',
    condition: 'มือสอง'
  },
  {
    id: '3',
    title: 'เสื้อกาวน์ปฏิบัติการ ไซส์ M ไม่เคยใส่',
    price: 220,
    seller: 'แพรวา',
    major: 'วิทยาศาสตร์ ปี 1',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400',
    category: 'เสื้อผ้า/เครื่องแต่งกาย',
    condition: 'ของใหม่'
  },
  {
    id: '4',
    title: 'เครื่องคิดเลขวิทยาศาสตร์ Casio FX-991EX',
    price: 550,
    seller: 'กอล์ฟ',
    major: 'บัญชี ปี 4',
    image: 'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48a?auto=format&fit=crop&q=80&w=400',
    category: 'อุปกรณ์เรียน',
    condition: 'มือสองสภาพดี'
  },
  {
    id: '5',
    title: 'พัดลมพกพาชาร์จ USB ลมแรงมาก',
    price: 99,
    seller: 'ตูน',
    major: 'สถาปัตยกรรม ปี 2',
    image: 'https://images.unsplash.com/photo-1618941716939-553df3c6c278?auto=format&fit=crop&q=80&w=400',
    category: 'เครื่องใช้ไฟฟ้า',
    condition: 'มือสอง'
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen pb-24 max-w-md mx-auto bg-slate-50 dark:bg-slate-950 border-x border-slate-200 dark:border-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md p-4 border-b border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="text-indigo-600 dark:text-indigo-400" size={20} />
            Campus Market
          </h1>
          <Link
            href="/product"
            className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3 py-2 rounded-xl transition"
          >
            <PlusCircle size={16} />
            <span>ลงขาย</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="ค้นหาสินค้า, หนังสือ, อุปกรณ์..."
            className="w-full pl-10 pr-4 py-2 bg-slate-200/60 dark:bg-slate-900 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100 placeholder-slate-500"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            สินค้ามาใหม่ล่าสุด
          </h2>
          <span className="text-xs text-indigo-600 dark:text-indigo-400">ทั้งหมด 5 รายการ</span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-3">
          {mockProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative h-36 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-slate-900/70 text-white text-[10px] font-medium px-2 py-0.5 rounded-full backdrop-blur-sm">
                    {item.condition}
                  </span>
                </div>
                <div className="p-3">
                  <span className="text-[10px] font-medium text-indigo-600 dark:text-indigo-400">
                    {item.category}
                  </span>
                  <h3 className="text-xs font-semibold text-slate-800 dark:text-slate-100 line-clamp-2 mt-0.5">
                    {item.title}
                  </h3>
                  <p className="text-base font-extrabold text-indigo-600 dark:text-indigo-400 mt-2">
                    ฿{item.price.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Seller Info */}
              <div className="p-3 pt-0 border-t border-slate-100 dark:border-slate-800/50 mt-2">
                <p className="text-[11px] font-medium text-slate-700 dark:text-slate-300 truncate">
                  {item.seller}
                </p>
                <p className="text-[9px] text-slate-500 dark:text-slate-400 truncate">
                  {item.major}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Bottom Mobile Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 py-2 px-6 flex justify-around items-center z-20">
        <Link href="/home" className="flex flex-col items-center text-indigo-600 dark:text-indigo-400">
          <HomeIcon size={20} />
          <span className="text-[10px] mt-1 font-medium">หน้าแรก</span>
        </Link>
        <Link href="/product" className="flex flex-col items-center text-slate-400 hover:text-indigo-600">
          <PlusCircle size={20} />
          <span className="text-[10px] mt-1 font-medium">ลงขาย</span>
        </Link>
        <div className="flex flex-col items-center text-slate-400">
          <Tag size={20} />
          <span className="text-[10px] mt-1 font-medium">หมวดหมู่</span>
        </div>
        <div className="flex flex-col items-center text-slate-400">
          <User size={20} />
          <span className="text-[10px] mt-1 font-medium">โปรไฟล์</span>
        </div>
      </nav>
    </div>
  )
}