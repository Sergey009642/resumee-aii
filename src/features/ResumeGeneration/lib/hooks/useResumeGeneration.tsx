import { useState } from "react";
import { notification } from "antd";
import { generateResumePrompt, GenerateResumePromptProps } from "../prompts/generateResumePrompt";

// Backend API base URL (Render / Vercel / Localhost)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

function useResumeGeneration() {
  const [api, contextHolder] = notification.useNotification();
  const [resumeGenerateLoading, setGenerateResumeLoading] = useState(false);

  // Fetch from backend API instead of directly using OpenAI in frontend
  async function getAIResponse(prompt: string) {
    setGenerateResumeLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/generate-resume`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setGenerateResumeLoading(false);
      return data.result;
    } catch (error) {
      console.error("Ошибка генерации резюме:", error);
      api.error({
        message: "Произошла ошибка генерации резюме",
        description: (error as { message: string }).message,
      });
      setGenerateResumeLoading(false);
      return null;
    }
  }

  return {
    contextHolder,
    resumeGenerateLoading,
    generateResume: (value: GenerateResumePromptProps) =>
      getAIResponse(generateResumePrompt(value)),
  };
}

export { useResumeGeneration };
