"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Dashboard() {
  // State for carousel
  const [activeSlide, setActiveSlide] = useState(0);

  // Carousel slides data
  const carouselSlides = [
    {
      title: "Update Materi Bahasa Indonesia Kelas 2A",
      content:
        "Selamat datang di halaman pembelajaran kami. Anda dapat menemukan berbagai informasi dan materi pembelajaran di sini.",
      badge: "Terbaru",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=400&fit=crop",
    },
    {
      title: "Jadwal Ujian Semester Ganjil",
      content:
        "Jadwal ujian semester ganjil telah dirilis. Silahkan periksa jadwal dan persiapkan diri untuk mengikuti ujian dengan baik.",
      badge: "Penting",
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    },
    {
      title: "Workshop Literasi Digital",
      content:
        "Workshop Literasi Digital akan diselenggarakan pada tanggal 15 Juli 2025. Daftarkan diri Anda untuk meningkatkan kemampuan digital.",
      badge: "Event",
      color: "bg-gradient-to-br from-green-500 to-green-600",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop",
    },
    {
      title: "Pengumuman Libur Nasional",
      content:
        "Sehubungan dengan hari libur nasional, pembelajaran akan diliburkan pada tanggal 20 Juli 2025. Kegiatan belajar akan dilanjutkan keesokan harinya.",
      badge: "Info",
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
      image:
        "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=400&fit=crop",
    },
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) =>
        prev === carouselSlides.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselSlides.length]);

  // Functions to handle carousel navigation
  const nextSlide = () => {
    setActiveSlide((prev) =>
      prev === carouselSlides.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setActiveSlide((prev) =>
      prev === 0 ? carouselSlides.length - 1 : prev - 1
    );
  };

  const goToSlide = (slideIndex) => {
    setActiveSlide(slideIndex);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Main Content Area */}
      <div className="p-4 sm:p-6 lg:p-8 max-w-full mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column - Info Terbaru + Pembelajaran */}
          <div className="xl:col-span-8 space-y-6 lg:space-y-8">
            {/* Info Terbaru Section */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">
                Info Terbaru
              </h2>

              <div className="relative bg-white rounded-2xl shadow-xl border border-blue-100/50 overflow-hidden">
                {/* Carousel container */}
                <div className="relative h-60 sm:h-72 lg:h-80 overflow-hidden">
                  {carouselSlides.map((slide, index) => (
                    <div
                      key={index}
                      className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out ${
                        index === activeSlide
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 translate-x-full"
                      }`}
                    >
                      <div className="relative h-full w-full">
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                          <div className="flex items-center justify-between mb-2 sm:mb-3">
                            <span className="px-2 sm:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium">
                              {slide.badge}
                            </span>
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">
                            {slide.title}
                          </h3>
                          <p className="text-xs sm:text-sm opacity-90 leading-relaxed line-clamp-2 sm:line-clamp-none">
                            {slide.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation buttons - Hidden on small screens */}
                <button
                  onClick={prevSlide}
                  className="hidden sm:block absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <button
                  onClick={nextSlide}
                  className="hidden sm:block absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {/* Carousel indicators */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
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
            </section>

            {/* Pembelajaran Section */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">
                Pembelajaran
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Pembelajaran Cards */}
                {[
                  {
                    title: "Matematika Kelas 5A",
                    image:
                      "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=200&fit=crop",
                  },
                  {
                    title: "Tematik Kelas 2A",
                    image:
                      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop",
                  },
                  {
                    title: "Matematika Kelas 2A",
                    image:
                      "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=300&h=200&fit=crop",
                  },
                  {
                    title: "Bahasa Indonesia Kelas 2A",
                    image:
                      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop",
                  },
                ].map((item, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div className="bg-white rounded-xl shadow-lg border border-blue-100/50 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <div className="relative h-32 sm:h-40">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      </div>
                      <div className="p-3 sm:p-4">
                        <h3 className="font-semibold text-black text-center text-sm">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Popular + Search */}
          <div className="xl:col-span-4 space-y-6">
            {/* Popular Section */}
            <section>
              <h2 className="text-xl font-bold text-black mb-4 sm:mb-6">
                Popular
              </h2>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100/50 p-4 sm:p-6">
                <ul className="space-y-3 sm:space-y-4">
                  {[
                    "Bahasa Indonesia Kelas 5A",
                    "Bahasa Indonesia Kelas 2A",
                    "Matematika Kelas 6",
                    "Matematika Kelas 5A",
                  ].map((item, index) => (
                    <li key={index} className="group">
                      <a
                        href="#"
                        className="block p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-all"
                      >
                        <span className="text-gray-900 font-medium group-hover:text-black transition-colors text-sm">
                          {item}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Search Card Section */}
            <section>
              <h2 className="text-xl font-bold text-black mb-4 sm:mb-6">
                Cari Materi
              </h2>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100/50 p-4 sm:p-6">
                <div className="space-y-4">
                  {/* Search Input */}
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <input
                      type="text"
                      placeholder="Cari materi pembelajaran..."
                      className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white/80 text-sm"
                    />
                  </div>

                  {/* Filter Categories */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-700">
                      Kategori:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["Matematika", "Bahasa", "Tematik", "IPA", "IPS"].map(
                        (category) => (
                          <button
                            key={category}
                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-xs font-medium transition-all"
                          >
                            {category}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Grade Level Filter */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-700">
                      Kelas:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Kelas 1",
                        "Kelas 2",
                        "Kelas 3",
                        "Kelas 4",
                        "Kelas 5",
                        "Kelas 6",
                      ].map((grade) => (
                        <button
                          key={grade}
                          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-xs font-medium transition-all"
                        >
                          {grade}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Search Button */}
                  <button className="w-full bg-gradient-to-r from-gray-700 to-gray-800 text-white py-2 sm:py-3 rounded-xl font-medium hover:shadow-lg transition-all text-sm">
                    Cari Materi
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t border-blue-100/50">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <span className="font-bold text-black">Copyright 2023</span>
            </div>
            <div>
              <span className="text-gray-600">versi 1.0.0</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
