import { generateResumePrompt, GenerateResumePromptProps } from "../prompts/generateResumePrompt";
import { useState } from "react";
import { notification } from "antd";

function useResumeGeneration() {
  const [api, contextHolder] = notification.useNotification();
  const [resumeGenerateLoading, setGenerateResumeLoading] = useState(false);

  async function getAIResponse(prompt: string) {
    setGenerateResumeLoading(true);
    try {
      // Backend API-ին դիմելը
      const response = await fetch("/api/generate-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при запросе к серверу");
      }

      const data = await response.json();
      setGenerateResumeLoading(false);
      return data.result;
    } catch (error) {
      console.error("Ошибка генерации резюме:", error);
      api.error({
        message: "Произошла ошибка генерации Резюме",
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
