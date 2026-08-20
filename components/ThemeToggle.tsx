'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // เช็คค่าธีมเดิมจาก LocalStorage หรือระบบ
    const isDark = localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    
    setDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setDarkMode(false)
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setDarkMode(true)
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:opacity-80 transition-all"
      aria-label="Toggle Theme"
    >
      {darkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
    </button>
  )
}