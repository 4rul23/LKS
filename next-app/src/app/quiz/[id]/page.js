"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import withAuth from "@/components/auth/withAuth";

function QuizPage() {
  const { id: quizId } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [attemptId, setAttemptId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

  // Start quiz
  useEffect(() => {
    const startQuiz = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await fetch(`${API_BASE_URL}/quiz/${quizId}/start`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setQuiz(data.data.quiz);
            setQuestions(data.data.questions);
            setAttemptId(data.data.attempt_id);
            setTimeLeft(data.data.time_limit * 60); // Convert to seconds
          }
        } else {
          const error = await response.json();
          alert(error.message || "Failed to start quiz");
          router.push("/daftar-isi");
        }
      } catch (error) {
        console.error("Error starting quiz:", error);
        alert("Failed to start quiz");
        router.push("/daftar-isi");
      } finally {
        setLoading(false);
      }
    };

    if (user && quizId) {
      startQuiz();
    }
  }, [user, quizId]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && quiz) {
      handleFinishQuiz();
    }
  }, [timeLeft]);

  // Handle answer selection
  const handleAnswerSelect = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  // Submit single answer
  const submitAnswer = async (questionId, answer) => {
    try {
      const token = localStorage.getItem("auth_token");
      await fetch(`${API_BASE_URL}/quiz/attempt/${attemptId}/answer`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          soal_id: questionId,
          answer: answer,
          time_taken: Math.floor(Math.random() * 30) + 10, // Random time between 10-40 seconds
        }),
      });
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  // Next question
  const handleNextQuestion = () => {
    const currentQuestionData = questions[currentQuestion];
    const selectedAnswer = answers[currentQuestionData.id];

    if (selectedAnswer) {
      submitAnswer(currentQuestionData.id, selectedAnswer);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleFinishQuiz();
    }
  };

  // Previous question
  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Finish quiz
  const handleFinishQuiz = async () => {
    if (submitting) return;

    setSubmitting(true);

    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch(
        `${API_BASE_URL}/quiz/attempt/${attemptId}/finish`,
        {
          method: "POST",
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
          router.push(
            `/quiz/${quizId}/result?score=${data.data.score}&correct=${data.data.correct_answers}&total=${data.data.total_questions}`
          );
        }
      }
    } catch (error) {
      console.error("Error finishing quiz:", error);
    }
  };

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat quiz...</p>
        </div>
      </div>
    );
  }

  if (!quiz || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Quiz tidak ditemukan</p>
          <button
            onClick={() => router.push("/daftar-isi")}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{quiz.title}</h1>
              <p className="text-sm text-gray-600">
                Soal {currentQuestion + 1} dari {questions.length}
              </p>
            </div>
            <div className="text-right">
              <div
                className={`text-2xl font-bold ${
                  timeLeft < 300 ? "text-red-600" : "text-blue-600"
                }`}
              >
                {formatTime(timeLeft)}
              </div>
              <p className="text-xs text-gray-500">Waktu tersisa</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            {currentQuestionData.pertanyaan}
          </h2>

          <div className="space-y-3">
            {["a", "b", "c", "d"].map((option) => {
              const optionText = currentQuestionData[`pilihan_${option}`];
              const isSelected = answers[currentQuestionData.id] === option;

              return (
                <button
                  key={option}
                  onClick={() =>
                    handleAnswerSelect(currentQuestionData.id, option)
                  }
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    isSelected
                      ? "border-blue-500 bg-blue-50 text-blue-900"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="flex items-center">
                    <span
                      className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center text-sm font-medium ${
                        isSelected
                          ? "border-blue-500 bg-blue-500 text-white"
                          : "border-gray-300"
                      }`}
                    >
                      {option.toUpperCase()}
                    </span>
                    <span>{optionText}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            className={`px-6 py-2 rounded-lg font-medium ${
              currentQuestion === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            ← Sebelumnya
          </button>

          <div className="text-sm text-gray-500">
            {Object.keys(answers).length} dari {questions.length} soal dijawab
          </div>

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleFinishQuiz}
              disabled={submitting}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium disabled:opacity-50"
            >
              {submitting ? "Menyelesaikan..." : "Selesai"}
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
            >
              Selanjutnya →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default withAuth(QuizPage, {
  requireAuth: true,
  allowedRoles: ["siswa"],
  redirectTo: "/login",
});
