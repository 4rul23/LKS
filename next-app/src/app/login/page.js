"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  // Form state - simplified to phone and password only
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt with:", formData);
    // Implementasi login sebenarnya akan masuk di sini
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Main Content */}
      <div className="p-4 sm:p-6 lg:p-8 max-w-full mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column - Login Form */}
          <div className="xl:col-span-8">
            <div className="bg-white rounded-2xl shadow-xl border border-blue-100/50 p-4 sm:p-6 lg:p-8">
              <div className="max-w-md mx-auto">
                <div className="mb-6 sm:mb-8 text-center">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    Login
                  </h1>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Ketik nomor seluler dan password untuk masuk
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-5"
                >
                  {/* Phone Number Field */}
                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
                    >
                      No. Telepon
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
                    />
                  </div>

                  {/* Forgot Password Link */}
                  <div className="text-right">
                    <Link
                      href="/forgot-password"
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Lupa password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-2 sm:py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm sm:text-base"
                    >
                      Masuk
                    </button>
                  </div>
                </form>

                {/* Register Link */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Belum punya akun?{" "}
                    <Link
                      href="/register"
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Daftar akun baru
                    </Link>
                  </p>
                </div>

                {/* Social Login Options */}
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Atau</span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    <button
                      type="button"
                      className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all"
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Masuk dengan Google
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Welcome & Info */}
          <div className="xl:col-span-4 space-y-6">
            {/* Welcome Section */}
            <section>
              <h2 className="text-xl font-bold text-black mb-4 sm:mb-6">
                Selamat Datang Kembali!
              </h2>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100/50 p-4 sm:p-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Masuk ke Akun Anda
                  </h3>
                  <p className="text-sm text-gray-600">
                    Lanjutkan perjalanan belajar Anda dan akses semua materi
                    yang telah Anda mulai
                  </p>
                </div>
              </div>
            </section>

            {/* Quick Access */}
            <section>
              <h2 className="text-xl font-bold text-black mb-4 sm:mb-6">
                Akses Cepat
              </h2>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100/50 p-4 sm:p-6">
                <div className="space-y-3">
                  <Link
                    href="/daftar-isi"
                    className="block p-3 rounded-lg hover:bg-gray-50 transition-all group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm group-hover:text-blue-600">
                          Materi Pelajaran
                        </div>
                        <div className="text-xs text-gray-500">
                          Akses semua materi
                        </div>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/blog"
                    className="block p-3 rounded-lg hover:bg-gray-50 transition-all group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm group-hover:text-green-600">
                          Blog & Artikel
                        </div>
                        <div className="text-xs text-gray-500">
                          Baca artikel terbaru
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </section>

            {/* Support */}
            <section>
              <h2 className="text-xl font-bold text-black mb-4 sm:mb-6">
                Butuh Bantuan?
              </h2>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100/50 p-4 sm:p-6">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-3">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                    Pusat Bantuan
                  </h3>
                  <p className="text-xs text-gray-600 mb-3">
                    Tim support kami siap membantu Anda 24/7
                  </p>
                  <button className="text-xs bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-all">
                    Hubungi Support
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
