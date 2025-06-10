"use client"
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Dashboard() {
  // State for carousel
  const [activeSlide, setActiveSlide] = useState(0);

  // Carousel slides data
  const carouselSlides = [
    {
      title: "Update Materi Bahasa Indonesia Kelas 5A",
      content: "Materi pembelajaran terbaru untuk Bahasa Indonesia Kelas 5A telah ditambahkan. Silakan unduh materi tersebut dan pelajari sebelum pertemuan berikutnya.",
      badge: "Terbaru",
      color: "bg-gradient-to-br from-blue-500 to-blue-600"
    },
    {
      title: "Jadwal Ujian Semester Ganjil",
      content: "Jadwal ujian semester ganjil telah dirilis. Silahkan periksa jadwal dan persiapkan diri untuk mengikuti ujian dengan baik.",
      badge: "Penting",
      color: "bg-gradient-to-br from-purple-500 to-purple-600"
    },
    {
      title: "Workshop Literasi Digital",
      content: "Workshop Literasi Digital akan diselenggarakan pada tanggal 15 Juli 2025. Daftarkan diri Anda untuk meningkatkan kemampuan digital.",
      badge: "Event",
      color: "bg-gradient-to-br from-green-500 to-green-600"
    },
    {
      title: "Pengumuman Libur Nasional",
      content: "Sehubungan dengan hari libur nasional, pembelajaran akan diliburkan pada tanggal 20 Juli 2025. Kegiatan belajar akan dilanjutkan keesokan harinya.",
      badge: "Info",
      color: "bg-gradient-to-br from-orange-500 to-orange-600"
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === carouselSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselSlides.length]);

  // Functions to handle carousel navigation
  const nextSlide = () => {
    setActiveSlide((prev) => (prev === carouselSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? carouselSlides.length - 1 : prev - 1));
  };

  const goToSlide = (slideIndex) => {
    setActiveSlide(slideIndex);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Top Header - Modern Design */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm px-6 py-4 flex items-center justify-between border-b border-blue-100/50 sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <div>
              <h1 className="font-bold text-xl text-blue-900">LOSO</h1>
              <p className="text-xs text-blue-600">Learning System</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-blue-700 font-medium">12:30 WIB</span>
          </div>
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-all">
            <span className="text-white text-sm font-medium">S</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left Column - Info Terbaru and Pembelajaran */}
          <div className="lg:w-2/3 space-y-8">

            {/* Info Terbaru Section - Enhanced Carousel */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-blue-900">Info Terbaru</h2>
                  <p className="text-blue-600 text-sm mt-1">Informasi dan pengumuman terkini</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={prevSlide}
                    className="p-2 rounded-full bg-white shadow-md hover:shadow-lg hover:bg-blue-50 transition-all duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button
                    onClick={nextSlide}
                    className="p-2 rounded-full bg-white shadow-md hover:shadow-lg hover:bg-blue-50 transition-all duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="relative bg-white rounded-2xl shadow-xl border border-blue-100/50 overflow-hidden">
                {/* Carousel container */}
                <div className="relative h-64 overflow-hidden">
                  {carouselSlides.map((slide, index) => (
                    <div
                      key={index}
                      className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out ${
                        index === activeSlide ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
                      }`}
                    >
                      <div className={`${slide.color} h-full w-full relative`}>
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative z-10 p-8 h-full flex flex-col justify-between text-white">
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                                {slide.badge}
                              </span>
                              <div className="flex space-x-1">
                                {carouselSlides.map((_, i) => (
                                  <button
                                    key={i}
                                    onClick={() => goToSlide(i)}
                                    className={`w-2 h-2 rounded-full transition-all ${
                                      i === activeSlide ? "bg-white" : "bg-white/40"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <h3 className="text-xl font-bold mb-3">{slide.title}</h3>
                            <p className="text-sm opacity-90 leading-relaxed">{slide.content}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <button className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-all">
                              Baca Selengkapnya
                            </button>
                            <span className="text-xs opacity-75">
                              {index + 1} dari {carouselSlides.length}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Pembelajaran Section - Enhanced Cards */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-blue-900">Pembelajaran</h2>
                  <p className="text-blue-600 text-sm mt-1">Mata pelajaran yang tersedia</p>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center group">
                  Lihat Semua
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pembelajaran Cards */}
                {[
                  { title: "Bahasa Indonesia Kelas 5A", color: "from-blue-500 to-blue-600", icon: "📚", count: "24 Materi" },
                  { title: "Matematika Kelas 5A", color: "from-purple-500 to-purple-600", icon: "🔢", count: "18 Materi" },
                  { title: "Tematik Kelas 2A", color: "from-green-500 to-green-600", icon: "🌟", count: "32 Materi" },
                  { title: "Bahasa Indonesia Kelas 2A", color: "from-orange-500 to-orange-600", icon: "📖", count: "20 Materi" }
                ].map((item, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div className="bg-white rounded-2xl shadow-lg border border-blue-100/50 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <div className={`bg-gradient-to-br ${item.color} h-40 flex items-center justify-center relative`}>
                        <div className="absolute inset-0 bg-black/5"></div>
                        <div className="relative z-10 text-center">
                          <div className="text-4xl mb-2">{item.icon}</div>
                          <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                            <span className="text-white text-xs font-medium">{item.count}</span>
                          </div>
                        </div>
                        <div className="absolute top-4 right-4">
                          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-semibold text-blue-900 text-center mb-2">{item.title}</h3>
                        <div className="flex justify-center">
                          <button className="text-xs text-blue-600 hover:text-blue-800 font-medium group-hover:underline">
                            Mulai Belajar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Populer and Cari Materi */}
          <div className="lg:w-1/3 space-y-8">

            {/* Populer Section - Enhanced List */}
            <section>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-blue-900">Populer</h2>
                <p className="text-blue-600 text-sm mt-1">Materi yang sering diakses</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100/50 p-6">
                <ul className="space-y-4">
                  {[
                    { title: "Matematika Kelas-5A", views: "1,234", trend: "up" },
                    { title: "Tematik-Kelas 7A", views: "987", trend: "up" },
                    { title: "Bahasa Indonesia Kelas-1A", views: "876", trend: "down" },
                    { title: "Bahasa Inggris Kelas 5A", views: "654", trend: "up" },
                    { title: "Matematika Kelas 1A", views: "543", trend: "up" }
                  ].map((item, index) => (
                    <li key={index} className="group">
                      <a href="#" className="flex items-center justify-between p-3 rounded-xl hover:bg-blue-50 transition-all">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="text-blue-600 text-sm font-bold">{index + 1}</span>
                          </div>
                          <div>
                            <span className="text-blue-900 font-medium group-hover:text-blue-600 transition-colors">
                              {item.title}
                            </span>
                            <div className="flex items-center space-x-2 text-xs text-blue-500 mt-1">
                              <span>{item.views} views</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 ${item.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.trend === 'up' ? "M7 17l9.2-9.2M17 17V7H7" : "M7 7l9.2 9.2M7 7v10h10"} />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Cari Materi Section - Enhanced Search */}
            <section>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-blue-900">Cari Materi</h2>
                <p className="text-blue-600 text-sm mt-1">Temukan materi pembelajaran</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100/50 p-6">
                <div className="relative mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Cari materi, kelas, atau mata pelajaran..."
                    className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/50 backdrop-blur-sm"
                  />
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-blue-700 mb-2">Filter Cepat:</div>
                  <div className="flex flex-wrap gap-2">
                    {["Kelas 1", "Kelas 2", "Kelas 5", "Matematika", "Bahasa", "Tematik"].map((tag, index) => (
                      <button key={index} className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full text-xs font-medium transition-all">
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer - Modern Design */}
        <footer className="mt-16 pt-8 border-t border-blue-100/50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">L</span>
                </div>
                <div>
                  <span className="font-bold text-blue-900">LOSO</span>
                  <span className="text-blue-600 text-sm ml-2">© 2025 Learning System</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">Kebijakan Privasi</a>
              <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">Syarat & Ketentuan</a>
              <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">Bantuan</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
