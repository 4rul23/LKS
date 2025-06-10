"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from '@/contexts/AuthContext';
import withAuth from '@/components/auth/withAuth';

function UserDashboardPage() {
  const { user, logout, loading } = useAuth();
  const [activeNav, setActiveNav] = useState('dashboard');

  // Sample course data - in real app, this would come from API
  const [coursesData, setCoursesData] = useState([
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
  ]);

  // Calculate stats from user data and courses
  const calculateStats = () => {
    const totalCompleted = coursesData.reduce((sum, course) => sum + course.completed, 0);
    const averageScore = coursesData.length > 0 ? Math.round(totalCompleted / coursesData.length * 10) : 0;
    
    return {
      totalScore: averageScore,
      completedLessons: totalCompleted
    };
  };

  const stats = calculateStats();

  // Handle logout
  const handleLogout = async () => {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
      await logout();
    }
  };

  // Show loading if user data is not available
  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

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

          {/* User Profile - Using real user data */}
          <div className="mb-6 p-4 border border-gray-100 rounded-xl bg-gray-50">
            <div className="flex items-center">
              <div className="relative w-16 h-16 rounded-full bg-white border-2 border-blue-100">
                <div className="w-full h-full flex items-center justify-center text-2xl text-blue-400">
                  👤
                </div>
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-800">{user.name}</h3>
                <p className="text-xs text-gray-500">
                  {user.role === 'admin' ? 'Administrator' : 'Pelajar Sekolah Dasar'}
                </p>
                <p className="text-xs text-gray-400 mt-1">{user.school}</p>
                <div className="mt-1 flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                  <span className="text-xs text-green-600">Online</span>
                </div>
              </div>
            </div>
          </div>


          {/* Logout Button */}
          <div className="mt-auto pt-6 border-t border-gray-100">
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-3 text-gray-600 hover:text-red-600 w-full px-4 py-3 rounded-lg text-left transition-colors"
            >
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
              <p className="text-sm text-gray-500">
                Selamat datang, {user.name.split(' ')[0]}!
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari materi..."
                  className="w-64 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* User Info */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm text-gray-700">{user.name}</span>
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
              <p className="text-3xl font-bold text-gray-900">{stats.totalScore}</p>
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
              <p className="text-3xl font-bold text-gray-900">{stats.completedLessons}</p>
              <p className="text-sm text-gray-500 mt-1">Materi telah diselesaikan</p>
            </div>

            {/* User Info Cards */}
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              <div className="flex items-center mb-2">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <span>🎓</span>
                </div>
                <h3 className="ml-3 font-medium text-gray-700">Role</h3>
              </div>
              <p className="text-lg font-bold text-gray-900 capitalize">{user.role}</p>
              <p className="text-sm text-gray-500 mt-1">{user.school}</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              <div className="flex items-center mb-2">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <span>📧</span>
                </div>
                <h3 className="ml-3 font-medium text-gray-700">Email</h3>
              </div>
              <p className="text-sm font-bold text-gray-900">{user.email}</p>
              <p className="text-sm text-gray-500 mt-1">Akun aktif</p>
            </div>
          </div>

          {/* Course Progress */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="px-4 py-3 border-b border-gray-100 flex justify-between">
              <h3 className="font-medium text-gray-800">Progress Pembelajaran</h3>
              <button className="text-blue-600 text-sm hover:underline">Lihat Semua</button>
            </div>
            <div className="p-4 space-y-4">
              {coursesData.map((course) => (
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
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
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
                    className="px-4 py-2 bg-blue-50 text-blue-700 font-medium rounded-lg text-sm inline-block hover:bg-blue-100 transition-colors"
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

// Wrap with authentication HOC - only allow 'user' role
export default withAuth(UserDashboardPage, {
  requireAuth: true,
  allowedRoles: ['user'],
  redirectTo: '/login'
});
