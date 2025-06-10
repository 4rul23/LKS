"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import withAuth from "@/components/auth/withAuth";

function DataUserPage() {
  const { user } = useAuth();
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filter states
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    role: "",
  });

  // API Base URL
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

  // Fetch users data
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("auth_token");
      const queryParams = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await fetch(
        `${API_BASE_URL}/admin/users?${queryParams}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setUserList(data.data.data || []);
      } else {
        throw new Error(data.message || "Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(error.message);
      setUserList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  // Format date untuk tampilan yang lebih readable
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Handle status change
  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("auth_token");

      const response = await fetch(`${API_BASE_URL}/admin/users/${id}/status`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();

      if (data.success) {
        alert("Status berhasil diupdate!");
        fetchUsers();
      } else {
        throw new Error(data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error: " + error.message);
    }
  };

  // Handle delete user
  const handleDelete = async (id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus user ini?")) return;

    try {
      const token = localStorage.getItem("auth_token");

      const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();

      if (data.success) {
        alert("User berhasil dihapus!");
        fetchUsers();
      } else {
        throw new Error(data.message || "Failed to delete data");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Error Display */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="text-red-500 text-sm">
              <strong>Error:</strong> {error}
            </div>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Data User</h1>
          <p className="text-gray-600">
            Halaman Data Sesi Soal dan Skor - Data user yang telah melakukan
            registrasi
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">
          Filter Data
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cari User
            </label>
            <input
              type="text"
              placeholder="Nama atau email..."
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
              <option value="suspend">Suspend</option>
              <option value="tidak_aktif">Tidak Aktif</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              value={filters.role}
              onChange={(e) => setFilters({ ...filters, role: e.target.value })}
            >
              <option value="">Semua Role</option>
              <option value="admin">Admin</option>
              <option value="siswa">Siswa</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => fetchUsers()}
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
              <h3 className="text-lg font-semibold text-gray-900">Data User</h3>
              <p className="text-sm text-gray-600">
                Total {userList.length} user terdaftar
              </p>
            </div>
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
                    Nama
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal Daftar
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {userList.length > 0 ? (
                  userList.map((userData, index) => (
                    <tr
                      key={userData.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <div>
                            <div className="font-medium text-gray-900">
                              {userData.name}
                            </div>
                            <div className="text-gray-500 text-xs">
                              {userData.email}
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <span
                                className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                                  userData.role === "admin"
                                    ? "bg-purple-100 text-purple-800"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {userData.role === "admin" ? "Admin" : "Siswa"}
                              </span>
                              <span
                                className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                                  userData.status === "aktif"
                                    ? "bg-green-100 text-green-800"
                                    : userData.status === "suspend"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {userData.status === "aktif"
                                  ? "Aktif"
                                  : userData.status === "suspend"
                                  ? "Suspend"
                                  : "Tidak Aktif"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>
                          <div className="font-medium">
                            {formatDate(userData.created_at)}
                          </div>
                          <div className="text-xs text-gray-400">
                            Last login:{" "}
                            {userData.last_login_at
                              ? formatDate(userData.last_login_at)
                              : "Belum pernah login"}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex flex-col space-y-1">
                          <select
                            value={userData.status}
                            onChange={(e) =>
                              handleStatusChange(userData.id, e.target.value)
                            }
                            disabled={userData.id === user?.id}
                            className={`px-3 py-1 rounded text-xs font-medium border focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                              userData.status === "aktif"
                                ? "bg-green-50 border-green-200 text-green-800"
                                : userData.status === "suspend"
                                ? "bg-yellow-50 border-yellow-200 text-yellow-800"
                                : "bg-red-50 border-red-200 text-red-800"
                            }`}
                          >
                            <option value="aktif">Update</option>
                            <option value="suspend">Suspend</option>
                            <option value="tidak_aktif">Hapus</option>
                          </select>

                          {userData.id !== user?.id && (
                            <button
                              onClick={() => handleDelete(userData.id)}
                              className="text-red-600 hover:text-red-900 transition-colors duration-150 font-medium text-xs"
                            >
                              Hapus
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center">
                        <div className="text-gray-400 text-lg mb-2">
                          Tidak ada data user
                        </div>
                        <p className="text-sm">
                          Tidak ada user yang sesuai dengan filter
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

      {/* Pagination Info (simple) */}
      {userList.length > 0 && (
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-700">
            Menampilkan {userList.length} user dari total data yang tersedia
          </div>
          <div className="flex space-x-2">
            <span className="text-sm text-gray-500">Previous</span>
            <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded">
              1
            </span>
            <span className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded">
              2
            </span>
            <span className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded">
              3
            </span>
            <span className="text-sm text-gray-500">Next</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default withAuth(DataUserPage, {
  requireAuth: true,
  allowedRoles: ["admin"],
  redirectTo: "/login",
});
