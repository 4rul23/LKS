"use client"
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  // Navigation state
  const [activeNav, setActiveNav] = useState('registrasi');

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    phoneNumber: '',
    birthDate: '',
    school: '',
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
    console.log('Registration attempt with:', formData);
    // Implementasi registrasi sebenarnya akan masuk di sini
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

      {/* Registration Form - Wider landscape card with vertical form layout */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Registrasi</h2>
          <p className="text-gray-600 mb-6">Silahkan lengkapi data dalam form berikut</p>

          <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Alamat Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="nama@example.com"
                required
              />
            </div>

            {/* Full Name Field */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            {/* Phone Number Field */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Nomor Telepon
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            {/* Birth Date Field */}
            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal Lahir
              </label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            {/* School Field */}
            <div>
              <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-1">
                Asal Sekolah
              </label>
              <input
                type="text"
                id="school"
                name="school"
                value={formData.school}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Daftar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
