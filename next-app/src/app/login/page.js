"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login, isAuthenticated, user, loading } = useAuth();
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect jika sudah login
  useEffect(() => {
    if (!loading && isAuthenticated()) {
      const redirectPath =
        user?.role === "admin" ? "/Admin/dashboard" : "/user";
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
    if (error) setError("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Email dan password harus diisi");
      setIsLoading(false);
      return;
    }

    try {
      console.log("🚀 Submitting login form...", { email: formData.email });

      const result = await login(formData.email, formData.password);

      if (!result.success) {
        setError(result.error || "Login gagal. Silakan coba lagi.");
      }
      // Jika success, redirect akan otomatis dilakukan oleh AuthContext
    } catch (err) {
      console.error("❌ Form submit error:", err);
      setError("Terjadi kesalahan. Silakan coba lagi.");
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
          {/* Left Column - Login Form */}
          <div className="xl:col-span-8">
            <div className="bg-white rounded-2xl shadow-xl border border-blue-100/50 p-4 sm:p-6 lg:p-8">
              <div className="max-w-md mx-auto">
                <div className="mb-6 sm:mb-8 text-center">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    Login
                  </h1>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Masukkan email dan password untuk masuk
                  </p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-5"
                >
                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="user@test.com"
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
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-2 sm:py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Masuk...
                        </div>
                      ) : (
                        "Masuk"
                      )}
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
              </div>
            </div>
          </div>

          {/* Right Column - tetap sama */}
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
