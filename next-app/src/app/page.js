import Image from "next/image";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <div className="font-bold text-xl">LOGO</div>
        </div>
        <nav className="p-4">
          <p className="text-gray-500 text-xs mb-4">Menu</p>
          <ul className="space-y-2">
            <li>
              <Link href="/dashboard" className="flex items-center p-2 rounded-lg bg-blue-50 text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/materi" className="flex items-center p-2 rounded-lg text-gray-600 hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                Materi
              </Link>
            </li>
            <li>
              <Link href="/tugas" className="flex items-center p-2 rounded-lg text-gray-600 hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Tugas
              </Link>
            </li>
            <li>
              <Link href="/nilai" className="flex items-center p-2 rounded-lg text-gray-600 hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                Nilai
              </Link>
            </li>
            <li>
              <Link href="/info" className="flex items-center p-2 rounded-lg text-gray-600 hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Info
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Header */}
        <header className="bg-white shadow-sm px-6 py-3 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Halaman Beranda</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                S
              </div>
              <span className="font-medium">Siswa</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Pembelajaran Section */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Pembelajaran</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Unduh Materi Card */}
              <div className="bg-white rounded-lg shadow p-5 border border-gray-100">
                <h3 className="font-semibold text-lg mb-2">Unduh Materi Bahasa Indonesia Kelas 2A</h3>
                <p className="text-sm text-gray-600 mb-4">Kumpulan materi pelajaran Bahasa Indonesia untuk kelas 2A semester ganjil</p>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                  </div>
                  <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md">
                    Unduh
                  </button>
                </div>
              </div>

              {/* Tematik Kelas Card */}
              <div className="bg-white rounded-lg shadow p-5 border border-gray-100">
                <h3 className="font-semibold text-lg mb-2">Tematik Kelas 2A</h3>
                <div className="bg-gray-100 h-32 rounded-md flex items-center justify-center mb-4">
                  <span className="text-gray-400">Konten Tematik</span>
                </div>
                <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Lihat Materi
                </button>
              </div>

              {/* Bahasa Indonesia Card */}
              <div className="bg-white rounded-lg shadow p-5 border border-gray-100">
                <h3 className="font-semibold text-lg mb-2">Bahasa Indonesia Kelas 2A</h3>
                <div className="bg-gray-100 h-32 rounded-md flex items-center justify-center mb-4">
                  <span className="text-gray-400">Materi B. Indonesia</span>
                </div>
                <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Lihat Materi
                </button>
              </div>

              {/* Matematika Card */}
              <div className="bg-white rounded-lg shadow p-5 border border-gray-100">
                <h3 className="font-semibold text-lg mb-2">Matematika Kelas 5A</h3>
                <div className="bg-gray-100 h-32 rounded-md flex items-center justify-center mb-4">
                  <span className="text-gray-400">Materi Matematika</span>
                </div>
                <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Lihat Materi
                </button>
              </div>
            </div>
          </section>

          {/* Populer Section */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Populer</h2>
            <div className="bg-white rounded-lg shadow p-5 border border-gray-100">
              <ul className="divide-y">
                <li className="py-3">
                  <a href="#" className="flex items-start">
                    <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center mr-4">
                      <span className="text-gray-500 text-xs">PDF</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Modul Matematika Kelas 5</h4>
                      <p className="text-xs text-gray-500">Diunduh 120 kali</p>
                    </div>
                  </a>
                </li>
                <li className="py-3">
                  <a href="#" className="flex items-start">
                    <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center mr-4">
                      <span className="text-gray-500 text-xs">PDF</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Modul IPA Kelas 4</h4>
                      <p className="text-xs text-gray-500">Diunduh 98 kali</p>
                    </div>
                  </a>
                </li>
                <li className="py-3">
                  <a href="#" className="flex items-start">
                    <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center mr-4">
                      <span className="text-gray-500 text-xs">PDF</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Modul Bahasa Inggris Kelas 3</h4>
                      <p className="text-xs text-gray-500">Diunduh 85 kali</p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
