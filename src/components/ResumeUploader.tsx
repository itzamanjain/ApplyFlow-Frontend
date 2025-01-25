"use client"

import  React from "react"
import { useState, useRef } from "react"
import { uploadResume } from "../api"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, FileText, Check } from "lucide-react"

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
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile)
    } else {
      alert("Please select a PDF file.")
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile)
    } else {
      alert("Please select a PDF file.")
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    try {
      const extractedText = await uploadResume(file)
      onUpload(extractedText)
    } catch (error) {
      console.error("Error uploading resume:", error)
      alert("Failed to upload resume. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card className="w-full bg-black max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white text-center">Upload Your Resume</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`relative border-2 test-white border-dashed rounded-lg p-8 text-center transition-colors
            ${dragActive ? "border-primary bg-primary/10" : "border-muted"}
            ${file ? "bg-green-50 border-green-500" : ""}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Input ref={inputRef} type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />

          <div className="space-y-4">
            <div className="flex justify-center">
              {file ? (
                <Check className="w-16 h-16 text-green-500" />
              ) : (
                <Upload className="w-16 h-16 text-muted-foreground" />
              )}
            </div>

            {file ? (
              <p className="text-green-600 font-medium flex items-center justify-center">
                <FileText className="mr-2" />
                {file.name}
              </p>
            ) : (
              <>
                <p className="text-muted-foreground ">
                  Drag and drop your resume here, or{" "}
                  <Button variant="link" onClick={() => inputRef.current?.click()} className="p-0 h-auto text-white font-medium">
                    browse
                  </Button>
                </p>
                <p className="text-sm text-muted-foreground">PDF files only</p>
              </>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleUpload} disabled={!file || isUploading} className="w-full text-white bg-gray-700">
          {isUploading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            "Upload Resume"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ResumeUploader

