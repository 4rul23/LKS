"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import withAuth from "@/components/auth/withAuth";
import { useRouter } from "next/navigation";

function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    total_users: 0,
    total_materi: 0,
    admin_users: 0,
    total_soal: 0,
    total_informasi: 0,
    published_informasi: 0,
    draft_informasi: 0,
    recent_registrations: 0,
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentInformasi, setRecentInformasi] = useState([]);
  const [dashboardLoading, setDashboardLoading] = useState(true);

  // API Base URL
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;

      try {
        setDashboardLoading(true);
        const token = localStorage.getItem("auth_token");

        // Fetch user statistics
        const userStatsResponse = await fetch(`${API_BASE_URL}/admin/users-statistics`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (userStatsResponse.ok) {
          const userStatsData = await userStatsResponse.json();
          if (userStatsData.success) {
            setStats(prevStats => ({
              ...prevStats,
              ...userStatsData.data
            }));
          }
        }

        // Fetch recent users
        const usersResponse = await fetch(`${API_BASE_URL}/admin/users?limit=5`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          if (usersData.success) {
            setRecentUsers(usersData.data.data || []);
          }
        }

        // Fetch recent informasi
        const informasiResponse = await fetch(`${API_BASE_URL}/admin/informasi?limit=5`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (informasiResponse.ok) {
          const informasiData = await informasiResponse.json();
          if (informasiData.success) {
            setRecentInformasi(informasiData.data.data || []);
          }
        }

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setDashboardLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  // Navigation handlers
  const navigateToUsers = () => router.push('/Admin/data-user');
  const navigateToInformasi = () => router.push('/Admin/informasi');
  const navigateToMateri = () => router.push('/Admin/materi');

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate percentages
  const materiPercentage = stats.total_materi > 0 ? 100 : 0;
  const publishedPercentage = stats.total_informasi > 0 ? ((stats.published_informasi / stats.total_informasi) * 100).toFixed(1) : 0;

  // Show loading
  if (loading || !user) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Welcome Header */}
      <div className="mb-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg text-white p-8">
        <div className="max-w-4xl">
          <h1 className="text-3xl font-bold mb-2">
            Selamat Datang, {user?.name}!
          </h1>
          <p className="text-blue-100 text-lg">
            Dashboard Admin SIGMEA - Sistem Informasi Manajemen Sekolah
          </p>
          <div className="mt-4 text-sm text-blue-100">
            Last login: {new Date().toLocaleDateString("id-ID", {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Users Card */}
        <div 
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer group"
          onClick={navigateToUsers}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
            </div>
            <span className="text-xs text-gray-500 font-medium">USERS</span>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{stats.total_users}</p>
            <p className="text-sm text-gray-600">Total Pengguna</p>
            <div className="mt-2 flex items-center text-xs">
              <span className="text-green-600 font-medium">{stats.admin_users} Admin</span>
              <span className="text-gray-400 mx-1">•</span>
              <span className="text-gray-500">{stats.recent_registrations} baru</span>
            </div>
          </div>
        </div>

        {/* Total Materi Card */}
        <div 
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer group"
          onClick={navigateToMateri}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <div className="w-6 h-6 bg-green-600 rounded-full"></div>
            </div>
            <span className="text-xs text-gray-500 font-medium">MATERI</span>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{stats.total_materi}</p>
            <p className="text-sm text-gray-600">Jumlah Materi</p>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${materiPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Total Soal Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-purple-600 rounded-full"></div>
            </div>
            <span className="text-xs text-gray-500 font-medium">SOAL</span>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{stats.total_soal}</p>
            <p className="text-sm text-gray-600">Total Soal</p>
            <div className="mt-2 flex items-center text-xs">
              <span className="text-purple-600 font-medium">Bank Soal</span>
              <span className="text-gray-400 mx-1">•</span>
              <span className="text-gray-500">Siap Ujian</span>
            </div>
          </div>
        </div>

        {/* Informasi Card */}
        <div 
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer group"
          onClick={navigateToInformasi}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
              <div className="w-6 h-6 bg-orange-600 rounded-full"></div>
            </div>
            <span className="text-xs text-gray-500 font-medium">INFO</span>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{stats.total_informasi}</p>
            <p className="text-sm text-gray-600">Total Informasi</p>
            <div className="mt-2 flex items-center text-xs">
              <span className="text-green-600 font-medium">{stats.published_informasi} Published</span>
              <span className="text-gray-400 mx-1">•</span>
              <span className="text-gray-500">{stats.draft_informasi} Draft</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Users */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Pengguna Terbaru</h3>
              <button 
                onClick={navigateToUsers}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Lihat Semua
              </button>
            </div>
          </div>
          <div className="p-6">
            {dashboardLoading ? (
              <div className="space-y-4">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="animate-pulse flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : recentUsers.length > 0 ? (
              <div className="space-y-4">
                {recentUsers.map((userData, index) => (
                  <div key={userData.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                        userData.role === 'admin' ? 'bg-purple-500' : 'bg-blue-500'
                      }`}>
                        {userData.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{userData.name}</p>
                        <p className="text-sm text-gray-500">{userData.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        userData.role === 'admin' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {userData.role === 'admin' ? 'Admin' : 'Siswa'}
                      </span>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDate(userData.created_at)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Belum ada pengguna terdaftar</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions & Recent Info */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-6 space-y-3">
              <button 
                onClick={navigateToMateri}
                className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 group-hover:text-blue-900">
                      Kelola Materi
                    </p>
                    <p className="text-sm text-gray-500">
                      Tambah, edit, atau hapus materi pembelajaran
                    </p>
                  </div>
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200">
                    <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                  </div>
                </div>
              </button>

              <button 
                onClick={navigateToInformasi}
                className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 group-hover:text-green-900">
                      Kelola Informasi
                    </p>
                    <p className="text-sm text-gray-500">
                      Buat atau edit informasi sekolah
                    </p>
                  </div>
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200">
                    <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Recent Informasi */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Informasi Terbaru</h3>
                <button 
                  onClick={navigateToInformasi}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Lihat Semua
                </button>
              </div>
            </div>
            <div className="p-6">
              {dashboardLoading ? (
                <div className="space-y-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : recentInformasi.length > 0 ? (
                <div className="space-y-4">
                  {recentInformasi.slice(0, 3).map((info, index) => (
                    <div key={info.id} className="border-l-4 border-blue-500 pl-4 py-2">
                      <h4 className="font-medium text-gray-900 text-sm line-clamp-1">
                        {info.judul}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(info.created_at)}
                      </p>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                        info.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {info.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <p className="text-sm">Belum ada informasi</p>
                </div>
              )}
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Status Sistem</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Server Status</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-600">Online</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Database</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-600">Connected</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Last Update</span>
                <span className="text-sm text-gray-900">
                  {new Date().toLocaleDateString("id-ID")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(AdminDashboard, {
  requireAuth: true,
  allowedRoles: ["admin"],
  redirectTo: "/login",
});