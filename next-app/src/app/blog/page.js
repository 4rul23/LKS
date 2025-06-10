"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Main Content - Responsive Single Column */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4 sm:py-6 lg:py-8">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8">
          {/* Blog Header - Responsive */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              Update Materi Bahasa Indonesia Kelas 2A
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">21 Mei 2025</p>
          </div>

          {/* Blog Content - Responsive */}
          <div className="prose max-w-none text-gray-700">
            <p className="font-medium mb-4 text-sm sm:text-base">
              Halo Ayah, Bunda, dan Anak-anak hebat Kelas 2A! 👋
            </p>

            <p className="mb-6 text-sm sm:text-base">
              Kami informasikan bahwa materi Bahasa Indonesia untuk Kelas 2A
              telah diperbarui dan dilengkapi dengan:
            </p>

            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-green-100 text-green-700 w-5 h-5 rounded mr-2 flex-shrink-0 text-xs">
                  ✓
                </span>
                <span className="text-sm sm:text-base">
                  Materi ringkas dan mudah dipahami untuk setiap bab
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-green-100 text-green-700 w-5 h-5 rounded mr-2 flex-shrink-0 text-xs">
                  ✓
                </span>
                <span className="text-sm sm:text-base">
                  Soal pilihan ganda sebagai latihan pemahaman
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-green-100 text-green-700 w-5 h-5 rounded mr-2 flex-shrink-0 text-xs">
                  ✓
                </span>
                <span className="text-sm sm:text-base">
                  Disusun khusus sesuai tingkat perkembangan anak usia 7-8 tahun
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-green-100 text-green-700 w-5 h-5 rounded mr-2 flex-shrink-0 text-xs">
                  ✓
                </span>
                <span className="text-sm sm:text-base">
                  Siap cetak dalam format Word untuk belajar di rumah
                </span>
              </li>
            </ul>

            <p className="font-medium text-amber-700 mb-2 text-sm sm:text-base">
              🌟 Materi terdiri dari 5 bab utama:
            </p>
            <ol className="list-decimal pl-4 sm:pl-6 mb-6 space-y-1">
              <li className="text-sm sm:text-base">Mengenal Huruf dan Kata</li>
              <li className="text-sm sm:text-base">
                Menyusun Kalimat Sederhana
              </li>
              <li className="text-sm sm:text-base">Cerita dan Dongeng Anak</li>
              <li className="text-sm sm:text-base">Mengenal Teks Percakapan</li>
              <li className="text-sm sm:text-base">Menulis Cerita Sederhana</li>
            </ol>

            <p className="mb-4 text-sm sm:text-base">
              Silakan mengakses materi melalui tautan berikut:{" "}
              <a href="#" className="text-blue-600 font-medium hover:underline">
                Klik Disini
              </a>
            </p>

            <p className="mb-2 text-sm sm:text-base">
              Kami berharap pembaruan ini dapat membantu anak-anak belajar
              dengan lebih semangat dan menyenangkan. Jangan lupa untuk selalu
              membaca bersama di rumah ya!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
