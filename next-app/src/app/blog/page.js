"use client"
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function BlogPage() {
  // Navigation breadcrumbs state
  const [activeNav, setActiveNav] = useState('blog');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm px-6 py-3 border-b border-blue-100/50 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <div className="w-10 h-10 relative overflow-hidden rounded-xl">
              <Image
                src="/logo.png"
                alt="LOSO Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="ml-3">
              <h1 className="font-bold text-xl text-black">LOSO</h1>
            </div>
          </div>

          {/* Centered Navigation */}
          <nav className="flex space-x-8 justify-center">
            {[
              { name: 'beranda', label: 'Beranda', icon: '🏠' },
              { name: 'materi', label: 'Materi', icon: '📚' },
              { name: 'blog', label: 'Blog', icon: '📝' },
              { name: 'registrasi', label: 'Registrasi', icon: '📋' }
            ].map((item) => (
              <button
                key={item.name}
                className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-all duration-300
                  ${item.name === activeNav
                    ? 'bg-gray-100 text-black font-medium shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-black'
                  }`}
                onClick={() => setActiveNav(item.name)}
              >
                <span className="text-base">{item.icon}</span>
                <span className={item.name === activeNav ? "font-medium" : ""}>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Search */}
          <div className="relative w-10">
            <button
              className="flex h-10 w-10 bg-gray-100 hover:bg-gray-200 rounded-full items-center justify-center transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Simplified Single Column */}
      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Blog Header - Simplified */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Update Materi Bahasa Indonesia Kelas 2A</h1>
            <p className="text-gray-600">21 Mei 2025</p>
          </div>

          {/* Blog Content - Simplified */}
          <div className="prose max-w-none text-gray-700">
            <p className="font-medium mb-4">
              Halo Ayah, Bunda, dan Anak-anak hebat Kelas 2A! 👋
            </p>

            <p className="mb-6">
              Kami informasikan bahwa materi Bahasa Indonesia untuk Kelas 2A telah diperbarui dan
              dilengkapi dengan:
            </p>

            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-green-100 text-green-700 w-5 h-5 rounded mr-2 flex-shrink-0">✓</span>
                <span>Materi ringkas dan mudah dipahami untuk setiap bab</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-green-100 text-green-700 w-5 h-5 rounded mr-2 flex-shrink-0">✓</span>
                <span>Soal pilihan ganda sebagai latihan pemahaman</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-green-100 text-green-700 w-5 h-5 rounded mr-2 flex-shrink-0">✓</span>
                <span>Disusun khusus sesuai tingkat perkembangan anak usia 7-8 tahun</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-green-100 text-green-700 w-5 h-5 rounded mr-2 flex-shrink-0">✓</span>
                <span>Siap cetak dalam format Word untuk belajar di rumah</span>
              </li>
            </ul>

            <p className="font-medium text-amber-700 mb-2">🌟 Materi terdiri dari 5 bab utama:</p>
            <ol className="list-decimal pl-6 mb-6 space-y-1">
              <li>Mengenal Huruf dan Kata</li>
              <li>Menyusun Kalimat Sederhana</li>
              <li>Cerita dan Dongeng Anak</li>
              <li>Mengenal Teks Percakapan</li>
              <li>Menulis Cerita Sederhana</li>
            </ol>

            <p className="mb-4">
              Silakan mengakses materi melalui tautan berikut: <a href="#" className="text-blue-600 font-medium hover:underline">Klik Disini</a>
            </p>

            <p className="mb-2">
              Kami berharap pembaruan ini dapat membantu anak-anak belajar dengan lebih semangat dan
              menyenangkan. Jangan lupa untuk selalu membaca bersama di rumah ya!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
