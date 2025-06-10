"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import withAuth from "@/components/auth/withAuth";

function DataMateriPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("list");
  const [materiList, setMateriList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    judul_materi: "",
    judul_bab_materi: "",
    isi_bab_materi: "",
    status: "draft",
  });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch materi data
  const fetchMateri = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch(
        `http://localhost:8000/api/admin/materi?search=${searchTerm}`,
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
          console.log("Materi data:", data.data.data); // Debug log
          setMateriList(data.data.data);
        }
      } else {
        console.error("Failed to fetch materi:", response.status);
        const errorData = await response.json();
        console.error("Error details:", errorData);
      }
    } catch (error) {
      console.error("Error fetching materi:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMateri();
  }, [searchTerm]);

  // Format date helper function - hanya tanggal tanpa jam
  const formatDateOnly = (dateString) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "-";
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("auth_token");
      const url = editingId
        ? `http://localhost:8000/api/admin/materi/${editingId}`
        : "http://localhost:8000/api/admin/materi";

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
        const data = await response.json();
        if (data.success) {
          alert(
            editingId ? "Materi berhasil diupdate!" : "Materi berhasil dibuat!"
          );
          setFormData({
            judul_materi: "",
            judul_bab_materi: "",
            isi_bab_materi: "",
            status: "draft",
          });
          setEditingId(null);
          setActiveTab("list");
          fetchMateri();
        }
      } else {
        const errorData = await response.json();
        alert("Error: " + errorData.message);
      }
    } catch (error) {
      console.error("Error saving materi:", error);
      alert("Terjadi kesalahan saat menyimpan materi");
    } finally {
      setLoading(false);
    }
  };

  // Handle edit
  const handleEdit = (materi) => {
    setFormData({
      judul_materi: materi.judul_materi,
      judul_bab_materi: materi.judul_bab_materi,
      isi_bab_materi: materi.isi_bab_materi,
      status: materi.status,
    });
    setEditingId(materi.id);
    setActiveTab("create");
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus materi ini?")) return;

    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch(
        `http://localhost:8000/api/admin/materi/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("Materi berhasil dihapus!");
        fetchMateri();
      }
    } catch (error) {
      console.error("Error deleting materi:", error);
      alert("Terjadi kesalahan saat menghapus materi");
    }
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Data Materi</h1>
        <p className="text-gray-600">Kelola materi pembelajaran</p>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => {
                setActiveTab("list");
                setEditingId(null);
                setFormData({
                  judul_materi: "",
                  judul_bab_materi: "",
                  isi_bab_materi: "",
                  status: "draft",
                });
              }}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "list"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Daftar Materi
            </button>
            <button
              onClick={() => setActiveTab("create")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "create"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {editingId ? "Edit Materi" : "Tambah Materi"}
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      {activeTab === "list" && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Daftar Materi</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Cari materi..."
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                onClick={() => setActiveTab("create")}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
              >
                + Tambah Materi
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      No
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Judul Materi
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Judul Bab
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Tanggal Dibuat
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {materiList.length > 0 ? (
                    materiList.map((materi, index) => (
                      <tr key={materi.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">{index + 1}</td>
                        <td className="px-4 py-3 text-sm font-medium">
                          {materi.judul_materi}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {materi.judul_bab_materi}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              materi.status === "aktif"
                                ? "bg-green-100 text-green-800"
                                : materi.status === "draft"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {materi.status.charAt(0).toUpperCase() +
                              materi.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="text-gray-900">
                            {formatDateOnly(materi.created_at) || "-"}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(materi)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(materi.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                        Tidak ada data materi
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === "create" && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingId ? "Edit Materi" : "Tambah Materi Baru"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Judul Materi
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan judul materi"
                  value={formData.judul_materi}
                  onChange={(e) =>
                    setFormData({ ...formData, judul_materi: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                >
                  <option value="draft">Draft</option>
                  <option value="aktif">Aktif</option>
                  <option value="tidak_aktif">Tidak Aktif</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul Bab Materi
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Masukkan judul bab materi"
                value={formData.judul_bab_materi}
                onChange={(e) =>
                  setFormData({ ...formData, judul_bab_materi: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Isi Bab Materi
              </label>
              <textarea
                rows={8}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Masukkan isi bab materi lengkap..."
                value={formData.isi_bab_materi}
                onChange={(e) =>
                  setFormData({ ...formData, isi_bab_materi: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("list");
                  setEditingId(null);
                  setFormData({
                    judul_materi: "",
                    judul_bab_materi: "",
                    isi_bab_materi: "",
                    status: "draft",
                  });
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading
                  ? "Menyimpan..."
                  : editingId
                  ? "Update Materi"
                  : "Simpan Materi"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default withAuth(DataMateriPage, {
  requireAuth: true,
  allowedRoles: ["admin"],
  redirectTo: "/login",
});