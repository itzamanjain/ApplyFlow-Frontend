import React, { useState, useRef } from 'react'
import { uploadResume } from '../api'

interface ResumeUploaderProps {
  onUpload: (text: string) => void
}

const ResumeUploader: React.FC<ResumeUploaderProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [dragActive, setDragActive] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile)
    } else {
      alert('Please select a PDF file.')
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
    } else {
      alert('Please select a PDF file.')
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    try {
      const extractedText = await uploadResume(file)
      onUpload(extractedText)
    } catch (error) {
      console.error('Error uploading resume:', error)
      alert('Failed to upload resume. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Upload Your Resume
        </h2>
        
        <div 
          className={`relative border-2 border-dashed rounded-lg p-8 text-center
            ${dragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300'}
            ${file ? 'bg-green-50 border-green-500' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          
          <div className="space-y-4">
            <div className="flex justify-center">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            
            {file ? (
              <p className="text-green-600 font-medium">{file.name}</p>
            ) : (
              <>
                <p className="text-gray-600">
                  Drag and drop your resume here, or{' '}
                  <button 
                    onClick={() => inputRef.current?.click()}
                    className="text-primary-600 hover:text-primary-500 font-medium"
                  >
                    browse
                  </button>
                </p>
                <p className="text-sm text-gray-500">PDF files only</p>
              </>
            )}
          </div>
        </div>

        <button
          onClick={handleUpload}
          disabled={!file || isUploading}
          className={`
            w-full mt-6 px-4 py-3 rounded-lg font-medium text-white
            transition-all duration-200 transform hover:scale-[1.02]
            ${!file || isUploading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-primary-600 hover:bg-primary-700 shadow-lg hover:shadow-xl'
            }
          `}
        >
          {isUploading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </div>
          ) : (
            'Upload Resume'
          )}
        </button>
      </div>
    </div>
  )
}

export default ResumeUploader

