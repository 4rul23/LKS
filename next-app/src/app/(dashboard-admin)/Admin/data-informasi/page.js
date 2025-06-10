"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import withAuth from "@/components/auth/withAuth";

function DataInformasiPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("list");
  const [informasiList, setInformasiList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Filter states
  const [filters, setFilters] = useState({
    search: "",
    status: "",
  });

  // Form data
  const [formData, setFormData] = useState({
    judul: "",
    konten: "",
    status: "draft",
  });

  // Fetch informasi data
  const fetchInformasi = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("auth_token");
      const queryParams = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await fetch(
        `http://localhost:8000/api/admin/informasi?${queryParams}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setInformasiList(data.data.data);
        }
      }
    } catch (error) {
      console.error("Error fetching informasi:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInformasi();
  }, [filters]);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("auth_token");
      const url = editingId
        ? `http://localhost:8000/api/admin/informasi/${editingId}`
        : "http://localhost:8000/api/admin/informasi";
      
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(editingId ? "Informasi berhasil diupdate!" : "Informasi berhasil dibuat!");
        resetForm();
        setActiveTab("list");
        fetchInformasi();
      } else {
        const errorData = await response.json();
        alert("Error: " + errorData.message);
      }
    } catch (error) {
      console.error("Error saving informasi:", error);
      alert("Terjadi kesalahan saat menyimpan informasi");
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      judul: "",
      konten: "",
      status: "draft",
    });
    setEditingId(null);
  };

  // Handle edit
  const handleEdit = (informasi) => {
    setFormData({
      judul: informasi.judul,
      konten: informasi.konten,
      status: informasi.status,
    });
    setEditingId(informasi.id);
    setActiveTab("form");
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus informasi ini?")) return;

    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch(
        `http://localhost:8000/api/admin/informasi/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("Informasi berhasil dihapus!");
        fetchInformasi();
      }
    } catch (error) {
      console.error("Error deleting informasi:", error);
      alert("Terjadi kesalahan saat menghapus informasi");
    }
  };

  // Handle status change
  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch(
        `http://localhost:8000/api/admin/informasi/${id}/status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        alert("Status berhasil diupdate!");
        fetchInformasi();
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Terjadi kesalahan saat mengupdate status");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Page Header */}
      <div className="mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Management Informasi
          </h1>
          <p className="text-gray-600">
            Kelola informasi yang akan ditampilkan kepada pengunjung
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1">
          <nav className="flex space-x-1">
            <button
              onClick={() => {
                setActiveTab("list");
                resetForm();
              }}
              className={`px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                activeTab === "list"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              Daftar Informasi
            </button>
            <button
              onClick={() => setActiveTab("form")}
              className={`px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                activeTab === "form"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {editingId ? "Edit Informasi" : "Tambah Informasi"}
            </button>
          </nav>
        </div>
      </div>

      {/* List Tab */}
      {activeTab === "list" && (
        <>
          {/* Filter Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Filter Data
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cari Informasi
                </label>
                <input
                  type="text"
                  placeholder="Masukkan kata kunci..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={filters.search}
                  onChange={(e) =>
                    setFilters({ ...filters, search: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={filters.status}
                  onChange={(e) =>
                    setFilters({ ...filters, status: e.target.value })
                  }
                >
                  <option value="">Semua Status</option>
                  <option value="aktif">Aktif</option>
                  <option value="draft">Draft</option>
                  <option value="tidak_aktif">Tidak Aktif</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => fetchInformasi()}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Terapkan Filter
                </button>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Data Informasi
                  </h3>
                  <p className="text-sm text-gray-600">
                    Total {informasiList.length} informasi tersimpan
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("form")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Tambah Informasi Baru
                </button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Judul
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dibuat Oleh
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tanggal
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {informasiList.length > 0 ? (
                      informasiList.map((informasi, index) => (
                        <tr
                          key={informasi.id}
                          className="hover:bg-gray-50 transition-colors duration-150"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #{index + 1}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            <div className="font-medium max-w-xs truncate">
                              {informasi.judul}
                            </div>
                            <div className="text-gray-500 text-xs mt-1 max-w-xs truncate">
                              {informasi.konten.substring(0, 100)}...
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <select
                              value={informasi.status}
                              onChange={(e) =>
                                handleStatusChange(informasi.id, e.target.value)
                              }
                              className={`px-3 py-1 rounded-full text-xs font-medium border-0 focus:ring-2 focus:ring-blue-500 ${
                                informasi.status === "aktif"
                                  ? "bg-green-100 text-green-800"
                                  : informasi.status === "draft"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              <option value="aktif">Aktif</option>
                              <option value="draft">Draft</option>
                              <option value="tidak_aktif">Tidak Aktif</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {informasi.creator?.name || "Unknown"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(informasi.created_at).toLocaleDateString('id-ID')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-3">
                              <button
                                onClick={() => handleEdit(informasi)}
                                className="text-blue-600 hover:text-blue-900 transition-colors duration-150 font-medium"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(informasi.id)}
                                className="text-red-600 hover:text-red-900 transition-colors duration-150 font-medium"
                              >
                                Hapus
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="6"
                          className="px-6 py-12 text-center text-gray-500"
                        >
                          <div className="flex flex-col items-center">
                            <div className="text-gray-400 text-lg mb-2">
                              Tidak ada data informasi
                            </div>
                            <p className="text-sm">
                              Mulai dengan menambahkan informasi baru
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* Form Tab */}
      {activeTab === "form" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {editingId ? "Edit Informasi" : "Tambah Informasi Baru"}
            </h3>
            <p className="text-gray-600">
              {editingId 
                ? "Perbarui informasi yang dipilih"
                : "Buat informasi baru untuk ditampilkan kepada pengunjung"
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Masukkan judul informasi..."
                value={formData.judul}
                onChange={(e) =>
                  setFormData({ ...formData, judul: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Konten <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={10}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                placeholder="Masukkan konten informasi..."
                value={formData.konten}
                onChange={(e) =>
                  setFormData({ ...formData, konten: e.target.value })
                }
              />
              <p className="text-sm text-gray-500 mt-1">
                Anda bisa menggunakan HTML tags untuk formatting
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option value="draft">Draft</option>
                <option value="aktif">Aktif</option>
                <option value="tidak_aktif">Tidak Aktif</option>
              </select>
              <p className="text-sm text-gray-500 mt-1">
                Hanya informasi dengan status "Aktif" yang akan ditampilkan ke pengunjung
              </p>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("list");
                  resetForm();
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200 flex items-center font-medium"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {editingId ? "Mengupdate..." : "Menyimpan..."}
                  </>
                ) : (
                  <>{editingId ? "Update Informasi" : "Simpan Informasi"}</>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default withAuth(DataInformasiPage, {
  requireAuth: true,
  allowedRoles: ["admin"],
  redirectTo: "/login",
});