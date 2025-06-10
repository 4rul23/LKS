"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function BlogPage() {
  const [informasiList, setInformasiList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch informasi data
  const fetchInformasi = async (search = "", page = 1) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (search) queryParams.append("search", search);
      queryParams.append("limit", "10");
      queryParams.append("page", page.toString());

      const response = await fetch(
        `http://localhost:8000/api/informasi?${queryParams}`
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setInformasiList(data.data);
          setError(null);
        } else {
          setError("Gagal mengambil data informasi");
        }
      } else {
        setError("Gagal mengambil data informasi");
      }
    } catch (error) {
      console.error("Error fetching informasi:", error);
      setError("Terjadi kesalahan saat mengambil data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInformasi(searchTerm, currentPage);
  }, [searchTerm, currentPage]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchInformasi(searchTerm, 1);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Truncate content
  const truncateContent = (content, maxLength = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  if (loading && informasiList.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4 sm:py-6 lg:py-8">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4 sm:py-6 lg:py-8">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="text-red-500 text-lg mb-2">Error</div>
            <p className="text-gray-600">{error}</p>
            <button
              onClick={() => fetchInformasi(searchTerm, currentPage)}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-center">
            Informasi Terbaru
          </h1>
          <p className="text-gray-600 text-center text-sm sm:text-base">
            Dapatkan informasi terbaru seputar pembelajaran dan kegiatan sekolah
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari informasi..."
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                🔍
              </button>
            </div>
          </form>
        </div>

        {/* Content */}
        {informasiList.data && informasiList.data.length > 0 ? (
          <>
            {/* Informasi Cards */}
            <div className="grid gap-6 md:gap-8">
              {informasiList.data.map((informasi) => (
                <div
                  key={informasi.id}
                  className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8 hover:shadow-md transition-shadow"
                >
                  {/* Header */}
                  <div className="mb-4 sm:mb-6">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                      {informasi.judul}
                    </h2>
                    <div className="flex items-center text-gray-600 text-xs sm:text-sm">
                      <span>{formatDate(informasi.created_at)}</span>
                      {informasi.creator && (
                        <>
                          <span className="mx-2">•</span>
                          <span>Oleh {informasi.creator.name}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="prose max-w-none text-gray-700">
                    <div
                      className="text-sm sm:text-base leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: truncateContent(informasi.konten),
                      }}
                    />
                  </div>

                  {/* Read More Button */}
                  {informasi.konten.length > 200 && (
                    <div className="mt-4">
                      <Link
                        href={`/blog/${informasi.id}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        Baca Selengkapnya →
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Pagination */}
            {informasiList.last_page > 1 && (
              <div className="mt-8 flex justify-center">
                <div className="flex space-x-2">
                  {/* Previous Button */}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    Previous
                  </button>

                  {/* Page Numbers */}
                  {Array.from(
                    { length: Math.min(5, informasiList.last_page) },
                    (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-4 py-2 border rounded-lg transition-colors ${
                            currentPage === pageNum
                              ? "bg-blue-600 text-white border-blue-600"
                              : "border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                  )}

                  {/* Next Button */}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(prev + 1, informasiList.last_page)
                      )
                    }
                    disabled={currentPage === informasiList.last_page}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="text-gray-400 text-lg mb-2">
              Tidak ada informasi ditemukan
            </div>
            <p className="text-gray-600 text-sm">
              {searchTerm
                ? `Tidak ada hasil untuk "${searchTerm}"`
                : "Belum ada informasi yang tersedia"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
