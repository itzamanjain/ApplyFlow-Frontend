const API_BASE_URL = process.env.VITE_API_BASE_URL  // Replace with your FastAPI server URL

let full_text = ''
export const uploadResume = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${API_BASE_URL}/upload-pdf`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Failed to upload resume')
  }

  const data = await response.json()
  full_text = data.full_text
  return full_text
}

export const askQuestion = async (question: string, full_text: string): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/ask-question`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question, pdf_text: full_text }),
  })

  if (!response.ok) {
    throw new Error('Failed to get answer')
  }

  const data = await response.json()
  return data.answer
}

