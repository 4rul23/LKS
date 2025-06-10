"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const [activeNav, setActiveNav] = useState("beranda");
  const [showSearch, setShowSearch] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

  // Handle logout
  const handleLogout = async () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      await logout();
    }
  };

  // Navigation items - TAMBAH DASHBOARD UNTUK SETIAP ROLE
  const getNavItems = () => {
    if (!isAuthenticated()) {
      // Public navigation
      return [
        { name: "beranda", label: "Beranda", path: "/" },
        { name: "materi", label: "Materi", path: "/daftar-isi" },
        { name: "blog", label: "Blog", path: "/blog" },
        { name: "registrasi", label: "Registrasi", path: "/register" },
      ];
    } else {
      // Base authenticated navigation
      const baseNav = [
        { name: "beranda", label: "Beranda", path: "/" },
        { name: "materi", label: "Materi", path: "/daftar-isi" },
        { name: "blog", label: "Blog", path: "/blog" },
      ];

      // Add dashboard based on role
      if (user?.role === "admin") {
        return [
          ...baseNav,
          { name: "dashboard", label: "🔧 Admin Dashboard", path: "/Admin/dashboard" },
        ];
      } else if (user?.role === "siswa") {
        return [
          ...baseNav,
          { name: "dashboard", label: "📊 Dashboard Siswa", path: "/siswa/dashboard" },
        ];
      } else {
        // Default user or other roles
        return [
          ...baseNav,
          { name: "dashboard", label: "📋 Dashboard", path: "/user/dashboard" },
        ];
      }
    }
  };

  const navItems = getNavItems();

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-sm px-4 sm:px-6 py-3 border-b border-blue-100/50 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="ml-0 sm:ml-3">
            <Link href="/">
              <h1 className="font-bold text-xl text-black cursor-pointer">
                LOSO
              </h1>
            </Link>
          </div>
        </div>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden lg:flex space-x-8 justify-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              onClick={() => setActiveNav(item.name)}
              className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-all duration-300 ${
                pathname === item.path
                  ? "bg-gray-100 text-black font-medium shadow-sm"
                  : "text-gray-700 hover:bg-gray-50 hover:text-black"
              } ${
                item.name === "dashboard" 
                  ? "border border-blue-200 hover:border-blue-300" 
                  : ""
              }`}
            >
              <span className={pathname === item.path ? "font-medium" : ""}>
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Right Section - Search, User Info, and Mobile Menu */}
        <div className="flex items-center space-x-3">
          {/* User Info (if authenticated) */}
          {isAuthenticated() && (
            <div className="hidden sm:flex items-center space-x-3">
              <div className="text-sm">
                <div className="font-medium text-gray-900">{user?.name}</div>
                <div className="text-gray-500 text-xs capitalize">
                  {user?.role}
                </div>
              </div>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          )}

          {/* Quick Dashboard Button - Only for authenticated users */}
          {isAuthenticated() && (
            <Link
              href={
                user?.role === "admin" 
                  ? "/Admin/dashboard" 
                  : user?.role === "siswa" 
                    ? "/siswa/dashboard" 
                    : "/user/"
              }
              className="hidden md:flex items-center px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors duration-200 border border-blue-200"
            >
              {user?.role === "admin" ? "🔧" : user?.role === "siswa" ? "📊" : "📋"}
              <span className="ml-1 hidden lg:inline">
                {user?.role === "admin" ? "Admin" : user?.role === "siswa" ? "Dashboard" : "Panel"}
              </span>
            </Link>
          )}

          {/* Search - Hidden on small screens */}
          <div
            className={`hidden sm:block relative transition-all duration-300 ${
              showSearch ? "w-48 md:w-64" : "w-10"
            }`}
          >
            <button
              onClick={() => setShowSearch(!showSearch)}
              className={`${
                showSearch ? "hidden" : "flex"
              } h-10 w-10 bg-gray-100 hover:bg-gray-200 rounded-full items-center justify-center transition-all`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {showSearch && (
              <div className="absolute right-0 top-0 flex items-center">
                <input
                  autoFocus
                  type="text"
                  placeholder="Cari materi..."
                  className="w-48 md:w-64 pl-4 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white/80"
                />
                <button
                  onClick={() => setShowSearch(false)}
                  className="absolute right-3 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Login/Logout Button */}
          {isAuthenticated() ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
            >
              <span className="hidden sm:inline">Logout</span>
              <span className="sm:hidden">🚪</span>
            </button>
          ) : (
            <Link
              href="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              Login
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden h-10 w-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 pb-4 border-t border-gray-100">
          {/* Mobile User Info (if authenticated) */}
          {isAuthenticated() && (
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-700">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{user?.name}</div>
                    <div className="text-gray-500 text-sm capitalize">
                      {user?.role}
                    </div>
                  </div>
                </div>
                {/* Mobile Quick Dashboard Button */}
                <Link
                  href={
                    user?.role === "admin" 
                      ? "/Admin/dashboard" 
                      : user?.role === "siswa" 
                        ? "/siswa/dashboard" 
                        : "/user/dashboard"
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors duration-200 border border-blue-200"
                >
                  {user?.role === "admin" ? "🔧" : user?.role === "siswa" ? "📊" : "📋"}
                  <span className="ml-1">
                    {user?.role === "admin" ? "Admin" : "Dashboard"}
                  </span>
                </Link>
              </div>
            </div>
          )}

          <nav className="flex flex-col space-y-2 mt-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => {
                  setActiveNav(item.name);
                  setIsMobileMenuOpen(false);
                }}
                className={`px-4 py-3 rounded-lg transition-all duration-300 ${
                  pathname === item.path
                    ? "bg-gray-100 text-black font-medium"
                    : "text-gray-700 hover:bg-gray-50 hover:text-black"
                } ${
                  item.name === "dashboard" 
                    ? "border border-blue-200 bg-blue-50 text-blue-700" 
                    : ""
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Login/Logout */}
            {isAuthenticated() ? (
              <button
                onClick={handleLogout}
                className="mx-4 mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mx-4 mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 text-center"
              >
                Login
              </Link>
            )}
          </nav>

          {/* Mobile Search */}
          <div className="mt-4 px-4">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Cari materi..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white/80"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}