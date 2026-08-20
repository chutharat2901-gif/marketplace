'use client'

import { useState } from 'react'
import { Search, Bookmark, Compass, Sparkles, BookOpen, ArrowUpRight, Check, Feather, X, Star, ShoppingBag, Eye } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'

interface Book {
  id: number
  title: string
  author: string
  year: string
  price: string
  category: string
  tag: string
  rating: number
  coverUrl: string
  description: string
  location: string
}

export default function EuropeanLibraryPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [savedItems, setSavedItems] = useState<number[]>([])
  const [currentTab, setCurrentTab] = useState<'library' | 'explore' | 'saved'>('library')
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  const categories = ['All', 'Rare Manuscripts', 'Philosophy', 'Architecture', 'Classical Literature', 'History & Science']

  const books: Book[] = [
    {
      id: 1,
      title: 'The Principles of Classical Architecture',
      author: 'Vitruvius Pollio',
      year: '1888 Edition',
      price: '€120',
      category: 'Architecture',
      tag: 'Curator Choice',
      rating: 4.9,
      coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      description: 'A masterpiece detailing Roman architectural theory, symmetry, proportion, and the golden ratio of classical European structures.',
      location: 'Vault A-12, Vienna'
    },
    {
      id: 2,
      title: 'Meditations on First Philosophy',
      author: 'René Descartes',
      year: '1902 Leatherbound',
      price: '€85',
      category: 'Philosophy',
      tag: 'Rare Finding',
      rating: 4.8,
      coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
      description: 'Philosophical treatise containing Descartes foundational arguments for rationalism, metaphysics, and epistemological certainty.',
      location: 'Archive 4, Paris'
    },
    {
      id: 3,
      title: 'The Divine Comedy & Original Plates',
      author: 'Dante Alighieri',
      year: 'Florence 1895',
      price: '€210',
      category: 'Classical Literature',
      tag: 'Illustrated',
      rating: 5.0,
      coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80',
      description: 'An extraordinary epic poem traversing Inferno, Purgatorio, and Paradiso with full-page woodcut engravings.',
      location: 'Gallery II, Florence'
    },
    {
      id: 4,
      title: 'On the Origin of Species',
      author: 'Charles Darwin',
      year: '1859 First Replica',
      price: '€340',
      category: 'History & Science',
      tag: 'Historical Doc',
      rating: 4.9,
      coverUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80',
      description: 'Groundbreaking scientific literature detailing evolutionary biology and natural selection with original fold-out diagram.',
      location: 'Cabinet 08, London'
    },
    {
      id: 5,
      title: 'Les Misérables (Complete 5 Volumes)',
      author: 'Victor Hugo',
      year: 'Paris 1862 Leather',
      price: '€450',
      category: 'Classical Literature',
      tag: 'Antique Collector',
      rating: 5.0,
      coverUrl: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=600&q=80',
      description: 'Complete five-volume gilt-edge bound set investigating law, grace, and redemption in 19th-century France.',
      location: 'Reserve C, Lyon'
    },
    {
      id: 6,
      title: 'Critique of Pure Reason',
      author: 'Immanuel Kant',
      year: '1781 Riga Edition',
      price: '€195',
      category: 'Philosophy',
      tag: 'First Edition',
      rating: 4.7,
      coverUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80',
      description: 'Fundamental text investigating human cognition, synthetic a priori judgments, and transcendental philosophy.',
      location: 'Königsberg Wing, Berlin'
    },
    {
      id: 7,
      title: 'The Elements of Geology',
      author: 'Charles Lyell',
      year: 'London 1838 Edition',
      price: '€160',
      category: 'History & Science',
      tag: 'Victorian Science',
      rating: 4.6,
      coverUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
      description: 'Pioneering geological treatise establishing uniformitarianism and modern understanding of Earth stratum history.',
      location: 'Section 14, Edinburgh'
    },
    {
      id: 8,
      title: 'Illuminated Renaissance Manuscript',
      author: 'Monastery of Saint Gall',
      year: '1480 Hand-drawn',
      price: '€1,250',
      category: 'Rare Manuscripts',
      tag: 'Museum Grade',
      rating: 5.0,
      coverUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80',
      description: 'Exquisite vellum manuscript adorned with gold leaf illuminations, Latin calligraphy, and intricate botanical margins.',
      location: 'High Security Vault, Zurich'
    },
  ]

  const toggleSave = (id: number) => {
    setSavedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    )
  }

  // Filter Logic
  const filteredBooks = books.filter((book) => {
    const matchesCategory = activeCategory === 'All' || book.category === activeCategory
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = currentTab === 'saved' ? savedItems.includes(book.id) : true

    return matchesCategory && matchesSearch && matchesTab
  })

  return (
    <div className="min-h-screen pb-32 max-w-xl mx-auto bg-[#FDFBF7] dark:bg-[#121110] text-[#2C2825] dark:text-[#E6E1DA] font-serif transition-colors duration-500 relative border-x border-[#EAE5D9] dark:border-[#262320]">
      
      {/* Top Gold Trim */}
      <div className="h-1.5 bg-gradient-to-r from-amber-800 via-yellow-600 to-amber-900" />

      {/* European Editorial Header */}
      <header className="px-6 pt-6 pb-4 space-y-4 border-b border-[#EAE5D9] dark:border-[#262320] sticky top-0 bg-[#FDFBF7]/90 dark:bg-[#121110]/90 backdrop-blur-md z-20">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Feather size={18} className="text-amber-800 dark:text-amber-500" />
            <span className="text-xs tracking-[0.2em] uppercase font-sans font-semibold text-amber-900 dark:text-amber-400">
              Bibliotheque Europe
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

        {/* Live Search */}
        <div className="relative font-sans pt-1">
          <Search className="absolute left-3.5 top-3.5 text-stone-400" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search titles, classical authors, manuscripts..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#F5F1E8] dark:bg-[#1A1816] border border-[#E0DAB7] dark:border-[#2C2825] rounded-none text-xs focus:outline-none focus:border-amber-800 dark:focus:border-amber-500 placeholder-stone-400 transition-all italic text-stone-800 dark:text-stone-100"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </header>

      <main className="px-6 py-6 space-y-8">
        
        {/* Exhibition Spotlight (Hide in Saved Tab) */}
        {currentTab !== 'saved' && (
          <div className="relative overflow-hidden p-6 border border-amber-900/20 dark:border-amber-500/20 bg-[#F4EFE6] dark:bg-[#181614] shadow-sm flex items-center gap-4">
            <div className="space-y-2 relative z-10 flex-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-amber-800/30 text-[9px] font-sans uppercase tracking-widest text-amber-900 dark:text-amber-400">
                <Sparkles size={10} />
                <span>Special Exhibition</span>
              </div>
              <h2 className="text-lg font-semibold leading-snug">
                European Fine Leather Bindings & Illuminated Manuscripts
              </h2>
              <p className="text-xs font-sans text-stone-600 dark:text-stone-400 leading-relaxed">
                Directly curated from antique dealers across Paris, Vienna, Zurich, and London.
              </p>
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-stone-400">
              {currentTab === 'saved' ? 'Saved Collection' : 'Browse Categories'}
            </span>
            {currentTab === 'saved' && (
              <span className="text-xs font-sans text-amber-800 dark:text-amber-400 font-medium">
                {savedItems.length} items saved
              </span>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none font-sans text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 whitespace-nowrap transition-all text-[11px] uppercase tracking-wider ${
                  activeCategory === cat
                    ? 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 font-medium shadow-sm'
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

          {filteredBooks.length === 0 ? (
            <div className="text-center py-16 space-y-3 font-sans border border-dashed border-stone-300 dark:border-stone-800 p-6">
              <BookOpen size={32} className="mx-auto text-stone-400 opacity-50" />
              <p className="text-sm text-stone-500 italic">
                {currentTab === 'saved'
                  ? 'No saved books in your personal library yet.'
                  : 'No classical literature found matching your query.'}
              </p>
              <button
                onClick={() => {
                  setActiveCategory('All')
                  setSearchQuery('')
                  setCurrentTab('library')
                }}
                className="text-xs text-amber-800 dark:text-amber-400 underline uppercase tracking-wider font-semibold"
              >
                View full library
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredBooks.map((book) => {
                const isSaved = savedItems.includes(book.id)
                return (
                  <div
                    key={book.id}
                    className="group relative border border-[#E6E0D2] dark:border-[#282420] p-4 bg-white dark:bg-[#161412] hover:shadow-xl transition-all duration-300 flex gap-4 items-center"
                  >
                    {/* Book Cover Image */}
                    <div 
                      onClick={() => setSelectedBook(book)}
                      className="w-24 h-36 shrink-0 relative overflow-hidden cursor-pointer shadow-md group-hover:shadow-lg transition-all"
                    >
                      <img
                        src={book.coverUrl}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Eye size={20} className="text-white drop-shadow-md" />
                      </div>
                    </div>

                    {/* Book Details */}
                    <div className="flex-1 space-y-1.5 pr-6">
                      <div className="flex items-center gap-2 font-sans">
                        <span className="text-[9px] uppercase tracking-widest text-amber-800 dark:text-amber-500 font-semibold">
                          {book.tag}
                        </span>
                        <div className="flex items-center gap-0.5 text-[10px] text-amber-600 dark:text-amber-400">
                          <Star size={10} className="fill-amber-500 text-amber-500" />
                          <span>{book.rating}</span>
                        </div>
                      </div>

                      <h4 
                        onClick={() => setSelectedBook(book)}
                        className="font-bold text-base leading-tight cursor-pointer hover:text-amber-800 dark:hover:text-amber-400 transition-colors"
                      >
                        {book.title}
                      </h4>

                      <p className="text-xs text-stone-500 dark:text-stone-400 italic">
                        {book.author} — <span className="font-sans text-[10px] uppercase">{book.year}</span>
                      </p>

                      <div className="pt-2 flex items-center justify-between font-sans">
                        <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                          {book.price}
                        </span>
                        <button 
                          onClick={() => setSelectedBook(book)}
                          className="flex items-center gap-1 text-[11px] text-stone-800 dark:text-stone-200 underline underline-offset-4 hover:text-amber-800 dark:hover:text-amber-400 transition-colors"
                        >
                          View Details <ArrowUpRight size={12} />
                        </button>
                      </div>
                    </div>

                    {/* Bookmark Button */}
                    <button
                      onClick={() => toggleSave(book.id)}
                      className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-amber-800 dark:hover:text-amber-400 transition-colors"
                      aria-label="Save Book"
                    >
                      {isSaved ? (
                        <Check size={18} className="text-emerald-700 dark:text-emerald-400" />
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

      {/* Book Detail Modal */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FDFBF7] dark:bg-[#161412] text-[#2C2825] dark:text-[#E6E1DA] max-w-lg w-full p-6 border border-amber-900/30 shadow-2xl relative space-y-5 animate-in fade-in zoom-in duration-200 font-serif">
            
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-4 right-4 p-1 text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
            >
              <X size={20} />
            </button>

            <div className="flex gap-5 items-start">
              <img
                src={selectedBook.coverUrl}
                alt={selectedBook.title}
                className="w-28 h-40 object-cover shadow-lg border border-stone-300 dark:border-stone-700 shrink-0"
              />
              <div className="space-y-2">
                <span className="text-[9px] font-sans uppercase tracking-widest text-amber-800 dark:text-amber-400 font-semibold">
                  {selectedBook.tag} • {selectedBook.category}
                </span>
                <h3 className="text-xl font-bold leading-tight">{selectedBook.title}</h3>
                <p className="text-xs text-stone-500 italic">
                  By {selectedBook.author} ({selectedBook.year})
                </p>
                <div className="flex items-center gap-1 font-sans text-xs text-amber-600 dark:text-amber-400 pt-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <span className="font-semibold">{selectedBook.rating} / 5.0</span>
                  <span className="text-stone-400 text-[10px] ml-2">({selectedBook.location})</span>
                </div>
              </div>
            </div>

            <p className="text-xs font-sans leading-relaxed text-stone-600 dark:text-stone-300 border-t border-b border-[#EAE5D9] dark:border-[#262320] py-3">
              {selectedBook.description}
            </p>

            <div className="flex items-center justify-between font-sans pt-2">
              <div>
                <span className="text-[10px] text-stone-400 block uppercase">Acquisition Price</span>
                <span className="text-xl font-bold text-stone-900 dark:text-stone-100">{selectedBook.price}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleSave(selectedBook.id)}
                  className="px-3 py-2 border border-stone-300 dark:border-stone-700 text-xs flex items-center gap-1.5 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  <Bookmark size={14} />
                  <span>{savedItems.includes(selectedBook.id) ? 'Saved' : 'Save'}</span>
                </button>

                <button
                  onClick={() => {
                    alert(`Request placed for: "${selectedBook.title}". Our curator will contact you.`)
                    setSelectedBook(null)
                  }}
                  className="px-4 py-2 bg-stone-900 text-white dark:bg-amber-600 dark:text-stone-900 text-xs font-semibold flex items-center gap-1.5 hover:opacity-90 transition-opacity"
                >
                  <ShoppingBag size={14} />
                  <span>Reserve Rare Edition</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Classical European Floating Navigation */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-xs px-4">
        <nav className="flex items-center justify-around py-3 px-6 bg-[#2C2825] text-[#FDFBF7] dark:bg-[#FDFBF7] dark:text-[#2C2825] shadow-2xl font-sans">
          <button 
            onClick={() => setCurrentTab('library')}
            className={`flex flex-col items-center gap-1 transition-opacity ${currentTab === 'library' ? 'opacity-100 font-bold' : 'opacity-60 hover:opacity-100'}`}
          >
            <BookOpen size={16} />
            <span className="text-[9px] tracking-widest uppercase">Library</span>
          </button>

          <button 
            onClick={() => setCurrentTab('explore')}
            className={`flex flex-col items-center gap-1 transition-opacity ${currentTab === 'explore' ? 'opacity-100 font-bold' : 'opacity-60 hover:opacity-100'}`}
          >
            <Compass size={16} />
            <span className="text-[9px] tracking-widest uppercase">Explore</span>
          </button>

          <button 
            onClick={() => setCurrentTab('saved')}
            className={`flex flex-col items-center gap-1 transition-opacity relative ${currentTab === 'saved' ? 'opacity-100 font-bold' : 'opacity-60 hover:opacity-100'}`}
          >
            <Bookmark size={16} />
            <span className="text-[9px] tracking-widest uppercase">Saved</span>
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