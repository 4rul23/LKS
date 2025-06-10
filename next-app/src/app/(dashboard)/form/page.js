"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function QuizFormPage() {
  const [activeNav, setActiveNav] = useState('form-soal');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes in seconds
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  // Sample user data
  const userData = {
    name: "Nisaa Trisani",
    role: "Pelajar Sekolah Dasar",
    avatarUrl: "/avatar-placeholder.png",
  };

  // Sample quiz data
  const quizData = {
    id: 101,
    title: "Ulangan Harian Bahasa Indonesia",
    subject: "Bahasa Indonesia",
    class: "Kelas 2A",
    totalQuestions: 5,
    timeAllowed: 60, // minutes
    questions: [
      {
        id: 1,
        text: "Apa arti kata 'gelisah'?",
        type: "multiple-choice",
        options: [
          { id: 'a', text: "Tenang" },
          { id: 'b', text: "Tidak tenang" },
          { id: 'c', text: "Gembira" },
          { id: 'd', text: "Sedih" }
        ]
      },
      {
        id: 2,
        text: "Kalimat berikut yang menggunakan tanda baca dengan benar adalah...",
        type: "multiple-choice",
        options: [
          { id: 'a', text: "Ibu berkata ayo kita makan" },
          { id: 'b', text: "Ibu berkata: \"Ayo kita makan!\"" },
          { id: 'c', text: "Ibu berkata, ayo kita makan." },
          { id: 'd', text: "Ibu berkata; ayo kita makan!" }
        ]
      },
      {
        id: 3,
        text: "Ayah pergi ke pasar membeli sayur. Kata 'pasar' dalam kalimat tersebut merupakan...",
        type: "multiple-choice",
        options: [
          { id: 'a', text: "Kata kerja" },
          { id: 'b', text: "Kata sifat" },
          { id: 'c', text: "Kata benda" },
          { id: 'd', text: "Kata keterangan" }
        ]
      },
      {
        id: 4,
        text: "Pernyataan \"Matahari terbit dari arah timur\" adalah benar.",
        type: "true-false"
      },
      {
        id: 5,
        text: "Sebutkan nama lengkap presiden pertama Indonesia!",
        type: "short-answer"
      }
    ]
  };

  // Timer functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          submitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time remaining
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle answer selection
  const handleAnswerChange = (value) => {
    setAnswers({
      ...answers,
      [quizData.questions[currentQuestion].id]: value
    });
  };

  // Navigation
  const goToPrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // Submit quiz
  const submitQuiz = () => {
    // Here you would typically send the answers to an API
    console.log('Quiz submitted:', answers);
    setIsFinished(true);
  };

  // Confirmation before submitting
  const confirmSubmit = () => {
    const totalAnswered = Object.keys(answers).length;
    const confirmed = window.confirm(
      `Anda telah menjawab ${totalAnswered} dari ${quizData.questions.length} soal. Yakin ingin mengumpulkan?`
    );

    if (confirmed) {
      submitQuiz();
    }
  };

  // Render different question types
  const renderQuestionContent = () => {
    const question = quizData.questions[currentQuestion];

    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {question.options.map((option) => (
              <div key={option.id} className="flex items-start">
                <input
                  type="radio"
                  id={`option-${option.id}`}
                  name={`question-${question.id}`}
                  checked={answers[question.id] === option.id}
                  onChange={() => handleAnswerChange(option.id)}
                  className="mt-1 mr-3"
                />
                <label htmlFor={`option-${option.id}`} className="text-gray-700">
                  {option.id.toUpperCase()}. {option.text}
                </label>
              </div>
            ))}
          </div>
        );

      case 'true-false':
        return (
          <div className="flex space-x-6">
            <div className="flex items-center">
              <input
                type="radio"
                id={`true-${question.id}`}
                name={`question-${question.id}`}
                checked={answers[question.id] === 'true'}
                onChange={() => handleAnswerChange('true')}
                className="mr-2"
              />
              <label htmlFor={`true-${question.id}`} className="text-gray-700">Benar</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id={`false-${question.id}`}
                name={`question-${question.id}`}
                checked={answers[question.id] === 'false'}
                onChange={() => handleAnswerChange('false')}
                className="mr-2"
              />
              <label htmlFor={`false-${question.id}`} className="text-gray-700">Salah</label>
            </div>
          </div>
        );

      case 'short-answer':
        return (
          <textarea
            placeholder="Tulis jawaban Anda di sini..."
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswerChange(e.target.value)}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
          ></textarea>
        );

      default:
        return null;
    }
  };

  // Quiz completion page
  if (isFinished) {
    return (
      <div className="min-h-screen flex bg-gray-50">
        {/* Sidebar - Same as before */}
        <div className="w-72 bg-white border-r border-gray-200 min-h-screen fixed">
          <div className="p-6 flex flex-col h-full">
            {/* Logo & App Name */}
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 relative rounded-lg bg-gray-100 flex items-center justify-center">
                <Image src="/logo.png" alt="LOSO Logo" fill className="object-contain p-1" />
              </div>
              <div className="ml-3">
                <h1 className="font-bold text-xl text-gray-900">LOSO</h1>
                <p className="text-xs text-gray-500">Learning Platform</p>
              </div>
            </div>

            {/* Dashboard Title */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-1">Form Soal</h2>
              <p className="text-sm text-gray-500">3. Pengerjaan Soal</p>
            </div>

            {/* User Profile */}
            <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex items-center">
                <div className="relative w-16 h-16 rounded-full bg-white border border-gray-200">
                  {userData.avatarUrl ? (
                    <Image src={userData.avatarUrl} alt={userData.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl text-gray-400">👤</div>
                  )}
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-800">{userData.name}</h3>
                  <p className="text-xs text-gray-500">{userData.role}</p>
                  <div className="mt-1 flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-gray-400 mr-1"></span>
                    <span className="text-xs text-gray-500">Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-2 mb-6">
              {[
                { name: 'dashboard', label: 'Dashboard', icon: '🏠' },
                { name: 'sesi-soal', label: 'Sesi Soal', icon: '📝' },
                { name: 'form-soal', label: 'Form Soal', icon: '📋' }
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveNav(item.name)}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-left
                    ${item.name === activeNav ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Logout Button */}
            <div className="mt-auto pt-6 border-t border-gray-200">
              <button className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 w-full px-4 py-3 rounded-lg text-left">
                <span>🚪</span>
                <span>Keluar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content - Quiz Completion */}
        <div className="ml-72 flex-1">
          <header className="bg-white border-b border-gray-200 sticky top-0 z-10 px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-gray-800">Ulangan Selesai</h1>
            </div>
          </header>

          <div className="p-6">
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">✓</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Ulangan Berhasil Dikumpulkan!</h2>
              <p className="text-gray-600 mb-6">
                Terima kasih telah menyelesaikan {quizData.title}. Hasil akan segera dinilai.
              </p>
              <p className="text-gray-500 mb-8">
                Anda telah menjawab {Object.keys(answers).length} dari {quizData.questions.length} soal.
              </p>
              <Link
                href="/soal"
                className="px-6 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-800 inline-block"
              >
                Kembali ke Daftar Sesi Soal
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-72 bg-white border-r border-gray-200 min-h-screen fixed">
        <div className="p-6 flex flex-col h-full">
          {/* Logo & App Name */}
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 relative rounded-lg bg-gray-100 flex items-center justify-center">
              <Image src="/logo.png" alt="LOSO Logo" fill className="object-contain p-1" />
            </div>
            <div className="ml-3">
              <h1 className="font-bold text-xl text-gray-900">LOSO</h1>
              <p className="text-xs text-gray-500">Learning Platform</p>
            </div>
          </div>

          {/* Dashboard Title */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-1">Form Soal</h2>
            <p className="text-sm text-gray-500">3. Pengerjaan Soal</p>
          </div>

          {/* User Profile */}
          <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex items-center">
              <div className="relative w-16 h-16 rounded-full bg-white border border-gray-200">
                {userData.avatarUrl ? (
                  <Image src={userData.avatarUrl} alt={userData.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl text-gray-400">👤</div>
                )}
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-800">{userData.name}</h3>
                <p className="text-xs text-gray-500">{userData.role}</p>
                <div className="mt-1 flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-gray-400 mr-1"></span>
                  <span className="text-xs text-gray-500">Online</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quiz Progress */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Progress Pengerjaan</h3>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
              <div
                className="h-2 rounded-full bg-gray-700"
                style={{ width: `${(Object.keys(answers).length / quizData.questions.length) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Terjawab: {Object.keys(answers).length}</span>
              <span>Total: {quizData.questions.length}</span>
            </div>
          </div>

          {/* Question Navigator */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Navigasi Soal</h3>
            <div className="grid grid-cols-5 gap-2">
              {quizData.questions.map((q, index) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-full h-8 text-xs font-medium rounded-md
                    ${index === currentQuestion
                      ? 'bg-gray-700 text-white'
                      : answers[q.id]
                        ? 'bg-gray-300 text-gray-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-auto pt-6 border-t border-gray-200">
            <button
              onClick={confirmSubmit}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
            >
              Kumpulkan
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-72 flex-1">
        {/* Header with Timer */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-800">{quizData.title}</h1>
              <p className="text-sm text-gray-500">{quizData.subject} - {quizData.class}</p>
            </div>
            <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg">
              <span className="text-gray-500 mr-2">⏱️</span>
              <span className="font-medium text-gray-800">{formatTime(timeRemaining)}</span>
            </div>
          </div>
        </header>

        {/* Question Content */}
        <div className="p-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            {/* Question Header */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
              <div className="text-sm font-medium text-gray-500">
                Soal {currentQuestion + 1} dari {quizData.questions.length}
              </div>
              <div className="text-sm text-gray-500">
                {quizData.questions[currentQuestion].type === 'multiple-choice' ? 'Pilihan Ganda' :
                 quizData.questions[currentQuestion].type === 'true-false' ? 'Benar/Salah' : 'Jawaban Singkat'}
              </div>
            </div>

            {/* Question */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                {quizData.questions[currentQuestion].text}
              </h3>

              {/* Optional Image would go here */}

              {/* Answer Options */}
              <div className="mt-4">
                {renderQuestionContent()}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4 border-t border-gray-100">
              <button
                onClick={goToPrevQuestion}
                disabled={currentQuestion === 0}
                className={`px-4 py-2 rounded-md ${
                  currentQuestion === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Soal Sebelumnya
              </button>

              <button
                onClick={goToNextQuestion}
                disabled={currentQuestion === quizData.questions.length - 1}
                className={`px-4 py-2 rounded-md ${
                  currentQuestion === quizData.questions.length - 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-700 text-white hover:bg-gray-800'
                }`}
              >
                Soal Berikutnya
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
