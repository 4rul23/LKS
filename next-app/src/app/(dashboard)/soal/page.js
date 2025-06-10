"use client"
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SoalDashboardPage() {
  const [activeNav, setActiveNav] = useState('sesi-soal');

  // Sample user data
  const userData = {
    name: "Nisaa Trisani",
    role: "Pelajar Sekolah Dasar",
    avatarUrl: "/avatar-placeholder.png",
  };

  // Sample question session data
  const sesiSoalData = [
    {
      id: 1,
      title: "Latihan Bahasa Indonesia",
      subject: "Bahasa Indonesia",
      class: "Kelas 2A",
      date: "05 Juni 2025",
      totalQuestions: 10,
      completedQuestions: 10,
      score: 80,
      status: "Selesai"
    },
    {
      id: 2,
      title: "Latihan Matematika Dasar",
      subject: "Matematika",
      class: "Kelas 2A",
      date: "03 Juni 2025",
      totalQuestions: 15,
      completedQuestions: 15,
      score: 75,
      status: "Selesai"
    },
    {
      id: 3,
      title: "Quiz Pengetahuan Umum",
      subject: "Tematik",
      class: "Kelas 2A",
      date: "10 Juni 2025",
      totalQuestions: 20,
      completedQuestions: 0,
      score: null,
      status: "Belum Dimulai"
    }
  ];

  // Calculate average score
  const completedSessions = sesiSoalData.filter(session => session.status === "Selesai");
  const averageScore = completedSessions.length > 0
    ? Math.round(completedSessions.reduce((sum, session) => sum + session.score, 0) / completedSessions.length)
    : 0;

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-72 bg-white border-r border-gray-200 min-h-screen fixed">
        <div className="p-6 flex flex-col h-full">
          {/* Logo & App Name */}
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 relative rounded-lg bg-gray-100 flex items-center justify-center">
              <Image src="/logo.png" alt="LOSO Logo" fill className="object-contain p-1" />
            </div>
            <div className="ml-3">
              <h1 className="font-bold text-xl text-gray-900">LOSO</h1>
              <p className="text-xs text-gray-500">Learning Platform</p>
            </div>
          </div>

          {/* Dashboard Title */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-1">Dashboard Sesi Soal</h2>
            <p className="text-sm text-gray-500">2. Sesi Soal dan Skor</p>
          </div>

          {/* User Profile */}
          <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex items-center">
              <div className="relative w-16 h-16 rounded-full bg-white border border-gray-200">
                {userData.avatarUrl ? (
                  <Image src={userData.avatarUrl} alt={userData.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl text-gray-400">👤</div>
                )}
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-800">{userData.name}</h3>
                <p className="text-xs text-gray-500">{userData.role}</p>
                <div className="mt-1 flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-gray-400 mr-1"></span>
                  <span className="text-xs text-gray-500">Online</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-2 mb-6">
            {[
              { name: 'dashboard', label: 'Dashboard', icon: '🏠' },
              { name: 'sesi-soal', label: 'Sesi Soal', icon: '📝' },
              { name: 'form-soal', label: 'Form Soal', icon: '📋' }
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveNav(item.name)}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-left
                  ${item.name === activeNav ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="mt-auto pt-6 border-t border-gray-200">
            <button className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 w-full px-4 py-3 rounded-lg text-left">
              <span>🚪</span>
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-72 flex-1">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Sesi Soal</h1>
              <p className="text-sm text-gray-500">Daftar sesi soal dan nilai anda</p>
            </div>

            <div className="flex items-center">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari sesi soal..."
                  className="w-64 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Total Completed Sessions */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center mb-2">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <span>📝</span>
                </div>
                <h3 className="ml-3 font-medium text-gray-700">Sesi Selesai</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">{completedSessions.length}</p>
              <p className="text-sm text-gray-500 mt-1">Dari {sesiSoalData.length} sesi total</p>
            </div>

            {/* Average Score */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center mb-2">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <span>📊</span>
                </div>
                <h3 className="ml-3 font-medium text-gray-700">Nilai Rata-rata</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">{averageScore}</p>
              <p className="text-sm text-gray-500 mt-1">Dari semua sesi yang selesai</p>
            </div>
          </div>

          {/* Session List */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-4 py-3 border-b border-gray-200 flex justify-between">
              <h3 className="font-medium text-gray-800">Daftar Sesi Soal</h3>
              <button className="text-gray-600 text-sm hover:underline">Lihat Semua</button>
            </div>
            <div className="p-4 space-y-4">
              {sesiSoalData.map((session) => (
                <div key={session.id} className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{session.title}</h4>
                      <p className="text-sm text-gray-600">{session.subject} - {session.class}</p>
                      <p className="text-xs text-gray-500 mt-1">Tanggal: {session.date}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-md text-xs font-medium
                      ${session.status === "Selesai"
                        ? "bg-gray-200 text-gray-700"
                        : "bg-gray-100 text-gray-600"}`}
                    >
                      {session.status}
                    </div>
                  </div>

                  {session.status === "Selesai" ? (
                    <>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Nilai:</span>
                        <span className="font-medium text-gray-900">{session.score}</span>
                      </div>

                      <div className="mb-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-gray-500"
                            style={{ width: `${session.score}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Jawaban benar</span>
                          <span>{Math.round(session.completedQuestions * (session.score/100))} dari {session.totalQuestions} soal</span>
                        </div>
                      </div>

                      <Link
                        href={`/soal/${session.id}/hasil`}
                        className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg text-sm inline-block hover:bg-gray-200"
                      >
                        Lihat Hasil
                      </Link>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Total Soal:</span>
                        <span className="font-medium text-gray-700">{session.totalQuestions}</span>
                      </div>

                      <Link
                        href={`/soal/${session.id}`}
                        className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg text-sm inline-block hover:bg-gray-200"
                      >
                        Mulai Sesi
                      </Link>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
