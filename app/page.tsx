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
  const [activeCategory, setActiveCategory] = useState('ทั้งหมด')
  const [searchQuery, setSearchQuery] = useState('')
  const [savedItems, setSavedItems] = useState<number[]>([])
  const [currentTab, setCurrentTab] = useState<'library' | 'explore' | 'saved'>('library')
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  const categories = ['ทั้งหมด', 'ต้นฉบับโบราณ', 'ปรัชญา', 'สถาปัตยกรรม', 'วรรณกรรมคลาสสิก', 'ประวัติศาสตร์และวิทยาศาสตร์']

  const books: Book[] = [
    {
      id: 1,
      title: 'ทฤษฎีสถาปัตยกรรมคลาสสิก (De Architectura)',
      author: 'วิทรูเวียส โพลลิโอ (Vitruvius)',
      year: 'ฉบับพิมพ์ปี 1888',
      price: '฿4,600',
      category: 'สถาปัตยกรรม',
      tag: 'คัดสรรโดยคิวเรเตอร์',
      rating: 4.9,
      coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      description: 'ผลงานระดับมาสเตอร์พีซที่รวบรวมทฤษฎีสถาปัตยกรรมโรมัน ความสมดุล สัดส่วนทองคำ และโครงสร้างคลาสสิกของยุโรป',
      location: 'ห้องนิรภัย A-12, กรุงเวียนนา'
    },
    {
      id: 2,
      title: 'การไตร่ตรองปรัชญาดั้งเดิม (Meditations)',
      author: 'เรอเน เดการ์ต (René Descartes)',
      year: 'ฉบับปกหนังปี 1902',
      price: '฿3,250',
      category: 'ปรัชญา',
      tag: 'ของหายาก',
      rating: 4.8,
      coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
      description: 'บทความทางปรัชญาอันเป็นรากฐานความคิดแบบเหตุผลนิยม (Rationalism) อภิปรัชญา และความจริงแท้ของความรู้',
      location: 'หอจดหมายเหตุ 4, กรุงปารีส'
    },
    {
      id: 3,
      title: 'สุขนาฏกรรมเทวดา (The Divine Comedy)',
      author: 'ดันเต อาลีกีเอรี (Dante Alighieri)',
      year: 'ฉบับพิมพ์ฟลอเรนซ์ 1895',
      price: '฿8,000',
      category: 'วรรณกรรมคลาสสิก',
      tag: 'ภาพประกอบโบราณ',
      rating: 5.0,
      coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80',
      description: 'มหากาพย์วรรณกรรมเดินทางผ่านนรก ขุมนรก และสวรรค์ พร้อมภาพพิมพ์แกะสลักไม้โบราณแบบเต็มหน้า',
      location: 'แกลเลอรี 2, เมืองฟลอเรนซ์'
    },
    {
      id: 4,
      title: 'กำเนิดสปีชีส์ (On the Origin of Species)',
      author: 'ชาลส์ ดาร์วิน (Charles Darwin)',
      year: 'ฉบับจำลองปี 1859',
      price: '฿12,900',
      category: 'ประวัติศาสตร์และวิทยาศาสตร์',
      tag: 'เอกสารประวัติศาสตร์',
      rating: 4.9,
      coverUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80',
      description: 'วรรณกรรมทางวิทยาศาสตร์ที่สั่นสะเทือนโลก อธิบายชีววิทยาการวิวัฒนาการและการคัดเลือกโดยธรรมชาติ',
      location: 'ตู้โชว์ 08, กรุงลอนดอน'
    },
    {
      id: 5,
      title: 'เหยื่ออธรรม (Les Misérables ชุด 5 เล่มจบ)',
      author: 'วิกตอร์ อูโก (Victor Hugo)',
      year: 'ฉบับปกหนังปารีส 1862',
      price: '฿17,200',
      category: 'วรรณกรรมคลาสสิก',
      tag: 'สำหรับนักสะสม',
      rating: 5.0,
      coverUrl: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=600&q=80',
      description: 'นวนิยายชุด 5 เล่มขอบทองสมบูรณ์แบบ สะท้อนความศรัทธา กฎหมาย การไถ่บาป และสังคมฝรั่งเศสในศตวรรษที่ 19',
      location: 'ห้องคลัง C, เมืองลียง'
    },
    {
      id: 6,
      title: 'วิพากษ์เหตุผลบริสุทธิ์ (Critique of Pure Reason)',
      author: 'อิมมานูเอล คานท์ (Immanuel Kant)',
      year: 'ฉบับพิมพ์รีกา 1781',
      price: '฿7,400',
      category: 'ปรัชญา',
      tag: 'ฉบับพิมพ์ครั้งแรก',
      rating: 4.7,
      coverUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80',
      description: 'หนังสือปรัชญาชิ้นสำคัญที่วิเคราะห์ขอบเขตปัญญาของมนุษย์ และการรับรู้เชิงทฤษฎีก่อนประสบการณ์',
      location: 'ปีกเคอนิกส์แบร์ก, กรุงเบอร์ลิน'
    },
    {
      id: 7,
      title: 'หลักธรณีวิทยาและบรรพชีวินวิทยา',
      author: 'ชาลส์ ไลเอลล์ (Charles Lyell)',
      year: 'ฉบับพิมพ์ลอนดอน 1838',
      price: '฿6,100',
      category: 'ประวัติศาสตร์และวิทยาศาสตร์',
      tag: 'วิทยาศาสตร์วิกตอเรีย',
      rating: 4.6,
      coverUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
      description: 'ตำราธรณีวิทยายุคบุกเบิกที่วางรากฐานความเข้าใจเรื่องชั้นหินและประวัติศาสตร์ของโลกยุคโบราณ',
      location: 'แผนก 14, เมืองเอดินบะระ'
    },
    {
      id: 8,
      title: 'คัดสรรต้นฉบับเรอเนซองส์ลงเขียนด้วยมือ',
      author: 'อารามนักบุญกัลล์ (Saint Gall)',
      year: 'คัดลอกด้วยมือปี 1480',
      price: '฿48,000',
      category: 'ต้นฉบับโบราณ',
      tag: 'ระดับพิพิธภัณฑ์',
      rating: 5.0,
      coverUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80',
      description: 'ต้นฉบับหนังแกะอันทรงคุณค่า ประดับด้วยการปิดทองคำแท้ ตัวอักษรละติน และลายพฤกษศาสตร์อันปราณีต',
      location: 'ตู้นิรภัยความปลอดภัยสูง, กรุงซูริก'
    },
  ]

  const toggleSave = (id: number) => {
    setSavedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    )
  }

  // ระบบกรองหนังสือ
  const filteredBooks = books.filter((book) => {
    const matchesCategory = activeCategory === 'ทั้งหมด' || book.category === activeCategory
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = currentTab === 'saved' ? savedItems.includes(book.id) : true

    return matchesCategory && matchesSearch && matchesTab
  })

  return (
    <div className="min-h-screen pb-32 max-w-xl mx-auto bg-[#FDFBF7] dark:bg-[#121110] text-[#2C2825] dark:text-[#E6E1DA] font-serif transition-colors duration-500 relative border-x border-[#EAE5D9] dark:border-[#262320]">
      
      {/* เส้นขอบทองด้านบน */}
      <div className="h-1.5 bg-gradient-to-r from-amber-800 via-yellow-600 to-amber-900" />

      {/* ส่วนหัวสไตล์นิตยสารยุโรปโบราณ */}
      <header className="px-6 pt-6 pb-4 space-y-4 border-b border-[#EAE5D9] dark:border-[#262320] sticky top-0 bg-[#FDFBF7]/90 dark:bg-[#121110]/90 backdrop-blur-md z-20">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Feather size={18} className="text-amber-800 dark:text-amber-500" />
            <span className="text-xs tracking-[0.2em] uppercase font-sans font-semibold text-amber-900 dark:text-amber-400">
              Bibliothèque Europe
            </span>
          </div>
          <ThemeToggle />
        </div>

        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold tracking-wide italic font-serif text-stone-900 dark:text-stone-100">
            L&apos;Atelier du Livre
          </h1>
          <p className="text-[11px] font-sans tracking-widest uppercase text-stone-500 dark:text-stone-400">
            ตลาดหนังสือโบราณและวรรณกรรมคลาสสิกแห่งยุโรป
          </p>
        </div>

        {/* ช่องค้นหา */}
        <div className="relative font-sans pt-1">
          <Search className="absolute left-3.5 top-3.5 text-stone-400" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาชื่อหนังสือ, นักเขียน, ต้นฉบับโบราณ..."
            className="w-full pl-10 pr-8 py-2.5 bg-[#F5F1E8] dark:bg-[#1A1816] border border-[#E0DAB7] dark:border-[#2C2825] rounded-none text-xs focus:outline-none focus:border-amber-800 dark:focus:border-amber-500 placeholder-stone-400 transition-all italic text-stone-800 dark:text-stone-100"
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
        
        {/* แบนเนอร์นิทรรศการพิเศษ (ซ่อนเมื่ออยู่แท็บ บันทึกแล้ว) */}
        {currentTab !== 'saved' && (
          <div className="relative overflow-hidden p-6 border border-amber-900/20 dark:border-amber-500/20 bg-[#F4EFE6] dark:bg-[#181614] shadow-sm flex items-center gap-4">
            <div className="space-y-2 relative z-10 flex-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-amber-800/30 text-[9px] font-sans uppercase tracking-widest text-amber-900 dark:text-amber-400">
                <Sparkles size={10} />
                <span>นิทรรศการพิเศษ</span>
              </div>
              <h2 className="text-lg font-semibold leading-snug">
                หนังสือปกหนังและเอกสารวิจิตรยุโรป ศตวรรษที่ 19
              </h2>
              <p className="text-xs font-sans text-stone-600 dark:text-stone-400 leading-relaxed">
                คัดสรรโดยตรงจากผู้เชี่ยวชาญหนังสือโบราณในปารีส เวียนนา ซูริก และลอนดอน
              </p>
            </div>
          </div>
        )}

        {/* ตัวเลือกหมวดหมู่ */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-stone-400">
              {currentTab === 'saved' ? 'รายการที่บันทึกไว้' : 'เลือกหมวดหมู่หนังสือ'}
            </span>
            {currentTab === 'saved' && (
              <span className="text-xs font-sans text-amber-800 dark:text-amber-400 font-medium">
                บันทึกไว้ {savedItems.length} เล่ม
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

        {/* รายการหนังสือ */}
        <div className="space-y-6">
          <div className="flex justify-between items-baseline border-b border-[#EAE5D9] dark:border-[#262320] pb-2">
            <h3 className="text-sm font-sans tracking-widest uppercase text-stone-500">
              แคตตาล็อก ({filteredBooks.length})
            </h3>
          </div>

          {filteredBooks.length === 0 ? (
            <div className="text-center py-16 space-y-3 font-sans border border-dashed border-stone-300 dark:border-stone-800 p-6">
              <BookOpen size={32} className="mx-auto text-stone-400 opacity-50" />
              <p className="text-sm text-stone-500 italic">
                {currentTab === 'saved'
                  ? 'ยังไม่มีรายการหนังสือที่คุณบันทึกไว้'
                  : 'ไม่พบรายการหนังสือที่คุณค้นหา'}
              </p>
              <button
                onClick={() => {
                  setActiveCategory('ทั้งหมด')
                  setSearchQuery('')
                  setCurrentTab('library')
                }}
                className="text-xs text-amber-800 dark:text-amber-400 underline uppercase tracking-wider font-semibold"
              >
                ดูหนังสือทั้งหมด
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
                    {/* รูปปกหนังสือ */}
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

                    {/* รายละเอียดหนังสือ */}
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
                          ดูรายละเอียด <ArrowUpRight size={12} />
                        </button>
                      </div>
                    </div>

                    {/* ปุ่มบันทึก */}
                    <button
                      onClick={() => toggleSave(book.id)}
                      className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-amber-800 dark:hover:text-amber-400 transition-colors"
                      aria-label="บันทึกหนังสือ"
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

      {/* ป๊อบอัพรายละเอียดหนังสือ (Modal) */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FDFBF7] dark:bg-[#161412] text-[#2C2825] dark:text-[#E6E1DA] max-w-lg w-full p-6 border border-amber-900/30 shadow-2xl relative space-y-5 animate-in fade-in zoom-in duration-200 font-serif">
            
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
                  ผู้แต่ง: {selectedBook.author} ({selectedBook.year})
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
                <span className="text-[10px] text-stone-400 block uppercase">ราคาประเมิน</span>
                <span className="text-xl font-bold text-stone-900 dark:text-stone-100">{selectedBook.price}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleSave(selectedBook.id)}
                  className="px-3 py-2 border border-stone-300 dark:border-stone-700 text-xs flex items-center gap-1.5 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  <Bookmark size={14} />
                  <span>{savedItems.includes(selectedBook.id) ? 'บันทึกแล้ว' : 'บันทึก'}</span>
                </button>

                <button
                  onClick={() => {
                    alert(`จองสำเร็จ! เจ้าหน้าที่คิวเรเตอร์จะติดต่อกลับเกี่ยวกับรายการ: "${selectedBook.title}"`)
                    setSelectedBook(null)
                  }}
                  className="px-4 py-2 bg-stone-900 text-white dark:bg-amber-600 dark:text-stone-900 text-xs font-semibold flex items-center gap-1.5 hover:opacity-90 transition-opacity"
                >
                  <ShoppingBag size={14} />
                  <span>จองสะสมหนังสือ</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* แถบเมนูด้านล่าง (Navigation Dock) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-xs px-4">
        <nav className="flex items-center justify-around py-3 px-6 bg-[#2C2825] text-[#FDFBF7] dark:bg-[#FDFBF7] dark:text-[#2C2825] shadow-2xl font-sans">
          <button 
            onClick={() => setCurrentTab('library')}
            className={`flex flex-col items-center gap-1 transition-opacity ${currentTab === 'library' ? 'opacity-100 font-bold' : 'opacity-60 hover:opacity-100'}`}
          >
            <BookOpen size={16} />
            <span className="text-[9px] tracking-widest uppercase">หน้าแรก</span>
          </button>

          <button 
            onClick={() => setCurrentTab('explore')}
            className={`flex flex-col items-center gap-1 transition-opacity ${currentTab === 'explore' ? 'opacity-100 font-bold' : 'opacity-60 hover:opacity-100'}`}
          >
            <Compass size={16} />
            <span className="text-[9px] tracking-widest uppercase">สำรวจ</span>
          </button>

          <button 
            onClick={() => setCurrentTab('saved')}
            className={`flex flex-col items-center gap-1 transition-opacity relative ${currentTab === 'saved' ? 'opacity-100 font-bold' : 'opacity-60 hover:opacity-100'}`}
          >
            <Bookmark size={16} />
            <span className="text-[9px] tracking-widest uppercase">บันทึกแล้ว</span>
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