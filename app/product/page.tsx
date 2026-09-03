'use client'

import { useState, useRef, ChangeEvent, FormEvent } from 'react'
import Link from 'next/link'
import { ArrowLeft, Upload, CheckCircle2, X, Image as ImageIcon } from 'lucide-react'

export default function AddProductPage() {
  const [submitted, setSubmitted] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: 'หนังสือ',
    condition: 'มือสองสภาพดี',
    description: '',
    seller: '',
    major: ''
  })

  // จัดการการอัปโหลดและแสดงตัวอย่างรูปภาพ
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('ขนาดไฟล์ต้องไม่เกิน 5MB')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // ตรงนี้สามารถเพิ่ม logic ส่งข้อมูลไปยัง API / Database ได้
    setSubmitted(true)
  }

  const handleReset = () => {
    setFormData({
      title: '',
      price: '',
      category: 'หนังสือ',
      condition: 'มือสองสภาพดี',
      description: '',
      seller: '',
      major: ''
    })
    setImagePreview(null)
    setSubmitted(false)
  }

  return (
    <div className="min-h-screen max-w-md mx-auto bg-slate-50 dark:bg-slate-950 border-x border-slate-200 dark:border-slate-800 pb-10">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
        <Link
          href="/"
          className="p-2 rounded-xl bg-slate-200/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">ลงประกาศขายสินค้า</h1>
      </header>

      <main className="p-4">
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
            <CheckCircle2 size={64} className="text-emerald-500 animate-bounce" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">ลงประกาศสำเร็จ!</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs">
              สินค้าของคุณถูกลงประกาศในระบบเรียบร้อยแล้ว เพื่อนๆ ในวิทยาลัยสามารถเข้ามาดูได้ทันที
            </p>
            <div className="flex gap-3 pt-4 w-full">
              <button
                onClick={handleReset}
                className="flex-1 py-3 rounded-xl border border-slate-300 dark:border-slate-700 font-medium text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                ลงประกาศเพิ่ม
              </button>
              <Link
                href="/"
                className="flex-1 py-3 rounded-xl bg-indigo-600 text-white text-center font-medium text-sm hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/20"
              >
                กลับสู่หน้าหลัก
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Image Upload Box */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                รูปภาพสินค้า
              </label>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleImageChange}
                className="hidden"
              />

              {imagePreview ? (
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 h-48 group">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-center flex flex-col items-center justify-center bg-white dark:bg-slate-900 cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 transition"
                >
                  <Upload size={32} className="text-slate-400 mb-2" />
                  <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                    คลิกเพื่ออัปโหลดรูปภาพ
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1">รองรับ JPG, PNG (สูงสุด 5MB)</span>
                </div>
              )}
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                ชื่อสินค้า
              </label>
              <input
                type="text"
                required
                placeholder="เช่น หนังสือเรียน, เครื่องคิดเลข..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
              />
            </div>

            {/* Price & Category */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  ราคา (บาท)
                </label>
                <input
                  type="number"
                  required
                  placeholder="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  หมวดหมู่
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
                >
                  <option value="หนังสือ">หนังสือ</option>
                  <option value="ไอที/อุปกรณ์">ไอที/อุปกรณ์</option>
                  <option value="เสื้อผ้า/เครื่องแต่งกาย">เสื้อผ้า</option>
                  <option value="อุปกรณ์เรียน">อุปกรณ์เรียน</option>
                  <option value="เครื่องใช้ไฟฟ้า">เครื่องใช้ไฟฟ้า</option>
                  <option value="อื่นๆ">อื่นๆ</option>
                </select>
              </div>
            </div>

            {/* Condition */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                สภาพสินค้า
              </label>
              <select
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                className="w-full p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
              >
                <option value="ของใหม่">ของใหม่</option>
                <option value="มือสองสภาพดี">มือสองสภาพดี</option>
                <option value="มือสอง">มือสอง</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                รายละเอียดสินค้า
              </label>
              <textarea
                rows={3}
                placeholder="อธิบายรายละเอียด สภาพ ตำหนิ หรือสถานที่นัดรับ..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
              />
            </div>

            {/* Seller Information */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">ข้อมูลผู้ขาย</h3>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="ชื่อผู้ขาย/ชื่อเล่น"
                  value={formData.seller}
                  onChange={(e) => setFormData({ ...formData, seller: e.target.value })}
                  className="w-full p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
                />
                <input
                  type="text"
                  required
                  placeholder="สาขา/ชั้นปี"
                  value={formData.major}
                  onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                  className="w-full p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base shadow-lg shadow-indigo-600/30 transition active:scale-95"
            >
              โพสต์ประกาศขาย
            </button>
          </form>
        )}
      </main>
    </div>
  )
}