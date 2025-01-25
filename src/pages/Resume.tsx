"use client"

import React, { useState } from "react"
import ResumeUploader from "@/components/ResumeUploader"
import Chatbox from "@/components/Chatbox"
import { useStorage } from "@/hooks/useStorage"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function Resume() {
  const [resumeText, setResumeText] = useStorage<string>("resumeText", "")
  const [isResumeUploaded, setIsResumeUploaded] = useState<boolean>(!!resumeText)

  const handleResumeUpload = (text: string) => {
    setResumeText(text)
    setIsResumeUploaded(true)
  }

  return (
    <>
      
    
    <div className="min-h-screen overflow-hidden flex bg-black flex-col items-center justify-center px-4">
      <main className="w-full max-w-4xl bg-black rounded-xl overflow-hidden">
        <header className="text-center p-6">
          <h1 className="text-3xl font-bold text-white mb-3">Resume AI Assistant</h1>
          {!isResumeUploaded && (
            <p className="text-sm text-black">
              Upload your resume to get started with AI-powered job application assistance.
            </p>
          )}
        </header>

        <div className="p-6">
          {!isResumeUploaded ? (
            <ResumeUploader onUpload={handleResumeUpload} />
          ) : (
            <div className="space-y-6">
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  onClick={() => setIsResumeUploaded(false)}
                  className="text-sm text-black bg-white hover:text-gray-800 transition"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Change Resume
                </Button>
              </div>
              <Chatbox resumeText={resumeText} />
            </div>
          )}
        </div>
      </main>
      <footer className="w-full text-center mt-6">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} ApplyFlow | All rights reserved</p>
        </div>
      </footer>
    </div>
    </>
  )
}

