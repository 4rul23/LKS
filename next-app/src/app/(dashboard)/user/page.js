"use client"
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function UserDashboardPage() {
  const [activeNav, setActiveNav] = useState('dashboard');

  // Sample user data
  const userData = {
    name: "Nisaa Trisani",
    role: "Pelajar Sekolah Dasar",
    avatarUrl: "/avatar-placeholder.png",
    totalScore: 75,
    completedLessons: 2,
    courses: [
      {
        id: 1,
        name: "Tematik",
        class: "Kelas 2A",
        completed: 5,
        total: 25,
        color: "blue"
      },
      {
        id: 2,
        name: "Bahasa Indonesia",
        class: "Kelas 2A",
        completed: 1,
        total: 25,
        color: "indigo"
      }
    ]
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-72 bg-white border-r border-gray-200 min-h-screen fixed shadow-sm">
        <div className="p-6 flex flex-col h-full">
          {/* Logo & App Name */}
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 relative rounded-xl bg-blue-50 flex items-center justify-center">
              <Image src="/logo.png" alt="LOSO Logo" fill className="object-contain p-1" />
            </div>
            <div className="ml-3">
              <h1 className="font-bold text-xl text-gray-900">LOSO</h1>
              <p className="text-xs text-gray-500">Learning Platform</p>
            </div>
          </div>

          {/* Dashboard Title */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-1">Halaman Dashboard User</h2>
            <p className="text-sm text-gray-500">1. Dashboard User</p>
          </div>

          {/* User Profile */}
          <div className="mb-6 p-4 border border-gray-100 rounded-xl bg-gray-50">
            <div className="flex items-center">
              <div className="relative w-16 h-16 rounded-full bg-white border-2 border-blue-100">
                {userData.avatarUrl ? (
                  <Image src={userData.avatarUrl} alt={userData.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl text-blue-400">👤</div>
                )}
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-800">{userData.name}</h3>
                <p className="text-xs text-gray-500">{userData.role}</p>
                <div className="mt-1 flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                  <span className="text-xs text-green-600">Online</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Menu - Simplified */}
          <nav className="space-y-2 mb-6">
            {[
              { name: 'dashboard', label: 'Dashboard', icon: '🏠' },
              { name: 'sesi-soal-form-soal', label: 'Sesi Soal', icon: '📝' },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveNav(item.name)}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-left
                  ${item.name === activeNav ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="mt-auto pt-6 border-t border-gray-100">
            <button className="flex items-center space-x-3 text-gray-600 hover:text-red-600 w-full px-4 py-3 rounded-lg text-left">
              <span>🚪</span>
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-72 flex-1">
        {/* Header - Simplified */}
        <header className="bg-white shadow-sm px-8 py-4 border-b border-gray-200 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
              <p className="text-sm text-gray-500">Selamat datang, {userData.name.split(' ')[0]}!</p>
            </div>

            <div className="flex items-center">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari materi..."
                  className="w-64 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Stats Summary */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Score */}
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              <div className="flex items-center mb-2">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <span>📊</span>
                </div>
                <h3 className="ml-3 font-medium text-gray-700">Total Nilai</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">{userData.totalScore}</p>
              <p className="text-sm text-gray-500 mt-1">Dari semua mata pelajaran</p>
            </div>

            {/* Completed Lessons */}
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              <div className="flex items-center mb-2">
                <div className="p-2 bg-green-50 rounded-lg">
                  <span>✓</span>
                </div>
                <h3 className="ml-3 font-medium text-gray-700">Jumlah Selesai</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">{userData.completedLessons}</p>
              <p className="text-sm text-gray-500 mt-1">Materi telah diselesaikan</p>
            </div>
          </div>

          {/* Course Progress */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="px-4 py-3 border-b border-gray-100 flex justify-between">
              <h3 className="font-medium text-gray-800">Progress Pembelajaran</h3>
              <button className="text-blue-600 text-sm hover:underline">Lihat Semua</button>
            </div>
            <div className="p-4 space-y-4">
              {userData.courses.map((course) => (
                <div key={course.id} className="bg-white rounded-lg p-4 border border-gray-100">
                  <div className="flex justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{course.name}</h4>
                      <p className="text-sm text-gray-600">{course.class}</p>
                    </div>
                    <div className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                      {Math.round((course.completed / course.total) * 100)}% Selesai
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(course.completed / course.total) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Progress</span>
                      <span>{course.completed} dari {course.total} materi</span>
                    </div>
                  </div>

                  <Link
                    href={`/materi/${course.id}`}
                    className="px-4 py-2 bg-blue-50 text-blue-700 font-medium rounded-lg text-sm inline-block"
                  >
                    Lanjutkan Belajar
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
