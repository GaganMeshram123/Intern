import { createContext, useState, type ReactNode } from "react";
import type { Prompt } from "../types/prompt";

interface PromptContextType {
  prompts: Prompt[];
  addPrompt: (prompt: Prompt) => void;
}

interface PromptProviderProps {
  children: ReactNode;
}

const PromptContext = createContext<PromptContextType | null>(null);

export function PromptProvider({
  children,
}: PromptProviderProps) {
  const [prompts, setPrompts] = useState<Prompt[]>([
    {
      id: "1",
      title: "Professional Resume Prompt",
      content:
        "Create a professional resume for a software developer applying for internships.",
      category: "Resume",
      tags: ["job", "career", "resume"],
      description:
        "A prompt for creating professional software developer resumes.",
      createdAt: "2026-08-08T10:30:00Z",
      updatedAt: "2026-08-08T10:30:00Z",
      isFavorite: true,
      isPinned: true,
    },
    {
      id: "2",
      title: "Code Review Prompt",
      content:
        "Review the following code and explain the bugs, improvements, and possible edge cases.",
      category: "Coding",
      tags: ["code", "review", "programming"],
      description:
        "Useful for getting detailed feedback on programming code.",
      createdAt: "2026-08-07T10:30:00Z",
      updatedAt: "2026-08-07T10:30:00Z",
      isFavorite: false,
      isPinned: false,
    },
    {
      id: "3",
      title: "Professional Email Prompt",
      content:
        "Write a professional and polite email requesting an update regarding my job application.",
      category: "Email",
      tags: ["email", "job", "professional"],
      description:
        "Useful for writing professional job-related emails.",
      createdAt: "2026-08-06T10:30:00Z",
      updatedAt: "2026-08-06T10:30:00Z",
      isFavorite: true,
      isPinned: false,
    },
  ]);

  const addPrompt = (prompt: Prompt) => {
    setPrompts((currentPrompts) => [
      ...currentPrompts,
      prompt,
    ]);
  };

  return (
    <PromptContext.Provider
      value={{
        prompts,
        addPrompt,
      }}
    >
      {children}
    </PromptContext.Provider>
  );
}

export default PromptContext;