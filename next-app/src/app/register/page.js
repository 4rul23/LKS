"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const { register, isAuthenticated, user, loading } = useAuth();
  const router = useRouter();
  
  // Form state
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    phoneNumber: "",
    birthDate: "",
    school: "",
    password: "",
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect jika sudah login
  useEffect(() => {
    if (!loading && isAuthenticated()) {
      const redirectPath = user?.role === 'admin' ? '/Admin/dashboard' : '/user';
      router.push(redirectPath);
    }
  }, [loading, isAuthenticated, user, router]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error ketika user mulai mengetik
    if (error) setError('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (formData.password.length < 8) {
      setError('Password minimal 8 karakter');
      return;
    }

    setIsLoading(true);

    try {
      const registerData = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        birthDate: formData.birthDate,
        school: formData.school,
      };

      const result = await register(registerData);
      
      if (!result.success) {
        setError(result.error || 'Registrasi gagal. Silakan coba lagi.');
      }
      // Jika success, redirect akan otomatis dilakukan oleh AuthContext
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
      console.error('Register error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading jika masih mengecek auth status
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Main Content */}
      <div className="p-4 sm:p-6 lg:p-8 max-w-full mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Left Column - Registration Form */}
          <div className="xl:col-span-8">
            <div className="bg-white rounded-2xl shadow-xl border border-blue-100/50 p-4 sm:p-6 lg:p-8">
              <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Registrasi
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">
                  Silahkan lengkapi data dalam form berikut untuk membuat akun baru
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Grid untuk form fields - responsive */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
                    >
                      Alamat Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="nama@example.com"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  {/* Full Name Field */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
                    >
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Masukkan nama lengkap"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  {/* Phone Number Field */}
                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
                    >
                      Nomor Telepon
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="08123456789"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  {/* Birth Date Field */}
                  <div>
                    <label
                      htmlFor="birthDate"
                      className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
                    >
                      Tanggal Lahir
                    </label>
                    <input
                      type="date"
                      id="birthDate"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  {/* School Field */}
                  <div>
                    <label
                      htmlFor="school"
                      className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
                    >
                      Asal Sekolah
                    </label>
                    <input
                      type="text"
                      id="school"
                      name="school"
                      value={formData.school}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Nama sekolah"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  {/* Password Field */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="••••••••"
                      required
                      disabled={isLoading}
                      minLength={8}
                    />
                    <p className="text-xs text-gray-500 mt-1">Minimal 8 karakter</p>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4 sm:pt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Mendaftar...
                      </div>
                    ) : (
                      'Daftar Sekarang'
                    )}
                  </button>
                </div>

                {/* Login Link */}
                <div className="text-center pt-4">
                  <p className="text-sm text-gray-600">
                    Sudah punya akun?{" "}
                    <Link
                      href="/login"
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Masuk di sini
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Info & Help - tetap sama seperti desain asli */}
          <div className="xl:col-span-4 space-y-6">
            {/* Registration Info */}
            <section>
              <h2 className="text-xl font-bold text-black mb-4 sm:mb-6">
                Mengapa Mendaftar?
              </h2>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100/50 p-4 sm:p-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">Akses Materi Lengkap</h3>
                      <p className="text-xs text-gray-600 mt-1">
                        Dapatkan akses ke semua materi pembelajaran dan latihan soal
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">Progress Tracking</h3>
                      <p className="text-xs text-gray-600 mt-1">
                        Pantau kemajuan belajar dan pencapaian Anda
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">Komunitas Belajar</h3>
                      <p className="text-xs text-gray-600 mt-1">
                        Bergabung dengan komunitas siswa dan guru
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Stats */}
            <section>
              <h2 className="text-xl font-bold text-black mb-4 sm:mb-6">
                Statistik Platform
              </h2>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100/50 p-4 sm:p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">1,200+</div>
                    <div className="text-xs text-gray-600">Siswa Aktif</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">50+</div>
                    <div className="text-xs text-gray-600">Materi Pelajaran</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">25+</div>
                    <div className="text-xs text-gray-600">Guru Berpengalaman</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-1">95%</div>
                    <div className="text-xs text-gray-600">Tingkat Kepuasan</div>
                  </div>
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