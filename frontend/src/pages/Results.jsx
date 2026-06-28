import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Results() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

 useEffect(() => {
  const fetchResults = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/match'
      )

      setResult(response.data)
      const analyses =
        JSON.parse(localStorage.getItem('analyses')) || []

      analyses.push(response.data)

      localStorage.setItem(
        'analyses',
        JSON.stringify(analyses)
      )
      localStorage.setItem(
        "analysisResult",
        JSON.stringify(response.data)
      )
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  fetchResults()
}, [])

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-green-100'
    if (score >= 60) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading results...</p>
        </div>
      </div>
    )
  }

  // Demo data if backend not connected yet
  const demoResult = {
    ats_score: 75,
    skills_found: ['JavaScript', 'React', 'Python', 'SQL', 'Git'],
    skills_missing: ['Docker', 'AWS', 'TypeScript'],
    match_percentage: 72,
    suggestions: [
      'Add more keywords from the job description',
      'Quantify your achievements with numbers',
      'Include relevant certifications',
      'Use action verbs at the start of bullet points'
    ],
    section_scores: {
      experience: 80,
      skills: 70,
      education: 85,
      formatting: 75
    }
  }

  const displayResult = result
  console.log(displayResult)
  ? {
      ...result,
      section_scores: {
        experience: result.ats_score,
        skills: result.ats_score,
        education: result.ats_score,
        formatting: result.ats_score
      }
    }
  : demoResult

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📄</span>
              <h1 className="text-xl font-bold text-gray-800">Resume Analyzer</h1>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate('/upload-resume')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
              >
                New Analysis
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ATS Score Hero */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Your ATS Score</h2>
          <div className="flex justify-center mb-6">
            <div className="relative">
              <svg className="w-48 h-48" viewBox="0 0 120 120">
                <circle
                  cx="60" cy="60" r="54"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                />
                <circle
                  cx="60" cy="60" r="54"
                  fill="none"
                  stroke={displayResult.ats_score >= 80 ? '#10b981' : displayResult.ats_score >= 60 ? '#f59e0b' : '#ef4444'}
                  strokeWidth="12"
                  strokeDasharray={`${(displayResult.ats_score / 100) * 339.292} 339.292`}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-5xl font-bold ${getScoreColor(displayResult.ats_score)}`}>
                  {displayResult.ats_score}%
                </span>
              </div>
            </div>
          </div>
          <p className={`text-lg font-semibold ${getScoreColor(displayResult.ats_score)}`}>
            {displayResult.ats_score >= 80 ? 'Excellent! Your resume is ATS-friendly 🎉' :
             displayResult.ats_score >= 60 ? 'Good, but there\'s room for improvement 📝' :
             'Needs improvement to pass ATS filters ⚠️'}
          </p>
        </div>

        {/* Section Scores */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(displayResult.section_scores || {}).map(([key, value]) => (
            <div key={key} className="bg-white rounded-xl shadow-sm border p-4 text-center">
              <p className="text-gray-500 text-sm capitalize mb-2">{key}</p>
              <p className={`text-2xl font-bold ${getScoreColor(value)}`}>{value}%</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Skills Found */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">✅ Skills Found</h3>
            <div className="flex flex-wrap gap-2">
              {displayResult.matched_skills?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Skills Missing */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">⚠️ Skills to Add</h3>
            <div className="flex flex-wrap gap-2">
              {displayResult.missing_skills?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">💡 Improvement Suggestions</h3>
          <ul className="space-y-3">
            {displayResult.suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-3 mt-1">•</span>
                <span className="text-gray-700">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Match Percentage */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mt-8 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Job Match Percentage</h3>
          <p className="text-4xl font-bold text-blue-600">{displayResult.match_percentage}%</p>
          <p className="text-gray-500 mt-2">How well your resume matches the job description</p>
        </div>
      </main>
    </div>
  )
}

export default Results