"use client"
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function MateriPage() {
  // Navigation breadcrumbs state
  const [activeNav, setActiveNav] = useState('materi');

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

      {/* Breadcrumbs Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex items-center space-x-4 py-3">
            <Link href="/beranda" className="text-gray-500 hover:text-gray-700">Beranda</Link>
            <span className="text-gray-400">/</span>
            <Link href="/materi" className="text-gray-500 hover:text-gray-700">Materi</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-800 font-medium">Informasi</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - BAB Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Bahasa Indonesia Kelas 2A</h1>

              <div className="space-y-8">
                {/* BAB 1 Section */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">BAB 1: Mengenal Huruf dan Kata</h2>

                  {/* Sub-section 1.1 */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">1.1 Membaca Huruf dan Suku Kata</h3>
                    <div className="text-gray-700 space-y-3">
                      <p>
                        Huruf vokal terdiri dari lima macam, yaitu a, i, u, e, dan o. Jika digabungkan dengan
                        huruf lain, huruf-huruf ini membentuk suku kata, seperti ba, bi, bu, be, dan bo.
                      </p>
                      <p>
                        Suku kata bisa digunakan untuk membuat kata utuh seperti "buku" atau "bola".
                      </p>
                    </div>
                  </div>

                  {/* Sub-section 1.2 */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">1.2 Menyusun Huruf Menjadi Kata</h3>
                    <div className="text-gray-700 space-y-3">
                      <p>
                        Huruf-huruf yang tersusun dengan urutan yang benar akan membentuk kata yang
                        memiliki arti. Misalnya, huruf b-u-k-u akan membentuk kata "buku", jika urutannya
                        salah, kata tersebut tidak akan bermakna.
                      </p>
                    </div>
                  </div>

                  {/* Sub-section 1.3 */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">1.3 Menulis Kata dengan Huruf Tegak Bersambung</h3>
                    <div className="text-gray-700 space-y-3">
                      <p>
                        Huruf tegak bersambung adalah huruf yang ditulis sambung menyambung antar
                        hurufnya. Kita bisa menulis kata seperti "rumah", "bunga", dan "ibu" dengan cara
                        menyambung semua hurufnya agar terlihat rapi dan indah.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional BAB placeholders could be added here */}
              </div>
            </div>
          </div>

          {/* Right Column - Updates & Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-5">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Update Materi Bahasa Indonesia Kelas 2A</h2>
                <p className="text-gray-500 text-sm">21 Mei 2025</p>
              </div>

              <div className="space-y-5 text-gray-700">
                <p className="font-medium">Halo Ayah, Bunda, dan Anak-anak hebat Kelas 2A! 👋</p>

                <p>
                  Kami informasikan bahwa materi Bahasa Indonesia untuk Kelas 2A telah diperbarui dan
                  dilengkapi dengan:
                </p>

                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="inline-block bg-green-100 text-green-800 p-1 rounded-sm mr-2">✓</span>
                    <span>Materi ringkas dan mudah dipahami untuk setiap bab</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block bg-green-100 text-green-800 p-1 rounded-sm mr-2">✓</span>
                    <span>Soal pilihan ganda sebagai latihan pemahaman</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block bg-green-100 text-green-800 p-1 rounded-sm mr-2">✓</span>
                    <span>Disusun khusus sesuai tingkat perkembangan anak usia 7-8 tahun</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block bg-green-100 text-green-800 p-1 rounded-sm mr-2">✓</span>
                    <span>Siap cetak dalam format Word untuk belajar di rumah</span>
                  </li>
                </ul>

                <div className="pt-3">
                  <p className="font-medium text-gray-800">🌟 Materi terdiri dari 5 bab utama:</p>
                  <ol className="list-decimal pl-5 pt-2 space-y-1">
                    <li>Mengenal Huruf dan Kata</li>
                    <li>Menyusun Kalimat Sederhana</li>
                    <li>Cerita dan Dongeng Anak</li>
                    <li>Mengenal Teks Percakapan</li>
                    <li>Menulis Cerita Sederhana</li>
                  </ol>
                </div>

                <p className="mt-4">
                  Silakan mengakses materi melalui tautan berikut: <Link href="#" className="text-blue-600 font-medium hover:underline">Klik Disini</Link>
                </p>

                <p className="mt-4">
                  Kami berharap pembaruan ini dapat membantu anak-anak belajar dengan lebih semangat dan
                  menyenangkan. Jangan lupa untuk selalu membaca bersama di rumah ya!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
