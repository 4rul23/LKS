"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import withAuth from "@/components/auth/withAuth";

function DataSoalPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("list");
  const [soalList, setSoalList] = useState([]);
  const [materiList, setMateriList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // New state for viewing soal details
  const [selectedMateri, setSelectedMateri] = useState(null);
  const [showSoalModal, setShowSoalModal] = useState(false);

  // Filter states
  const [filters, setFilters] = useState({
    search: "",
    materi_id: "",
    tingkat_kesulitan: "",
    status: "",
  });

  // Multi soal form data
  const [multiSoalData, setMultiSoalData] = useState({
    materi_id: "",
    tingkat_kesulitan: "mudah",
    status: "draft",
    soal_list: [
      {
        id: 1,
        pertanyaan: "",
        pilihan_a: "",
        pilihan_b: "",
        pilihan_c: "",
        pilihan_d: "",
        jawaban_benar: "a",
      },
    ],
  });

  // Single soal form data (for edit)
  const [formData, setFormData] = useState({
    materi_id: "",
    pertanyaan: "",
    pilihan_a: "",
    pilihan_b: "",
    pilihan_c: "",
    pilihan_d: "",
    jawaban_benar: "a",
    tingkat_kesulitan: "mudah",
    status: "draft",
  });

  // Fetch soal data
  const fetchSoal = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("auth_token");
      const queryParams = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await fetch(
        `http://localhost:8000/api/admin/soal?${queryParams}`,
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
          setSoalList(data.data.data);
        }
      }
    } catch (error) {
      console.error("Error fetching soal:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch materi list for dropdown
  const fetchMateriList = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch(
        "http://localhost:8000/api/admin/soal-materi-list",
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
          setMateriList(data.data);
        }
      }
    } catch (error) {
      console.error("Error fetching materi:", error);
    }
  };

  useEffect(() => {
    fetchSoal();
  }, [filters]);

  useEffect(() => {
    fetchMateriList();
  }, []);

  // Add new soal to list
  const addSoal = () => {
    const newId = Math.max(...multiSoalData.soal_list.map((s) => s.id)) + 1;
    setMultiSoalData({
      ...multiSoalData,
      soal_list: [
        ...multiSoalData.soal_list,
        {
          id: newId,
          pertanyaan: "",
          pilihan_a: "",
          pilihan_b: "",
          pilihan_c: "",
          pilihan_d: "",
          jawaban_benar: "a",
        },
      ],
    });
  };

  // Remove soal from list
  const removeSoal = (id) => {
    if (multiSoalData.soal_list.length > 1) {
      setMultiSoalData({
        ...multiSoalData,
        soal_list: multiSoalData.soal_list.filter((soal) => soal.id !== id),
      });
    }
  };

  // Update soal in list
  const updateSoal = (id, field, value) => {
    setMultiSoalData({
      ...multiSoalData,
      soal_list: multiSoalData.soal_list.map((soal) =>
        soal.id === id ? { ...soal, [field]: value } : soal
      ),
    });
  };

  // Handle multi soal submit
  const handleMultiSoalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("auth_token");

      // Validate all soal
      const isValid = multiSoalData.soal_list.every(
        (soal) =>
          soal.pertanyaan &&
          soal.pilihan_a &&
          soal.pilihan_b &&
          soal.pilihan_c &&
          soal.pilihan_d
      );

      if (!isValid) {
        alert("Harap lengkapi semua field soal!");
        setLoading(false);
        return;
      }

      // Submit each soal
      const promises = multiSoalData.soal_list.map((soal) => {
        const soalData = {
          materi_id: multiSoalData.materi_id,
          pertanyaan: soal.pertanyaan,
          pilihan_a: soal.pilihan_a,
          pilihan_b: soal.pilihan_b,
          pilihan_c: soal.pilihan_c,
          pilihan_d: soal.pilihan_d,
          jawaban_benar: soal.jawaban_benar,
          tingkat_kesulitan: multiSoalData.tingkat_kesulitan,
          status: multiSoalData.status,
        };

        return fetch("http://localhost:8000/api/admin/soal", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(soalData),
        });
      });

      const results = await Promise.all(promises);
      const allSuccess = results.every((response) => response.ok);

      if (allSuccess) {
        alert(`${multiSoalData.soal_list.length} soal berhasil disimpan!`);
        resetMultiSoalForm();
        setActiveTab("list");
        fetchSoal();
      } else {
        alert("Beberapa soal gagal disimpan. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error saving soal:", error);
      alert("Terjadi kesalahan saat menyimpan soal");
    } finally {
      setLoading(false);
    }
  };

  // Handle single soal submit (for edit)
  const handleSingleSoalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch(
        `http://localhost:8000/api/admin/soal/${editingId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Soal berhasil diupdate!");
        resetSingleSoalForm();
        setActiveTab("list");
        fetchSoal();
      } else {
        const errorData = await response.json();
        alert("Error: " + errorData.message);
      }
    } catch (error) {
      console.error("Error updating soal:", error);
      alert("Terjadi kesalahan saat mengupdate soal");
    } finally {
      setLoading(false);
    }
  };

  // Reset multi soal form
  const resetMultiSoalForm = () => {
    setMultiSoalData({
      materi_id: "",
      tingkat_kesulitan: "mudah",
      status: "draft",
      soal_list: [
        {
          id: 1,
          pertanyaan: "",
          pilihan_a: "",
          pilihan_b: "",
          pilihan_c: "",
          pilihan_d: "",
          jawaban_benar: "a",
        },
      ],
    });
  };

  // Reset single soal form
  const resetSingleSoalForm = () => {
    setFormData({
      materi_id: "",
      pertanyaan: "",
      pilihan_a: "",
      pilihan_b: "",
      pilihan_c: "",
      pilihan_d: "",
      jawaban_benar: "a",
      tingkat_kesulitan: "mudah",
      status: "draft",
    });
    setEditingId(null);
  };

  // Handle edit
  const handleEdit = (soal) => {
    setFormData({
      materi_id: soal.materi_id,
      pertanyaan: soal.pertanyaan,
      pilihan_a: soal.pilihan_a,
      pilihan_b: soal.pilihan_b,
      pilihan_c: soal.pilihan_c,
      pilihan_d: soal.pilihan_d,
      jawaban_benar: soal.jawaban_benar,
      tingkat_kesulitan: soal.tingkat_kesulitan,
      status: soal.status,
    });
    setEditingId(soal.id);
    setActiveTab("edit");
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus soal ini?")) return;

    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch(
        `http://localhost:8000/api/admin/soal/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("Soal berhasil dihapus!");
        fetchSoal();
      }
    } catch (error) {
      console.error("Error deleting soal:", error);
      alert("Terjadi kesalahan saat menghapus soal");
    }
  };

  // Update the table rendering part - ubah bagian ini
  const renderTable = () => {
    if (loading) {
      return (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    if (soalList.length === 0) {
      return (
        <tr>
          <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
            <div className="flex flex-col items-center">
              <div className="text-gray-400 text-lg mb-2">
                Tidak ada data soal
              </div>
              <p className="text-sm">Mulai dengan menambahkan soal baru</p>
            </div>
          </td>
        </tr>
      );
    }

    return soalList.map((materiGroup, index) => (
      <tr
        key={materiGroup.id}
        className="hover:bg-gray-50 transition-colors duration-150"
      >
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          #{index + 1}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          <div className="font-medium">
            {materiGroup.materi
              ? materiGroup.materi.judul_materi
              : "Tidak ada materi"}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          <div className="flex items-center">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
              {materiGroup.jumlah_soal || 1} soal
            </span>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          <span
            className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
              materiGroup.tingkat_kesulitan === "mudah"
                ? "bg-green-100 text-green-800"
                : materiGroup.tingkat_kesulitan === "sedang"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {materiGroup.tingkat_kesulitan?.charAt(0).toUpperCase() +
              materiGroup.tingkat_kesulitan?.slice(1) || "Mudah"}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          <span
            className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
              materiGroup.status === "aktif"
                ? "bg-green-100 text-green-800"
                : materiGroup.status === "draft"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {materiGroup.status?.charAt(0).toUpperCase() +
              materiGroup.status?.slice(1) || "Draft"}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {materiGroup.tanggal_dibuat || materiGroup.created_at}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <div className="flex space-x-3">
            <button
              onClick={() => handleViewSoalList(materiGroup)}
              className="text-blue-600 hover:text-blue-900 transition-colors duration-150 font-medium"
            >
              Lihat Soal
            </button>
            <button
              onClick={() => handleEditMateri(materiGroup)}
              className="text-green-600 hover:text-green-900 transition-colors duration-150 font-medium"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteMateri(materiGroup.id)}
              className="text-red-600 hover:text-red-900 transition-colors duration-150 font-medium"
            >
              Hapus
            </button>
          </div>
        </td>
      </tr>
    ));
  };

  // Add missing handler functions
  const handleViewSoalList = async (materiGroup) => {
    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch(
        `http://localhost:8000/api/admin/soal/materi/${materiGroup.id}`,
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
          setSelectedMateri({
            ...materiGroup,
            soal_list: data.data,
          });
          setShowSoalModal(true);
        }
      }
    } catch (error) {
      console.error("Error fetching soal list:", error);
      alert("Terjadi kesalahan saat mengambil daftar soal");
    }
  };

  const handleEditMateri = (materiGroup) => {
    // For now, we'll edit the first question in the group
    // You can modify this to show a selection modal
    if (materiGroup.soal_list && materiGroup.soal_list.length > 0) {
      handleEdit(materiGroup.soal_list[0]);
    } else {
      // Fetch soal list first
      handleViewSoalList(materiGroup);
    }
  };

  const handleDeleteMateri = async (materiId) => {
    if (
      !confirm("Apakah Anda yakin ingin menghapus semua soal dalam materi ini?")
    )
      return;

    setLoading(true);
    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch(
        `http://localhost:8000/api/admin/soal/materi/${materiId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("Semua soal dalam materi berhasil dihapus!");
        fetchSoal();
      } else {
        const errorData = await response.json();
        alert("Error: " + errorData.message);
      }
    } catch (error) {
      console.error("Error deleting materi soal:", error);
      alert("Terjadi kesalahan saat menghapus soal");
    } finally {
      setLoading(false);
    }
  };

  // Handle edit individual soal
  const handleEditSoal = (soal) => {
    setFormData({
      materi_id: soal.materi_id,
      pertanyaan: soal.pertanyaan,
      pilihan_a: soal.pilihan_a,
      pilihan_b: soal.pilihan_b,
      pilihan_c: soal.pilihan_c,
      pilihan_d: soal.pilihan_d,
      jawaban_benar: soal.jawaban_benar,
      tingkat_kesulitan: soal.tingkat_kesulitan,
      status: soal.status,
    });
    setEditingId(soal.id);
    setShowSoalModal(false);
    setActiveTab("edit");
  };

  // Handle delete individual soal
  const handleDeleteSoal = async (soalId) => {
    if (!confirm("Apakah Anda yakin ingin menghapus soal ini?")) return;

    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch(
        `http://localhost:8000/api/admin/soal/${soalId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("Soal berhasil dihapus!");
        // Refresh the soal list in modal
        if (selectedMateri) {
          handleViewSoalList(selectedMateri);
        }
        fetchSoal(); // Refresh main list
      }
    } catch (error) {
      console.error("Error deleting soal:", error);
      alert("Terjadi kesalahan saat menghapus soal");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Page Header */}
      <div className="mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Management Soal
          </h1>
          <p className="text-gray-600">
            Kelola dan organisir soal pilihan ganda untuk pembelajaran
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
                resetMultiSoalForm();
                resetSingleSoalForm();
              }}
              className={`px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                activeTab === "list"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              Daftar Soal
            </button>
            <button
              onClick={() => setActiveTab("create")}
              className={`px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                activeTab === "create"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              Tambah Soal
            </button>
            {editingId && (
              <button
                onClick={() => setActiveTab("edit")}
                className={`px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                  activeTab === "edit"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                Edit Soal
              </button>
            )}
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
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cari Soal
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
                  Materi
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={filters.materi_id}
                  onChange={(e) =>
                    setFilters({ ...filters, materi_id: e.target.value })
                  }
                >
                  <option value="">Semua Materi</option>
                  {materiList.map((materi) => (
                    <option key={materi.id} value={materi.id}>
                      {materi.judul_materi}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tingkat Kesulitan
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={filters.tingkat_kesulitan}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      tingkat_kesulitan: e.target.value,
                    })
                  }
                >
                  <option value="">Semua Tingkat</option>
                  <option value="mudah">Mudah</option>
                  <option value="sedang">Sedang</option>
                  <option value="sulit">Sulit</option>
                </select>
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
                  onClick={() => fetchSoal()}
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
                    Data Soal
                  </h3>
                  <p className="text-sm text-gray-600">
                    Total {soalList.length} kelompok soal tersimpan
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("create")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Tambah Soal Baru
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
                        Materi
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Jumlah Soal
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tingkat Kesulitan
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tanggal Dibuat
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {soalList.length > 0 ? (
                      soalList.map((materiGroup, index) => (
                        <tr
                          key={materiGroup.id}
                          className="hover:bg-gray-50 transition-colors duration-150"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #{index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="font-medium">
                              {materiGroup.materi
                                ? materiGroup.materi.judul_materi
                                : "Tidak ada materi"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex items-center">
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                                {materiGroup.jumlah_soal || 1} soal
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <span
                              className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                                materiGroup.tingkat_kesulitan === "mudah"
                                  ? "bg-green-100 text-green-800"
                                  : materiGroup.tingkat_kesulitan === "sedang"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {materiGroup.tingkat_kesulitan
                                ?.charAt(0)
                                .toUpperCase() +
                                materiGroup.tingkat_kesulitan?.slice(1) ||
                                "Mudah"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <span
                              className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                                materiGroup.status === "aktif"
                                  ? "bg-green-100 text-green-800"
                                  : materiGroup.status === "draft"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {materiGroup.status?.charAt(0).toUpperCase() +
                                materiGroup.status?.slice(1) || "Draft"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {materiGroup.tanggal_dibuat ||
                              materiGroup.created_at}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-3">
                              <button
                                onClick={() => handleViewSoalList(materiGroup)}
                                className="text-blue-600 hover:text-blue-900 transition-colors duration-150 font-medium"
                              >
                                Lihat Soal
                              </button>
                              <button
                                onClick={() => handleEditMateri(materiGroup)}
                                className="text-green-600 hover:text-green-900 transition-colors duration-150 font-medium"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteMateri(materiGroup.id)
                                }
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
                          colSpan="7"
                          className="px-6 py-12 text-center text-gray-500"
                        >
                          <div className="flex flex-col items-center">
                            <div className="text-gray-400 text-lg mb-2">
                              Tidak ada data soal
                            </div>
                            <p className="text-sm">
                              Mulai dengan menambahkan soal baru
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

      {/* Soal Detail Modal */}
      {showSoalModal && selectedMateri && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-96 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Daftar Soal - {selectedMateri.materi?.judul_materi}
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedMateri.soal_list?.length || 0} soal tersimpan
                </p>
              </div>
              <button
                onClick={() => setShowSoalModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="overflow-y-auto max-h-80">
              {selectedMateri.soal_list?.map((soal, index) => (
                <div
                  key={soal.id}
                  className="px-6 py-4 border-b border-gray-100 hover:bg-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium mr-3">
                          Soal #{index + 1}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            soal.tingkat_kesulitan === "mudah"
                              ? "bg-green-100 text-green-800"
                              : soal.tingkat_kesulitan === "sedang"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {soal.tingkat_kesulitan}
                        </span>
                        <span
                          className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                            soal.status === "aktif"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {soal.status}
                        </span>
                      </div>
                      <p className="text-gray-900 font-medium mb-2">
                        {soal.pertanyaan}
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                        <div>A. {soal.pilihan_a}</div>
                        <div>B. {soal.pilihan_b}</div>
                        <div>C. {soal.pilihan_c}</div>
                        <div>D. {soal.pilihan_d}</div>
                      </div>
                      <p className="text-sm text-green-600 mt-2">
                        Jawaban: {soal.jawaban_benar.toUpperCase()}
                      </p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEditSoal(soal)}
                        className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteSoal(soal.id)}
                        className="text-red-600 hover:text-red-900 text-sm font-medium"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Create Tab - Multi Soal */}
      {activeTab === "create" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Tambah Soal Baru
            </h3>
            <p className="text-gray-600">
              Buat beberapa soal sekaligus dengan pengaturan yang sama
            </p>
          </div>

          <form onSubmit={handleMultiSoalSubmit} className="space-y-8">
            {/* Global Settings */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-4">
                Pengaturan Global
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Materi <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={multiSoalData.materi_id}
                    onChange={(e) =>
                      setMultiSoalData({
                        ...multiSoalData,
                        materi_id: e.target.value,
                      })
                    }
                  >
                    <option value="">Pilih Materi</option>
                    {materiList.map((materi) => (
                      <option key={materi.id} value={materi.id}>
                        {materi.judul_materi}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tingkat Kesulitan
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={multiSoalData.tingkat_kesulitan}
                    onChange={(e) =>
                      setMultiSoalData({
                        ...multiSoalData,
                        tingkat_kesulitan: e.target.value,
                      })
                    }
                  >
                    <option value="mudah">Mudah</option>
                    <option value="sedang">Sedang</option>
                    <option value="sulit">Sulit</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={multiSoalData.status}
                    onChange={(e) =>
                      setMultiSoalData({
                        ...multiSoalData,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="draft">Draft</option>
                    <option value="aktif">Aktif</option>
                    <option value="tidak_aktif">Tidak Aktif</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Soal List */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-gray-900">Daftar Soal</h4>
                  <p className="text-sm text-gray-600">
                    {multiSoalData.soal_list.length} soal akan dibuat
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addSoal}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors duration-200 font-medium"
                >
                  Tambah Soal
                </button>
              </div>

              {multiSoalData.soal_list.map((soal, index) => (
                <div
                  key={soal.id}
                  className="border border-gray-300 rounded-xl p-6 bg-gray-50"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h5 className="font-medium text-gray-900 text-lg">
                      Soal #{index + 1}
                    </h5>
                    {multiSoalData.soal_list.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSoal(soal.id)}
                        className="text-red-600 hover:text-red-800 transition-colors duration-150 px-3 py-1 rounded-lg hover:bg-red-50 font-medium"
                      >
                        Hapus
                      </button>
                    )}
                  </div>

                  {/* Question */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pertanyaan <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                      placeholder="Masukkan pertanyaan soal..."
                      value={soal.pertanyaan}
                      onChange={(e) =>
                        updateSoal(soal.id, "pertanyaan", e.target.value)
                      }
                    />
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pilihan A <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                        placeholder="Masukkan pilihan A"
                        value={soal.pilihan_a}
                        onChange={(e) =>
                          updateSoal(soal.id, "pilihan_a", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pilihan B <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                        placeholder="Masukkan pilihan B"
                        value={soal.pilihan_b}
                        onChange={(e) =>
                          updateSoal(soal.id, "pilihan_b", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pilihan C <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                        placeholder="Masukkan pilihan C"
                        value={soal.pilihan_c}
                        onChange={(e) =>
                          updateSoal(soal.id, "pilihan_c", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pilihan D <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                        placeholder="Masukkan pilihan D"
                        value={soal.pilihan_d}
                        onChange={(e) =>
                          updateSoal(soal.id, "pilihan_d", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {/* Correct Answer */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Jawaban Benar <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { value: "a", label: "Pilihan A" },
                        { value: "b", label: "Pilihan B" },
                        { value: "c", label: "Pilihan C" },
                        { value: "d", label: "Pilihan D" },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className="flex items-center cursor-pointer p-3 border border-gray-300 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          <input
                            type="radio"
                            name={`jawaban_benar_${soal.id}`}
                            value={option.value}
                            checked={soal.jawaban_benar === option.value}
                            onChange={(e) =>
                              updateSoal(
                                soal.id,
                                "jawaban_benar",
                                e.target.value
                              )
                            }
                            className="mr-3 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm font-medium text-gray-700">
                            {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("list");
                  resetMultiSoalForm();
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
                    Menyimpan...
                  </>
                ) : (
                  <>Simpan {multiSoalData.soal_list.length} Soal</>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Tab - Single Soal */}
      {activeTab === "edit" && editingId && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Edit Soal
            </h3>
            <p className="text-gray-600">
              Perbarui informasi soal yang dipilih
            </p>
          </div>

          <form onSubmit={handleSingleSoalSubmit} className="space-y-6">
            {/* Materi Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Materi <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={formData.materi_id}
                  onChange={(e) =>
                    setFormData({ ...formData, materi_id: e.target.value })
                  }
                >
                  <option value="">Pilih Materi</option>
                  {materiList.map((materi) => (
                    <option key={materi.id} value={materi.id}>
                      {materi.judul_materi}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tingkat Kesulitan
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={formData.tingkat_kesulitan}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tingkat_kesulitan: e.target.value,
                    })
                  }
                >
                  <option value="mudah">Mudah</option>
                  <option value="sedang">Sedang</option>
                  <option value="sulit">Sulit</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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

            {/* Question */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pertanyaan <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                placeholder="Masukkan pertanyaan soal..."
                value={formData.pertanyaan}
                onChange={(e) =>
                  setFormData({ ...formData, pertanyaan: e.target.value })
                }
              />
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pilihan A <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  placeholder="Masukkan pilihan A"
                  value={formData.pilihan_a}
                  onChange={(e) =>
                    setFormData({ ...formData, pilihan_a: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pilihan B <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  placeholder="Masukkan pilihan B"
                  value={formData.pilihan_b}
                  onChange={(e) =>
                    setFormData({ ...formData, pilihan_b: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pilihan C <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  placeholder="Masukkan pilihan C"
                  value={formData.pilihan_c}
                  onChange={(e) =>
                    setFormData({ ...formData, pilihan_c: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pilihan D <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  placeholder="Masukkan pilihan D"
                  value={formData.pilihan_d}
                  onChange={(e) =>
                    setFormData({ ...formData, pilihan_d: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Correct Answer */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Jawaban Benar <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: "a", label: "Pilihan A" },
                  { value: "b", label: "Pilihan B" },
                  { value: "c", label: "Pilihan C" },
                  { value: "d", label: "Pilihan D" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center cursor-pointer p-3 border border-gray-300 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <input
                      type="radio"
                      name="jawaban_benar"
                      value={option.value}
                      checked={formData.jawaban_benar === option.value}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          jawaban_benar: e.target.value,
                        })
                      }
                      className="mr-3 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("list");
                  resetSingleSoalForm();
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
                    Mengupdate...
                  </>
                ) : (
                  <>Update Soal</>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default withAuth(DataSoalPage, {
  requireAuth: true,
  allowedRoles: ["admin"],
  redirectTo: "/login",
});
