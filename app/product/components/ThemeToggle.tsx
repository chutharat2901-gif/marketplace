'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2.5 rounded-2xl bg-slate-200/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 hover:scale-105 active:scale-95 transition-all shadow-sm border border-slate-300/50 dark:border-slate-700/50"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <Sun size={20} className="text-amber-400" />
      ) : (
        <Moon size={20} className="text-indigo-600" />
      )}
    </button>
  )
}