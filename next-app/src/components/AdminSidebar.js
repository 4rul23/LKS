"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const menuItems = [
    {
      name: "Dashboard Administrator",
      path: "/Admin/dashboard",
      icon: "📊",
      description: "Halaman utama admin",
    },
    {
      name: "Data Soal (Buat dan Update Materi)",
      path: "/Admin/data-soal",
      icon: "📚",
      description: "Kelola materi pembelajaran",
    },
    {
      name: "Data Soal (Form Buat dan Update Soal)",
      path: "/Admin/form-soal",
      icon: "📝",
      description: "Form input soal",
    },
    {
      name: "Data Informasi (Form Buat dan Update Informasi)",
      path: "/Admin/data-informasi",
      icon: "📢",
      description: "Kelola informasi",
    },
    {
      name: "Data User (Form Buat dan Update User)",
      path: "/Admin/data-user",
      icon: "👥",
      description: "Kelola data user",
    },
    {
      name: "Data Sesi Soal dan Skor",
      path: "/Admin/sesi-soal",
      icon: "🎯",
      description: "Kelola sesi dan skor",
    },
  ];

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-screen sticky top-0 overflow-y-auto">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900">
          Halaman Dashboard Administrator
        </h2>
        <p className="text-sm text-gray-500 mt-1">{user?.name}</p>
      </div>

      {/* Menu Items */}
      <nav className="mt-4">
        <ul className="space-y-2 px-4">
          {menuItems.map((item, index) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`block p-4 rounded-lg border transition-all duration-200 ${
                  pathname === item.path
                    ? "bg-blue-50 border-blue-200 text-blue-700"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start space-x-3">
                  <span className="text-xl mt-1">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">
                      {index + 1}. {item.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
