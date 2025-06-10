"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MateriPage() {
  const [activeSection, setActiveSection] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [materiList, setMateriList] = useState([]);
  const [selectedMateri, setSelectedMateri] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

  // Fetch daftar materi yang tersedia
  useEffect(() => {
    const fetchMateri = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/materi`);
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setMateriList(data.data);
            // Set materi pertama sebagai default
            if (data.data.length > 0) {
              setSelectedMateri(data.data[0]);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching materi:", error);
      }
    };

    fetchMateri();
  }, []);

  // Fetch quizzes berdasarkan materi yang dipilih
  useEffect(() => {
    const fetchQuizzes = async () => {
      if (!user || !selectedMateri) return;

      try {
        setLoading(true);
        const token = localStorage.getItem("auth_token");

        const response = await fetch(
          `${API_BASE_URL}/quiz/materi/${selectedMateri.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setQuizzes(data.data);
          }
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [user, selectedMateri]);

  // Toggle section visibility
  const toggleSection = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  // Handle quiz start
  const handleStartQuiz = (quizId) => {
    if (!user) {
      alert("Silakan login terlebih dahulu untuk mengerjakan soal!");
      router.push("/login");
      return;
    }

    router.push(`/quiz/${quizId}`);
  };

  // Show login prompt for quiz section
  const QuizLoginPrompt = () => (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
      <p className="text-yellow-800 mb-3">
        🔒 Silakan login untuk mengerjakan soal latihan
      </p>
      <Link
        href="/login"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        Login Sekarang
      </Link>
    </div>
  );

  // Get difficulty badge color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "mudah":
        return "bg-green-100 text-green-700";
      case "sedang":
        return "bg-yellow-100 text-yellow-700";
      case "sulit":
        return "bg-red-100 text-red-700";
      case "campuran":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Main Content */}
      <div className="p-4 sm:p-6 lg:p-8 max-w-full mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column - Main Content */}
          <div className="xl:col-span-8">
            <div className="bg-white rounded-2xl shadow-xl border border-blue-100/50 p-4 sm:p-6 lg:p-8">
              {/* Header */}
              <div className="mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {selectedMateri
                        ? selectedMateri.judul_materi
                        : "Materi Pembelajaran"}
                    </h1>
                    {selectedMateri && (
                      <p className="text-lg text-gray-700 mt-1">
                        {selectedMateri.judul_bab_materi}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                      Kelas 2A
                    </span>
                    {user && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                        👤 {user.name}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 text-sm sm:text-base">
                  Pelajari materi pembelajaran dengan mudah dan kerjakan soal
                  latihan untuk mengasah kemampuan.
                  {!user && (
                    <span className="block mt-2 text-amber-600 font-medium">
                      📖 Materi dapat dibaca bebas, namun untuk mengerjakan soal
                      diperlukan login.
                    </span>
                  )}
                </p>
              </div>

              {/* Pilihan Materi */}
              {materiList.length > 1 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Pilih Materi:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {materiList.map((materi) => (
                      <button
                        key={materi.id}
                        onClick={() => setSelectedMateri(materi)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          selectedMateri?.id === materi.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-blue-300 bg-white"
                        }`}
                      >
                        <h4 className="font-semibold text-gray-900">
                          {materi.judul_materi}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {materi.judul_bab_materi}
                        </p>
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                            materi.status === "aktif"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {materi.status === "aktif" ? "Tersedia" : "Draft"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Konten Materi */}
              {selectedMateri && (
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleSection("materi")}
                      className="w-full p-4 sm:p-6 bg-gray-50 hover:bg-gray-100 transition-all duration-200 text-left"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
                            {selectedMateri.judul_bab_materi}
                          </h2>
                          <p className="text-sm text-gray-600">
                            Materi Pembelajaran •{" "}
                            {selectedMateri.tanggal_dibuat}
                          </p>
                        </div>
                        <svg
                          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                            activeSection === "materi" ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </button>

                    {activeSection === "materi" && (
                      <div className="p-4 sm:p-6">
                        <div className="prose max-w-none">
                          <div
                            className="text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: selectedMateri.isi_bab_materi,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="mt-8 sm:mt-12 pt-6 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-center text-sm space-y-2 sm:space-y-0">
                  <div className="text-gray-500">
                    © 2025 SIGMEA - Sistem Informasi Manajemen Sekolah
                  </div>
                  <div className="text-gray-500">
                    {selectedMateri
                      ? selectedMateri.judul_materi
                      : "Materi Pembelajaran"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="xl:col-span-4 space-y-6">
            {/* Soal Latihan Section */}
            <section>
              <h2 className="text-xl font-bold text-black mb-4 sm:mb-6">
                Soal Latihan
              </h2>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100/50 p-4 sm:p-6">
                {!user ? (
                  <QuizLoginPrompt />
                ) : !selectedMateri ? (
                  <div className="text-center py-4 text-gray-500">
                    <p className="text-sm">Pilih materi terlebih dahulu</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {loading ? (
                      <div className="text-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-2 text-sm text-gray-600">
                          Memuat soal latihan...
                        </p>
                      </div>
                    ) : quizzes.length > 0 ? (
                      <>
                        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-800 font-medium">
                            📚 {selectedMateri.judul_bab_materi}
                          </p>
                          <p className="text-xs text-blue-600">
                            {quizzes.length} jenis latihan tersedia
                          </p>
                        </div>

                        {quizzes.map((quiz, index) => (
                          <div key={quiz.id} className="group">
                            <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold text-gray-900 group-hover:text-black text-sm">
                                  {quiz.title}
                                </h3>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                                    quiz.difficulty
                                  )}`}
                                >
                                  {quiz.difficulty === "campuran"
                                    ? "Campuran"
                                    : quiz.difficulty.charAt(0).toUpperCase() +
                                      quiz.difficulty.slice(1)}
                                </span>
                              </div>
                              <p className="text-xs text-gray-600 mb-2">
                                {quiz.description}
                              </p>
                              <p className="text-xs text-gray-500 mb-3">
                                {quiz.total_questions} soal • {quiz.time_limit}{" "}
                                menit
                                {quiz.available_questions && (
                                  <span className="ml-2 text-green-600">
                                    • {quiz.available_questions} soal tersedia
                                  </span>
                                )}
                              </p>
                              <button
                                onClick={() => handleStartQuiz(quiz.id)}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all"
                              >
                                Mulai Latihan
                              </button>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        <div className="mb-3">📝</div>
                        <p className="text-sm font-medium mb-1">
                          Belum ada soal latihan
                        </p>
                        <p className="text-xs">
                          Soal latihan akan muncul setelah admin menambahkan
                          soal untuk materi ini
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>

            {/* Progress Section */}
            <section>
              <h2 className="text-xl font-bold text-black mb-4 sm:mb-6">
                Progress Belajar
              </h2>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100/50 p-4 sm:p-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-3">
                      <span className="text-2xl font-bold text-blue-600">
                        {selectedMateri && materiList.length > 0
                          ? Math.round((1 / materiList.length) * 100)
                          : 0}
                        %
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {selectedMateri ? "Materi Dibaca" : "Belum Dimulai"}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Materi tersedia</span>
                      <span className="font-medium">{materiList.length}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: selectedMateri
                            ? `${(1 / Math.max(materiList.length, 1)) * 100}%`
                            : "0%",
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Quiz tersedia</span>
                      <span className="font-medium">{quizzes.length}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: quizzes.length > 0 ? "100%" : "0%",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
