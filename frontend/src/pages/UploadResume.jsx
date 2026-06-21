import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function UploadResume() {
  const [file, setFile] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)
  const navigate = useNavigate()

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.type === 'application/pdf') {
        setFile(droppedFile)
        setError('')
      } else {
        setError('Please upload a PDF file only!')
      }
    }
  }

  // Handle file selection via button
  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile)
        setError('')
      } else {
        setError('Please upload a PDF file only!')
      }
    }
  }

  // Handle upload
  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first!')
      return
    }

    setUploading(true)
    setError('')

    const formData = new FormData()
    formData.append('resume', file)

    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(
        'http://localhost:8000/api/upload-resume',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        }
      )

      setUploadSuccess(true)
      
      // Store the resume ID for later use
      localStorage.setItem('currentResumeId', response.data.resume_id)
      
      // Redirect to job description page after 2 seconds
      setTimeout(() => {
        navigate('/job-description')
      }, 2000)

    } catch (err) {
      setError(err.response?.data?.detail || 'Upload failed. Please try again.')
    } finally {
      setUploading(false)
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

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Upload Your Resume</h2>
          <p className="text-gray-600 mt-2 text-lg">
            Upload your PDF resume to analyze it against job descriptions
          </p>
        </div>

        {/* Steps Indicator */}
        <div className="flex items-center justify-center mb-10">
          <div className="flex items-center">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <span className="ml-2 font-medium text-blue-600">Upload Resume</span>
          </div>
          <div className="w-16 h-1 bg-gray-300 mx-4"></div>
          <div className="flex items-center">
            <div className="bg-gray-300 text-gray-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <span className="ml-2 text-gray-500">Job Description</span>
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

        {/* Success Message */}
        {uploadSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl mb-6">
            ✅ Resume uploaded successfully! Redirecting to Job Description page...
          </div>
        )}

        {/* Upload Area */}
        {!uploadSuccess && (
          <div
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
              dragActive
                ? 'border-blue-500 bg-blue-50'
                : file
                ? 'border-green-500 bg-green-50'
                : 'border-gray-300 bg-white hover:border-blue-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {!file ? (
              <>
                {/* Upload Icon */}
                <div className="mb-6">
                  <svg
                    className="w-20 h-20 text-gray-400 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>

                <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                  Drag & Drop your resume here
                </h3>
                <p className="text-gray-500 mb-6 text-lg">or</p>

                <button
                  onClick={() => fileInputRef.current.click()}
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition cursor-pointer"
                >
                  Browse Files
                </button>

                <p className="text-gray-400 mt-6 text-sm">
                  Supported format: PDF (Max 5MB)
                </p>
              </>
            ) : (
              <>
                {/* File Selected */}
                <div className="mb-6">
                  <svg
                    className="w-20 h-20 text-green-500 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>

                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {file.name}
                </h3>
                <p className="text-gray-500 mb-2">
                  {(file.size / 1024).toFixed(1)} KB
                </p>

                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => setFile(null)}
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition cursor-pointer"
                  >
                    Remove
                  </button>
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="bg-blue-600 text-white px-8 py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {uploading ? 'Uploading...' : 'Upload Resume'}
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Tips Section */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">💡 Tips for a Good Resume</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              Use clear section headings (Experience, Education, Skills)
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              Include relevant keywords from the job description
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              Keep it to 1-2 pages
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              Use standard fonts (Arial, Calibri, Times New Roman)
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              Save as PDF for best formatting
            </li>
          </ul>
        </div>
      </main>
    </div>
  )
}

export default UploadResume