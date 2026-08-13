'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // ป้องกันปัญหา Hydration error บน Next.js
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-200/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 hover:scale-105 active:scale-95 transition-all shadow-sm border border-slate-300/50 dark:border-slate-700/50 text-xs font-semibold"
      aria-label="Toggle Theme"
    >
      {isDark ? (
        <>
          <Sun size={16} className="text-amber-400" />
          <span>กลางวัน</span>
        </>
      ) : (
        <>
          <Moon size={16} className="text-indigo-600" />
          <span>กลางคืน</span>
        </>
      )}
    </button>
  )
}