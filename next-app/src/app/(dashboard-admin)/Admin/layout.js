"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/Admin/dashboard",
    },
    {
      name: "Data Materi",
      path: "/Admin/data-materi",
    },
    {
      name: "Data Soal",
      path: "/Admin/data-soal",
    },
    {
      name: "Data Informasi",
      path: "/Admin/data-informasi",
    },
    {
      name: "Data Sesi Soal dan Skor",
      path: "/Admin/data-sesi-soal-skor",
    },
    {
      name: "Data User",
      path: "/Admin/data-user",
    },
  ];

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 fixed h-full overflow-y-auto">
        {/* Header Admin */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-lg font-medium text-gray-700">
                {user?.name?.charAt(0).toUpperCase() || "A"}
              </span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Admin</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Profil</span>
                <span>|</span>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-800"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="mt-4">
          <ul className="space-y-2 px-4">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`block p-4 rounded-lg border transition-all duration-200 ${
                    pathname === item.path
                      ? "bg-blue-50 border-blue-200 text-blue-700"
                      : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-80">{children}</div>
    </div>
  );
}
