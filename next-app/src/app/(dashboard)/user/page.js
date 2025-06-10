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

          {/* Navigation Menu */}
          <nav className="space-y-2 mb-6">
            {[
              { name: 'dashboard', label: 'Dashboard', icon: '🏠' },
              { name: 'materi', label: 'Materi', icon: '📚' },
              { name: 'nilai', label: 'Nilai', icon: '📊' },
              { name: 'pengaturan', label: 'Pengaturan', icon: '⚙️' }
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
        {/* Header */}
        <header className="bg-white shadow-sm px-8 py-4 border-b border-gray-200 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
              <p className="text-sm text-gray-500">Selamat datang, {userData.name.split(' ')[0]}!</p>
            </div>

            <div className="flex items-center space-x-5">
              {/* Search Bar */}
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Cari materi..."
                  className="w-64 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Notification Button */}
              <button className="relative flex h-10 w-10 bg-gray-100 hover:bg-gray-200 rounded-full items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>
              </button>

              {/* Profile Button */}
              <button className="h-10 w-10 bg-blue-50 rounded-full border-2 border-blue-100 flex items-center justify-center">
                <span className="text-blue-600">👤</span>
              </button>
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

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-1 space-y-6">
              {/* Learning Resources */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                  <h3 className="font-medium text-gray-800">Sumber Belajar</h3>
                </div>
                <div className="p-4">
                  <ul className="space-y-3">
                    <li><a href="#" className="flex items-center text-blue-600 hover:underline"><span className="mr-2">📗</span>Buku Digital</a></li>
                    <li><a href="#" className="flex items-center text-blue-600 hover:underline"><span className="mr-2">🔊</span>Audio Pembelajaran</a></li>
                    <li><a href="#" className="flex items-center text-blue-600 hover:underline"><span className="mr-2">🎮</span>Game Edukasi</a></li>
                    <li><a href="#" className="flex items-center text-blue-600 hover:underline"><span className="mr-2">🎬</span>Video Tutorial</a></li>
                  </ul>
                </div>
              </div>

              {/* Calendar */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                  <h3 className="font-medium text-gray-800">Kalender Akademik</h3>
                </div>
                <div className="p-4">
                  <div className="text-center text-gray-500 mb-3">Juni 2025</div>
                  <div className="grid grid-cols-7 gap-1">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                      <div key={i} className="text-center text-xs font-medium text-gray-500 py-1">{day}</div>
                    ))}
                    {[...Array(30)].map((_, i) => (
                      <div key={i} className={`text-center py-1 text-xs rounded-full ${i === 9 ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700'}`}>
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-3 space-y-6">
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

              {/* Latest Materials */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="px-4 py-3 border-b border-gray-100 flex justify-between">
                  <h3 className="font-medium text-gray-800">Materi Terbaru</h3>
                  <button className="text-blue-600 text-sm hover:underline">Lihat Semua</button>
                </div>
                <div className="p-4">
                  <div className="flex flex-col lg:flex-row gap-4">
                    {[1, 2].map((item) => (
                      <div key={item} className="flex-1 bg-gray-50 rounded-lg p-4 border border-gray-100">
                        <h4 className="font-medium text-gray-800">Pelajaran {item}: Membaca Dongeng</h4>
                        <p className="text-sm text-gray-600 mt-1 mb-3">Bahasa Indonesia Kelas 2A</p>
                        <button className="text-blue-600 text-sm hover:underline flex items-center">
                          <span>Mulai Belajar</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
