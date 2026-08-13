"use client";

import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";

export default function SplashScreen(); {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-6 text-center">
      {/* Upper Content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-sm w-full space-y-6">
        <div className="w-24 h-24 bg-indigo-600 dark:bg-indigo-500 rounded-3xl flex items-center justify-center shadow-xl shadow-indigo-500/20 animate-bounce">
          <ShoppingBag className="w-12 h-12 text-white" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Campus <span className="text-indigo-600 dark:text-indigo-400">Market</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            แหล่งซื้อ-ขาย ซื้อต่อของใช้ ของกิน สำหรับนักเรียนนักศึกษาในวิทยาลัย
          </p>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="w-full max-w-sm pb-8">
        <Link
          href="/home"
          className="w-full py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-600/30 active:scale-95 transition flex items-center justify-center gap-2"
        >
          <span>เข้าสู่ตลาดวิทยาลัย</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </main>
  )
}
