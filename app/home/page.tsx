'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Search, Plus, Moon, Sun, Tag, Store, Clock } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  seller: string;
  time: string;
  image: string;
  tag: string;
}

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'หนังสือเรียน เทคโนโลยีสารสนเทศ ปวส.2',
    price: 150,
    category: 'หนังสือ/ตำรา',
    seller: 'กิตติศักดิ์ แผนกเทคโนโลยีสารสนเทศ',
    time: '10 นาทีที่แล้ว',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60',
    tag: 'สภาพดี',
  },
  {
    id: 2,
    name: 'หูฟังบลูทูธไร้สาย เสียงดี เบสแน่น',
    price: 390,
    category: 'ไอที/อุปกรณ์เสริม',
    seller: 'นารีรัตน์ แผนกการตลาด',
    time: '45 นาทีที่แล้ว',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
    tag: 'พร้อมส่ง',
  },
  {
    id: 3,
    name: 'เสื้อช็อปอาชีวะ ไซส์ L ของแท้ สภาพ 95%',
    price: 250,
    category: 'เครื่องแต่งกาย',
    seller: 'ธีรภัทร แผนกช่างกล',
    time: '2 ชม. ที่แล้ว',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=60',
    tag: 'มือสอง',
  },
  {
    id: 4,
    name: 'เครื่องคิดเลขวิทยาศาสตร์ Casio FX-991EX',
    price: 550,
    category: 'อุปกรณ์การเรียน',
    seller: 'ปิยะวัฒน์ แผนกบัญชี',
    time: '5 ชม. ที่แล้ว',
    image: 'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e488?w=500&auto=format&fit=crop&q=60',
    tag: 'ประกันเหลือ',
  },
  {
    id: 5,
    name: 'กระเป๋าเป้สะพายหลัง ใส่โน้ตบุ๊ก 15 นิ้ว',
    price: 320,
    category: 'กระเป๋า/แฟชั่น',
    seller: 'ชลธิชา แผนกออกแบบ',
    time: '1 วันที่แล้ว',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60',
    tag: 'ส่งฟรีในวิทยาลัย',
  },
];

export default function HomePage() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');

  useEffect(() => {
    setMounted(true);
  }, []);

  const categories = ['ทั้งหมด', 'หนังสือ/ตำรา', 'ไอที/อุปกรณ์เสริม', 'เครื่องแต่งกาย', 'อุปกรณ์การเรียน'];

  const filteredProducts = SAMPLE_PRODUCTS.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ทั้งหมด' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pb-24 md:pb-12 max-w-md md:max-w-4xl mx-auto border-x border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 px-4 py-3">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Store className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <h1 className="font-bold text-lg text-slate-800 dark:text-slate-100">College Market</h1>
          </div>

          {mounted ? (
            <button
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all hover:ring-2 ring-indigo-500 active:scale-95"
              aria-label="Toggle Theme"
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>
          ) : (
            <div className="w-9 h-9" />
          )}
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="ค้นหาสินค้า, อุปกรณ์เรียน..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-100 dark:bg-slate-800/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-transparent dark:border-slate-700 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content Feed */}
      <main className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            สินค้ามาใหม่ ({filteredProducts.length})
          </h2>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 bg-slate-900/70 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded-full">
                  {product.category}
                </span>
                <span className="absolute bottom-2 right-2 bg-indigo-600 text-white font-bold text-xs px-2.5 py-1 rounded-lg shadow-sm">
                  ฿{product.price.toLocaleString()}
                </span>
              </div>

              <div className="p-3">
                <div className="flex items-center gap-1 text-[11px] text-indigo-600 dark:text-indigo-400 mb-1 font-medium">
                  <Tag className="w-3 h-3" />
                  {product.tag}
                </div>
                <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-100 line-clamp-1">
                  {product.name}
                </h3>

                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="truncate max-w-[150px]">{product.seller}</span>
                  <span className="flex items-center gap-1 shrink-0">
                    <Clock className="w-3 h-3" /> {product.time}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* FAB Add Button */}
      <div className="fixed bottom-6 right-6 md:right-auto md:max-w-4xl z-30">
        <Link
          href="/product"
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium px-4 py-3 rounded-full shadow-lg shadow-indigo-500/30 transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" />
          <span className="text-sm font-semibold">ลงขายสินค้า</span>
        </Link>
      </div>
    </div>
  );
}