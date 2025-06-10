"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function MateriPage() {
  const [activeSection, setActiveSection] = useState(null);

  // Toggle section visibility
  const toggleSection = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Main Content */}
      <div className="p-4 sm:p-6 lg:p-8 max-w-full mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column - Main Content */}
          <div className="xl:col-span-8">
            <div className="bg-white rounded-2xl shadow-xl border border-blue-100/50 p-4 sm:p-6 lg:p-8">
              {/* Header */}
              <div className="mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Bahasa Indonesia Kelas 2A
                  </h1>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                      Kelas 2A
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm sm:text-base">
                  Pelajari dasar-dasar bahasa Indonesia dengan materi yang mudah
                  dipahami
                </p>
              </div>

              <div className="space-y-6">
                {/* BAB 1 Section */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleSection("bab1")}
                    className="w-full p-4 sm:p-6 bg-gray-50 hover:bg-gray-100 transition-all duration-200 text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
                          BAB 1: Mengenal Huruf dan Kata
                        </h2>
                        <p className="text-sm text-gray-600">
                          3 Sub-bab • 45 menit
                        </p>
                      </div>
                      <svg
                        className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                          activeSection === "bab1" ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>

                  {activeSection === "bab1" && (
                    <div className="p-4 sm:p-6 space-y-6">
                      {/* Sub-section 1.1 */}
                      <div className="border-l-4 border-blue-400 pl-4 sm:pl-6">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">
                          1.1 Membaca Huruf dan Suku Kata
                        </h3>
                        <div className="text-gray-700 space-y-3 text-sm sm:text-base">
                          <p>
                            Huruf vokal terdiri dari lima macam, yaitu a, i, u,
                            e, dan o. Jika digabungkan dengan huruf lain,
                            huruf-huruf ini membentuk suku kata, seperti ba, bi,
                            bu, be, dan bo.
                          </p>
                          <p>
                            Suku kata bisa digunakan untuk membuat kata utuh
                            seperti "buku" atau "bola".
                          </p>
                          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                            <h4 className="font-medium text-blue-800 mb-2">
                              Contoh:
                            </h4>
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center">
                              {["ba", "bi", "bu", "be", "bo"].map(
                                (suku, index) => (
                                  <div
                                    key={index}
                                    className="p-2 bg-white rounded border text-blue-700 font-medium"
                                  >
                                    {suku}
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Sub-section 1.2 */}
                      <div className="border-l-4 border-green-400 pl-4 sm:pl-6">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">
                          1.2 Menyusun Huruf Menjadi Kata
                        </h3>
                        <div className="text-gray-700 space-y-3 text-sm sm:text-base">
                          <p>
                            Huruf-huruf yang tersusun dengan urutan yang benar
                            akan membentuk kata yang memiliki arti. Misalnya,
                            huruf b-u-k-u akan membentuk kata "buku", jika
                            urutannya salah, kata tersebut tidak akan bermakna.
                          </p>
                          <div className="mt-4 p-3 bg-green-50 rounded-lg">
                            <h4 className="font-medium text-green-800 mb-2">
                              Latihan:
                            </h4>
                            <div className="space-y-2">
                              <div className="flex flex-wrap gap-2 items-center">
                                <span className="text-green-700">
                                  b + u + k + u =
                                </span>
                                <span className="px-3 py-1 bg-white rounded border font-medium">
                                  buku
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Sub-section 1.3 */}
                      <div className="border-l-4 border-purple-400 pl-4 sm:pl-6">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">
                          1.3 Menulis Kata dengan Huruf Tegak Bersambung
                        </h3>
                        <div className="text-gray-700 space-y-3 text-sm sm:text-base">
                          <p>
                            Huruf tegak bersambung adalah huruf yang ditulis
                            sambung menyambung antar hurufnya. Kita bisa menulis
                            kata seperti "rumah", "bunga", dan "ibu" dengan cara
                            menyambung semua hurufnya agar terlihat rapi dan
                            indah.
                          </p>
                          <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                            <h4 className="font-medium text-purple-800 mb-2">
                              Tips Menulis:
                            </h4>
                            <ul className="list-disc list-inside space-y-1 text-purple-700">
                              <li>Mulai dari kiri ke kanan</li>
                              <li>Sambungkan setiap huruf dengan rapi</li>
                              <li>Jaga jarak antar kata</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* BAB 2 Section (Preview) */}
                <div className="border border-gray-200 rounded-xl overflow-hidden opacity-60">
                  <div className="p-4 sm:p-6 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
                          BAB 2: Membaca Kalimat Sederhana
                        </h2>
                        <p className="text-sm text-gray-600">Segera hadir</p>
                      </div>
                      <span className="px-3 py-1 bg-gray-200 text-gray-500 rounded-full text-xs font-medium">
                        Terkunci
                      </span>
                    </div>
                  </div>
                </div>

                {/* BAB 3 Section (Preview) */}
                <div className="border border-gray-200 rounded-xl overflow-hidden opacity-60">
                  <div className="p-4 sm:p-6 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
                          BAB 3: Menulis Cerita Pendek
                        </h2>
                        <p className="text-sm text-gray-600">Segera hadir</p>
                      </div>
                      <span className="px-3 py-1 bg-gray-200 text-gray-500 rounded-full text-xs font-medium">
                        Terkunci
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 sm:mt-12 pt-6 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-center text-sm space-y-2 sm:space-y-0">
                  <div className="text-gray-500">
                    © 2023 Learning Management System
                  </div>
                  <div className="text-gray-500">Bahasa Indonesia Kelas 2A</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="xl:col-span-4 space-y-6">
            {/* Soal Latihan Section */}
            <section>
              <h2 className="text-xl font-bold text-black mb-4 sm:mb-6">
                Soal Latihan
              </h2>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100/50 p-4 sm:p-6">
                <div className="space-y-4">
                  {[
                    {
                      title: "Latihan Mengenal Huruf",
                      description: "10 soal pilihan ganda",
                      difficulty: "Mudah",
                      color: "bg-green-100 text-green-700",
                    },
                    {
                      title: "Menyusun Kata",
                      description: "8 soal praktik",
                      difficulty: "Sedang",
                      color: "bg-yellow-100 text-yellow-700",
                    },
                    {
                      title: "Menulis Tegak Bersambung",
                      description: "5 soal menulis",
                      difficulty: "Mudah",
                      color: "bg-green-100 text-green-700",
                    },
                  ].map((quiz, index) => (
                    <div key={index} className="group">
                      <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-900 group-hover:text-black text-sm">
                            {quiz.title}
                          </h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${quiz.color}`}
                          >
                            {quiz.difficulty}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mb-3">
                          {quiz.description}
                        </p>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all">
                          Mulai Latihan
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

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
                      <Link
                        href="#"
                        className="block p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-all"
                      >
                        <span className="text-gray-900 font-medium group-hover:text-black transition-colors text-sm">
                          {item}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Progress Section */}
            <section>
              <h2 className="text-xl font-bold text-black mb-4 sm:mb-6">
                Progress Belajar
              </h2>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100/50 p-4 sm:p-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-3">
                      <span className="text-2xl font-bold text-blue-600">
                        33%
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">BAB 1 Selesai</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Materi dibaca</span>
                      <span className="font-medium">1/3</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: "33%" }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Latihan selesai</span>
                      <span className="font-medium">0/3</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: "0%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
