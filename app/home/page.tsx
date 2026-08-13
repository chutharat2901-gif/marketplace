'use client'

import Link from 'next/link'
import { Search, Sparkles, PlusCircle } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle' // 1. Import ปุ่มมาใช้งาน

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
          
          <div className="flex items-center gap-2">
            {/* 2. วางปุ่มสลับธีมตรงนี้ */}
            <ThemeToggle />

            <Link
              href="/product"
              className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3 py-1.5 rounded-full"
            >
              <PlusCircle size={16} />
              <span>ลงขาย</span>
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="ค้นหาสินค้า, หนังสือ, อุปกรณ์..."
            className="w-full pl-10 pr-4 py-2 bg-slate-200/60 dark:bg-slate-900 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
          />
        </div>
      </header>

      {/* เนื้อหาหน้าเว็บอื่น ๆ ... */}

    </div>
  )
}