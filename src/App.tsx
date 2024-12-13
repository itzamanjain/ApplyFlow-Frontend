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
      <>
          <div className="w-full max-w-4xl bg-white  rounded-xl ">
        <header className="text-center">
          <h1 className="text-2xl  font-bold text-gray-800 mb-3">
            Resume AI Assistent
          </h1>
          {!isResumeUploaded && (
            <p className="text-sm  text-gray-600 mb-2">
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
      <footer className="w-full text-center mt-3 ">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-md text-gray-600 font-medium">
            © {new Date().getFullYear()} ApplyFlow | All right reserved
          </p>
        </div>
      </footer>
      </>
    
  );
};

export default App;