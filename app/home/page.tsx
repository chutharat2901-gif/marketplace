'use client'

import Link from 'next/link'
import { Search, Sparkles, PlusCircle, Compass, Home, Layers, Box } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'

export default function HomePage() {
  return (
    <div className="min-h-screen pb-32 max-w-md mx-auto bg-slate-50 dark:bg-slate-950 border-x border-slate-200 dark:border-slate-800 relative px-4 transition-colors duration-300">
      
      {/* Header */}
      <header className="sticky top-0 z-20 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md py-4 border-b border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="text-indigo-600 dark:text-indigo-400" size={20} />
            Campus Market
          </h1>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="ค้นหาสินค้า, หนังสือ, อุปกรณ์..."
            className="w-full pl-10 pr-4 py-2 bg-slate-200/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-100 placeholder-slate-400 transition-all"
          />
        </div>
      </header>

      {/* 1. Immersive 3D/Glass Card (ใช้ CSS Pure + Lucide Icon) */}
      <div className="relative overflow-hidden rounded-3xl p-5 bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-950 text-white shadow-xl border border-indigo-500/30 my-4 group">
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 backdrop-blur-md border border-white/10 text-indigo-300">
              <Sparkles size={12} className="text-amber-400 animate-pulse" />
              <span>3D Interactive Space</span>
            </div>
            <h2 className="text-lg font-bold tracking-tight">สำรวจตลาดมิติใหม่</h2>
            <p className="text-xs text-slate-300 max-w-[200px] leading-relaxed">
              แหล่งซื้อขายอัจฉริยะ เชื่อมต่อนักศึกษาในรั้วมหาวิทยาลัย
            </p>
          </div>

          {/* 3D Box Element */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500/30 to-purple-500/30 backdrop-blur-xl border border-white/20 shadow-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
            <Box size={32} className="text-indigo-300 drop-shadow-[0_0_10px_rgba(99,102,241,0.8)] animate-bounce" />
          </div>
        </div>
      </div>

      {/* หมวดหมู่สินค้า */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
        <button className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-medium whitespace-nowrap shadow-sm">
          ทั้งหมด
        </button>
        <button className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap">
          หนังสือ/ตำรา
        </button>
        <button className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap">
          ไอที/อุปกรณ์เสริม
        </button>
        <button className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap">
          เครื่องแต่งกาย
        </button>
      </div>

      {/* รายการสินค้า */}
      <div className="mt-4 space-y-4">
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 shadow-sm hover:shadow-md transition-shadow">
          <div className="h-48 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 text-sm">
            รูปสินค้า (กระเป๋าเป้สะพายหลัง)
          </div>
          <div className="mt-3 space-y-1">
            <span className="text-[10px] text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded-md font-medium">
              ส่งฟรีในวิทยาลัย
            </span>
            <h3 className="font-semibold text-sm text-slate-900 dark:text-white pt-1">
              กระเป๋าเป้สะพายหลัง ใส่โน้ตบุ๊ก 15 นิ้ว
            </h3>
            <p className="text-sm text-indigo-600 dark:text-indigo-400 font-bold">฿320</p>
          </div>
        </div>
      </div>

      {/* 2. Experimental Floating Navigation Dock (ใช้ TailWind Pure) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-xs px-4">
        <nav className="flex items-center justify-around p-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xl shadow-indigo-500/10">
          <Link
            href="/home"
            className="flex flex-col items-center gap-0.5 text-indigo-600 dark:text-indigo-400 hover:scale-105 active:scale-95 transition-all"
          >
            <Home size={18} />
            <span className="text-[10px] font-semibold">หน้าแรก</span>
          </Link>

          <Link
            href="/home"
            className="flex flex-col items-center gap-0.5 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-105 active:scale-95 transition-all"
          >
            <Compass size={18} />
            <span className="text-[10px] font-medium">สำรวจ</span>
          </Link>

          <Link
            href="/product"
            className="flex flex-col items-center gap-0.5 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-105 active:scale-95 transition-all"
          >
            <PlusCircle size={18} />
            <span className="text-[10px] font-medium">ลงขาย</span>
          </Link>
        </nav>
      </div>

    </div>
  )
}