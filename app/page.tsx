'use client'

import Link from 'next/link'
import { ShoppingBag, ArrowRight, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function SplashScreen() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <main className="flex flex-col justify-between items-center min-h-screen p-6 sm:p-10 relative overflow-hidden">
      {/* Theme Toggle Button */}
      <div className="w-full flex justify-end max-w-md">
        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-3 rounded-full bg-slate-200/50 dark:bg-slate-800/50 backdrop-blur-md border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-sm"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        )}
      </div>

      {/* Hero Content */}
      <div className="flex flex-col items-center text-center my-auto space-y-6 max-w-sm">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-xl shadow-indigo-500/20 animate-pulse">
          <ShoppingBag size={48} className="text-white" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Campus Market
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            แหล่งซื้อ-ขาย แลกเปลี่ยนสินค้าของนักศึกษาในวิทยาลัย ซื้อขายง่าย ปลอดภัย ใกล้ตัว
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="w-full max-w-sm pb-6">
        <Link
          href="/home"
          className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
        >
          <span>เข้าสู่ตลาด</span>
          <ArrowRight size={20} />
        </Link>
      </div>
    </main>
  )
}