"use client"
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SearchPage() {
  // Navigation breadcrumbs state
  const [activeNav, setActiveNav] = useState('beranda');

  // Sample search query and results
  const searchQuery = "Dongeng Anak";

  // Sample search results
  const searchResults = [
    {
      id: "3.1",
      title: "Mengenal Cerita Bergambar",
      bab: "Bab I:",
      kelas: "Bahasa Indonesia Kelas 2A",
      link: "/materi/bahasa-indonesia/kelas-2a/bab-1"
    },
    {
      id: "3.2",
      title: "Mendengarkan dan Menceritakan Kembali",
      bab: "Bab II:",
      kelas: "Bahasa Indonesia Kelas 2A",
      link: "/materi/bahasa-indonesia/kelas-2a/bab-2"
    },
    {
      id: "3.3",
      title: "Menjawab Pertanyaan dari Cerita",
      bab: "Bab I:",
      kelas: "Bahasa Indonesia Kelas 2A",
      link: "/materi/bahasa-indonesia/kelas-2a/bab-1"
    }
  ];

  // Popular subjects
  const popularSubjects = [
    "Bahasa Indonesia Kelas 4B",
    "Jumlah Kata 5A",
    "Bahasa Inggris Kelas 2A",
    "Matematika Kelas 5A",
    "IPA Kelas 3A",
    "Geografi Kelas 5A"
  ];

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
              { name: 'informasi', label: 'Informasi', icon: 'ℹ️' },
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

      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Search Results Column */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Hasil Pencarian</h2>
                <p className="text-xl text-gray-600">Kata kunci: <span className="font-semibold text-blue-600">"{searchQuery}"</span></p>
              </div>

              <div className="space-y-8">
                {searchResults.map((result) => (
                  <div key={result.id}
                       className="border-b border-gray-200 pb-8 last:border-0 last:pb-0 hover:bg-blue-50 rounded-lg p-4 -mx-4 transition-colors">
                    <Link href={result.link} className="group block">
                      <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-blue-600 mb-2">
                        <span className="font-bold">{result.id}</span> {result.title}
                      </h3>
                      <p className="text-gray-600 text-lg">
                        <span className="font-medium">{result.bab}</span> {result.kelas}
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="md:col-span-1">
            {/* Popular Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-5">Populer</h3>
              <ul className="space-y-3">
                {popularSubjects.map((subject, index) => (
                  <li key={index} className="text-gray-600 hover:text-blue-600 transition-colors">
                    <Link href="#" className="block py-2 text-lg hover:font-medium">
                      {subject}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Search Box */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Cari Materi</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Dongeng Anak..."
                  className="w-full px-5 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="absolute right-3 top-3 text-gray-500 hover:text-blue-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
