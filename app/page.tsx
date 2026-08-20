'use client'

import { useState } from 'react'
import { Search, Bookmark, Compass, Sparkles, BookOpen, ArrowUpRight, Check, Feather } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'

export default function EuropeanLibraryPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [savedItems, setSavedItems] = useState<number[]>([])

  const categories = ['All', 'Rare Manuscripts', 'Philosophy', 'Architecture', 'Classical Literature']

  const books = [
    {
      id: 1,
      title: 'The Principles of Classical Architecture',
      author: 'Vitruvius Pollio',
      year: '1888 Edition',
      price: '€120',
      category: 'Architecture',
      tag: 'Curator Choice',
      bgClass: 'bg-stone-200 dark:bg-stone-800',
    },
    {
      id: 2,
      title: 'Meditations on First Philosophy',
      author: 'René Descartes',
      year: '1902 Leatherbound',
      price: '€85',
      category: 'Philosophy',
      tag: 'Rare Finding',
      bgClass: 'bg-amber-100/60 dark:bg-amber-950/40',
    },
    {
      id: 3,
      title: 'The Divine Comedy & Illustrations',
      author: 'Dante Alighieri',
      year: 'Florence Edition',
      price: '€210',
      category: 'Classical Literature',
      tag: 'Illustrated',
      bgClass: 'bg-emerald-900/10 dark:bg-emerald-950/40',
    },
  ]

  const toggleSave = (id: number) => {
    setSavedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    )
  }

  const filteredBooks = activeCategory === 'All' 
    ? books 
    : books.filter((book) => book.category === activeCategory)

  return (
    <div className="min-h-screen pb-32 max-w-xl mx-auto bg-[#FDFBF7] dark:bg-[#121110] text-[#2C2825] dark:text-[#E6E1DA] font-serif transition-colors duration-500 relative border-x border-[#EAE5D9] dark:border-[#262320]">
      
      {/* Top Ornamental Banner */}
      <div className="h-1.5 bg-gradient-to-r from-amber-800 via-yellow-600 to-amber-900" />

      {/* European Editorial Header */}
      <header className="px-6 pt-6 pb-4 space-y-4 border-b border-[#EAE5D9] dark:border-[#262320] sticky top-0 bg-[#FDFBF7]/90 dark:bg-[#121110]/90 backdrop-blur-md z-20">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Feather size={18} className="text-amber-800 dark:text-amber-500" />
            <span className="text-xs tracking-[0.2em] uppercase font-sans font-semibold text-amber-900 dark:text-amber-400">
              Bibliotheque
            </span>
          </div>
          <ThemeToggle />
        </div>

        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold tracking-wide italic font-serif text-stone-900 dark:text-stone-100">
            L&apos;Atelier du Livre
          </h1>
          <p className="text-[11px] font-sans tracking-widest uppercase text-stone-500 dark:text-stone-400">
            Fine Antiquarian & Academic Literary Market
          </p>
        </div>

        {/* Elegant Search Bar */}
        <div className="relative font-sans pt-1">
          <Search className="absolute left-3.5 top-3.5 text-stone-400" size={16} />
          <input
            type="text"
            placeholder="Search authors, rare editions, manuscripts..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#F5F1E8] dark:bg-[#1A1816] border border-[#E0DAB] dark:border-[#2C2825] rounded-none text-xs focus:outline-none focus:border-amber-800 dark:focus:border-amber-500 placeholder-stone-400 transition-all italic"
          />
        </div>
      </header>

      <main className="px-6 py-6 space-y-8">
        
        {/* European Exhibition Showcase Banner */}
        <div className="relative overflow-hidden p-6 border border-amber-900/20 dark:border-amber-500/20 bg-[#F4EFE6] dark:bg-[#181614] shadow-sm">
          <div className="space-y-3 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-amber-800/30 text-[9px] font-sans uppercase tracking-widest text-amber-900 dark:text-amber-400">
              <Sparkles size={10} />
              <span>Exhibition Spotlight</span>
            </div>
            <h2 className="text-xl font-semibold leading-snug">
              19th Century European Fine Bindings & First Editions
            </h2>
            <p className="text-xs font-sans text-stone-600 dark:text-stone-400 leading-relaxed max-w-sm">
              Discover curated classical literature sourced directly from antiquarian dealers across Paris, Vienna, and London.
            </p>
          </div>
        </div>

        {/* Category Filters (Interactive) */}
        <div className="space-y-3">
          <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-stone-400 block">
            Select Collection
          </span>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none font-sans text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 whitespace-nowrap transition-all text-[11px] uppercase tracking-wider ${
                  activeCategory === cat
                    ? 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 font-medium'
                    : 'bg-[#F2ECE1] dark:bg-[#1C1A18] text-stone-600 dark:text-stone-400 hover:bg-[#E8E0D0]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Book Gallery List */}
        <div className="space-y-6">
          <div className="flex justify-between items-baseline border-b border-[#EAE5D9] dark:border-[#262320] pb-2">
            <h3 className="text-sm font-sans tracking-widest uppercase text-stone-500">
              Catalogue ({filteredBooks.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {filteredBooks.map((book) => {
              const isSaved = savedItems.includes(book.id)
              return (
                <div
                  key={book.id}
                  className="group relative border border-[#E6E0D2] dark:border-[#282420] p-4 bg-white dark:bg-[#161412] hover:shadow-lg transition-all duration-300 flex gap-4 items-center"
                >
                  {/* Decorative Book Spine/Cover Simulation */}
                  <div
                    className={`w-20 h-28 shrink-0 ${book.bgClass} border border-stone-300 dark:border-stone-700 flex flex-col justify-between p-2 shadow-inner group-hover:scale-105 transition-transform`}
                  >
                    <div className="h-full border border-dashed border-stone-400/40 dark:border-stone-500/30 flex items-center justify-center p-1 text-center">
                      <BookOpen size={20} className="text-stone-600 dark:text-stone-400 opacity-60" />
                    </div>
                  </div>

                  {/* Book Details */}
                  <div className="flex-1 space-y-1.5 pr-6">
                    <span className="text-[9px] font-sans uppercase tracking-widest text-amber-800 dark:text-amber-500 font-semibold">
                      {book.tag}
                    </span>
                    <h4 className="font-bold text-base leading-tight group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors">
                      {book.title}
                    </h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400 italic">
                      {book.author} — <span className="font-sans text-[10px] uppercase">{book.year}</span>
                    </p>
                    <div className="pt-2 flex items-center justify-between font-sans">
                      <span className="text-sm font-semibold">{book.price}</span>
                      <button className="flex items-center gap-1 text-[11px] text-stone-800 dark:text-stone-200 underline underline-offset-4 hover:text-amber-800">
                        View Details <ArrowUpRight size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Bookmark Button (Interactive) */}
                  <button
                    onClick={() => toggleSave(book.id)}
                    className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-amber-800 dark:hover:text-amber-400 transition-colors"
                    aria-label="Save Book"
                  >
                    {isSaved ? (
                      <Check size={16} className="text-emerald-700 dark:text-emerald-400" />
                    ) : (
                      <Bookmark size={16} />
                    )}
                  </button>
                </div>
              )
            })}
          </div>
        </div>

      </main>

      {/* Classical European Floating Navigation */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-xs px-4">
        <nav className="flex items-center justify-around py-3 px-6 bg-[#2C2825] text-[#FDFBF7] dark:bg-[#FDFBF7] dark:text-[#2C2825] shadow-2xl font-sans">
          <button className="flex flex-col items-center gap-1 hover:opacity-70 transition-opacity">
            <BookOpen size={16} />
            <span className="text-[9px] tracking-widest uppercase font-medium">Library</span>
          </button>

          <button className="flex flex-col items-center gap-1 hover:opacity-70 transition-opacity">
            <Compass size={16} />
            <span className="text-[9px] tracking-widest uppercase font-medium">Explore</span>
          </button>

          <button className="flex flex-col items-center gap-1 hover:opacity-70 transition-opacity relative">
            <Bookmark size={16} />
            <span className="text-[9px] tracking-widest uppercase font-medium">Saved</span>
            {savedItems.length > 0 && (
              <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-amber-600 text-white text-[8px] rounded-full flex items-center justify-center font-bold">
                {savedItems.length}
              </span>
            )}
          </button>
        </nav>
      </div>

    </div>
  )
}