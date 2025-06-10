"use client"
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  // Navigation state
  const [activeNav, setActiveNav] = useState('login');

  // Form state - simplified to phone and password only
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: '',
  });

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt with:', formData);
    // Implementasi login sebenarnya akan masuk di sini
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm px-6 py-3 border-b border-blue-100/50 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <div className="w-10 h-10 relative overflow-hidden rounded-xl">
              <Image
                src="/logo.png"
                alt="LOSO Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="ml-3">
              <h1 className="font-bold text-xl text-black">LOSO</h1>
            </div>
          </div>

          {/* Centered Navigation */}
          <nav className="flex space-x-8 justify-center">
            {[
              { name: 'beranda', label: 'Beranda', icon: '🏠' },
              { name: 'materi', label: 'Materi', icon: '📚' },
              { name: 'blog', label: 'Blog', icon: '📝' },
              { name: 'registrasi', label: 'Registrasi', icon: '📋' }
            ].map((item) => (
              <button
                key={item.name}
                className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-all duration-300
                  ${item.name === activeNav
                    ? 'bg-gray-100 text-black font-medium shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-black'
                  }`}
                onClick={() => setActiveNav(item.name)}
              >
                <span className="text-base">{item.icon}</span>
                <span className={item.name === activeNav ? "font-medium" : ""}>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Search */}
          <div className="relative w-10">
            <button
              className="flex h-10 w-10 bg-gray-100 hover:bg-gray-200 rounded-full items-center justify-center transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Simplified Login Form */}
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Phone Number Field */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                No. Telepon
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="08123456789"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Masuk
              </button>
            </div>
          </form>

          {/* Register Link - Simplified */}
          <div className="mt-4 text-center text-sm">
            <Link href="/registrasi" className="text-blue-600 hover:text-blue-500">
              Daftar akun baru
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
