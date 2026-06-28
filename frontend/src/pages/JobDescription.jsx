import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function JobDescription() {
  const [jobDescription, setJobDescription] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [company, setCompany] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [error, setError] = useState('')
  const [charCount, setCharCount] = useState(0)
  const navigate = useNavigate()

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setJobDescription(text)
      setCharCount(text.length)
    } catch (err) {
      setError('Could not access clipboard. Please paste manually.')
    }
  }

  const handleClear = () => {
    setJobDescription('')
    setCharCount(0)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (jobDescription.trim().length < 50) {
      setError('Job description is too short. Please enter at least 50 characters.')
      return
    }

    setAnalyzing(true)
    setError('')

    try {
      const token = localStorage.getItem('token')
      const resumeId = localStorage.getItem('currentResumeId')

      const response = await axios.post(
      'http://localhost:8000/job-description',
      {
      description: jobDescription
      }
  )

      // Store analysis result
      localStorage.setItem('jobId', response.data.job_id)

      navigate('/results')
    } catch (err) {
      setError(err.response?.data?.detail || 'Analysis failed. Please try again.')
    } finally {
      setAnalyzing(false)
    }
  }

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
            <button
              onClick={() => navigate('/dashboard')}
              className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Add Job Description</h2>
          <p className="text-gray-600 mt-2 text-lg">
            Paste the job description to compare with your resume
          </p>
        </div>

        {/* Steps Indicator */}
        <div className="flex items-center justify-center mb-10">
          <div className="flex items-center">
            <div className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
              ✓
            </div>
            <span className="ml-2 text-green-600 font-medium">Uploaded</span>
          </div>
          <div className="w-16 h-1 bg-blue-600 mx-4"></div>
          <div className="flex items-center">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <span className="ml-2 font-medium text-blue-600">Job Description</span>
          </div>
          <div className="w-16 h-1 bg-gray-300 mx-4"></div>
          <div className="flex items-center">
            <div className="bg-gray-300 text-gray-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <span className="ml-2 text-gray-500">Results</span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Job Title & Company */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Job Title
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="e.g., Software Engineer"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Company (Optional)
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="e.g., Google"
              />
            </div>
          </div>

          {/* Job Description Text Area */}
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <label className="text-gray-700 text-sm font-semibold">
                Job Description *
              </label>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={handlePaste}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer"
                >
                  📋 Paste from Clipboard
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-red-600 hover:text-red-800 text-sm font-medium cursor-pointer"
                >
                  Clear
                </button>
              </div>
            </div>
            <textarea
              value={jobDescription}
              onChange={(e) => {
                setJobDescription(e.target.value)
                setCharCount(e.target.value.length)
              }}
              className="w-full h-64 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
              placeholder="Paste the full job description here...&#10;&#10;Include requirements, qualifications, responsibilities, and any other relevant details."
              required
            ></textarea>
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-gray-500">
                {charCount} characters
              </p>
              {charCount < 50 && charCount > 0 && (
                <p className="text-sm text-orange-500">
                  Minimum 50 characters required
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={analyzing}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {analyzing ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing Resume...
              </span>
            ) : (
              'Analyze Resume'
            )}
          </button>
        </form>
      </main>
    </div>
  )
}

export default JobDescription