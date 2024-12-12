import React, { useState } from 'react';
import ResumeUploader from './components/ResumeUploader';
import Chatbox from './components/Chatbox';
import { useStorage } from './hooks/useStorage';

const App: React.FC = () => {
  const [resumeText, setResumeText] = useStorage<string>('resumeText', '');
  const [isResumeUploaded, setIsResumeUploaded] = useState<boolean>(!!resumeText);

  const handleResumeUpload = (text: string) => {
    setResumeText(text);
    setIsResumeUploaded(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl p-6">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-3">
            Resume AI Assistant
          </h1>
          {!isResumeUploaded && (
            <p className="text-lg text-gray-600">
              Upload your resume to get started with AI-powered job application assistance.
            </p>
          )}
        </header>

        {!isResumeUploaded ? (
          <ResumeUploader onUpload={handleResumeUpload} />
        ) : (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button
                onClick={() => setIsResumeUploaded(false)}
                className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Change Resume
              </button>
            </div>
            <Chatbox resumeText={resumeText} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;