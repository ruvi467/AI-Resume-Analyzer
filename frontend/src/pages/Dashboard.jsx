import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    
    if (!token || !userData) {
      navigate('/login')
      return
    }
    
    setUser(JSON.parse(userData))
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📄</span>
              <h1 className="text-xl font-bold text-gray-800">Resume Analyzer</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition cursor-pointer text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome back, {user.name}! 👋
          </h2>
          <p className="text-gray-600 mt-2 text-lg">
            Ready to improve your resume?
          </p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Analyses */}
          <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Analyses</p>
                <p className="text-4xl font-bold text-gray-800 mt-2">0</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-4">All time</p>
          </div>

          {/* Average Score */}
          <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Average Score</p>
                <p className="text-4xl font-bold text-gray-300 mt-2">--</p>
              </div>
              <div className="bg-green-100 p-3 rounded-xl">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-4">ATS Score</p>
          </div>

          {/* Best Score */}
          <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Best Score</p>
                <p className="text-4xl font-bold text-gray-300 mt-2">--</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-xl">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-4">Personal best</p>
          </div>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Upload Resume Card */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-8 hover:scale-[1.02] transition cursor-pointer text-white"
               onClick={() => alert('Upload feature coming in Day 3!')}>
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-4 rounded-xl">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold">Upload Resume</h3>
                <p className="text-blue-100 mt-1">Analyze your resume against job descriptions</p>
              </div>
            </div>
          </div>

          {/* Job Description Card */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-8 hover:scale-[1.02] transition cursor-pointer text-white"
               onClick={() => alert('Job description feature coming soon!')}>
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-4 rounded-xl">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold">Add Job Description</h3>
                <p className="text-green-100 mt-1">Paste a job description to compare</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Analyses */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Recent Analyses</h3>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer">
              View All →
            </button>
          </div>
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-gray-500 text-lg font-medium">No analyses yet</p>
            <p className="text-gray-400 mt-2">Upload your first resume to get started!</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard