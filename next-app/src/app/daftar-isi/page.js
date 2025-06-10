"use client"
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function DaftarIsi() {
  const [activeTab, setActiveTab] = useState('bahasa-indonesia');

  // Data struktur konten untuk Bahasa Indonesia Kelas 2A
  const bahasaIndonesiaContent = [
    {
      bab: "BAB 1",
      title: "Mengenal Huruf dan Kata",
      subTopics: [
        "1. Huruf Vokal dan Konsonan",
        "2. Membaca Kata Sederhana",
        "3. Menuliskan Kata-kata Baru",
        "4. Membentuk Kata dari Huruf"
      ]
    },
    {
      bab: "BAB 2",
      title: "Menyusun Kalimat Sederhana",
      subTopics: [
        "1. Mengenal Struktur Kalimat",
        "2. Membuat Kalimat dari Kata",
        "3. Kalimat Tanya dan Perintah"
      ]
    },
    {
      bab: "BAB 3",
      title: "Cerita dan Dongeng Anak",
      subTopics: [
        "1. Dongeng Binatang",
        "2. Mendengarkan Cerita",
        "3. Menceritakan Kembali",
        "4. Pesan Moral dalam Cerita"
      ]
    },
    {
      bab: "BAB 4",
      title: "Mengenal Teks Percakapan",
      subTopics: [
        "1. Membaca Percakapan",
        "2. Menirukan Dialog",
        "3. Membuat Percakapan Sederhana"
      ]
    },
    {
      bab: "BAB 5",
      title: "Menulis Cerita Sederhana",
      subTopics: [
        "1. Mendeskripsikan Benda",
        "2. Menulis Pengalaman",
        "3. Menyusun Cerita Bergambar"
      ]
    }
  ];

  // Data untuk bagian Popular
  const popularItems = [
    "Bahasa Indonesia Kelas 5A",
    "Matematika Kelas 5A",
    "Bahasa Indonesia Kelas 2A",
    "Matematika Kelas 2A",
    "IPS Kelas 2A",
    "Kognitif Kelas 1B"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header - Reuse the same header from your main page */}
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
                  ${item.name === 'materi'
                    ? 'bg-gray-100 text-black font-medium shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-black'
                  }`}
              >
                <span className="text-base">{item.icon}</span>
                <span className={item.name === 'materi' ? "font-medium" : ""}>{item.label}</span>
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

      {/* Main Content Area - Table of Contents Structure */}
      <div className="p-8 max-w-full mx-auto">
        <div className="grid grid-cols-12 gap-8">

          {/* Main Column - Daftar Isi Bahasa Indonesia */}
          <div className="col-span-9">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-4xl font-bold text-black tracking-tight">Bahasa Indonesia Kelas 2A</h2>
              <button
                className="px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-base font-medium shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
                Latihan Soal
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-blue-100/50 p-10">
              <div className="space-y-12">
                {bahasaIndonesiaContent.map((bab, index) => (
                  <div key={index} className="border-b border-gray-100 last:border-0 pb-10 last:pb-0">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-8">
                        <div className="bg-blue-50 text-blue-600 font-bold text-2xl px-5 py-3 rounded-lg shadow-sm">
                          {bab.bab}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-2xl text-black mb-5">{bab.title}</h3>
                        <ul className="space-y-4">
                          {bab.subTopics.map((topic, i) => (
                            <li key={i} className="text-gray-800 text-lg">
                              <Link href="#" className="flex items-center hover:text-blue-600 transition-colors group">
                                <span className="mr-3 text-blue-500 group-hover:translate-x-1 transition-transform">→</span>
                                <span className="font-medium">{topic}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 text-right text-sm text-gray-500">
              Copyright 2023
            </div>
          </div>

          {/* Right Column - Popular + Sidebar */}
          <div className="col-span-3 space-y-8">
            {/* Popular Section */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-6">Populer</h2>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100/50 p-6">
                <ul className="space-y-4">
                  {popularItems.map((item, index) => (
                    <li key={index} className="group">
                      <Link href="#" className="block p-3 rounded-lg hover:bg-gray-50 transition-all">
                        <span className="text-gray-900 text-base font-medium group-hover:text-black transition-colors">
                          {item}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Cari Materi */}
            <div className="text-center">
              <button className="w-full px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-xl font-medium hover:shadow-lg transition-all">
                🔍 Cari Materi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
