import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Prompt } from "../types/prompt";

import {
  getPrompts,
  createPrompt,
  updatePromptApi,
  deletePromptApi,
} from "../api/promptApi";

interface PromptContextType {
  prompts: Prompt[];

  loading: boolean;

  error: string | null;

  addPrompt: (
    prompt: Prompt
  ) => Promise<void>;

  updatePrompt: (
    prompt: Prompt
  ) => Promise<void>;

  deletePrompt: (
    id: string
  ) => Promise<void>;

  duplicatePrompt: (
    prompt: Prompt
  ) => Promise<void>;

  toggleFavorite: (
    id: string
  ) => Promise<void>;

  togglePin: (
    id: string
  ) => Promise<void>;
}

const PromptContext =
  createContext<PromptContextType | null>(
    null
  );

interface PromptProviderProps {
  children: ReactNode;
}

export function PromptProvider({
  children,
}: PromptProviderProps) {
  const [prompts, setPrompts] =
    useState<Prompt[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  // ==============================
  // LOAD PROMPTS FROM BACKEND
  // ==============================

  useEffect(() => {
    const loadPrompts = async () => {
      try {
        setLoading(true);
        setError(null);

        const data =
          await getPrompts();

        setPrompts(data);
      } catch (error) {
        console.error(
          "Failed to load prompts:",
          error
        );

        setError(
          "Failed to load prompts from server."
        );
      } finally {
        setLoading(false);
      }
    };

    loadPrompts();
  }, []);

  // ==============================
  // ADD PROMPT
  // ==============================

  const addPrompt = async (
    prompt: Prompt
  ) => {
    try {
      setError(null);

      const newPrompt =
        await createPrompt({
          title: prompt.title,
          content: prompt.content,
          category: prompt.category,
          tags: prompt.tags,
          description:
            prompt.description,
          isFavorite:
            prompt.isFavorite,
          isPinned:
            prompt.isPinned,
        });

      setPrompts((current) => [
        ...current,
        newPrompt,
      ]);
    } catch (error) {
      console.error(
        "Failed to add prompt:",
        error
      );

      setError(
        "Failed to add prompt."
      );

      throw error;
    }
  };

  // ==============================
  // UPDATE PROMPT
  // ==============================

  const updatePrompt = async (
    prompt: Prompt
  ) => {
    try {
      setError(null);

      const updatedPrompt =
        await updatePromptApi(prompt);

      setPrompts((current) =>
        current.map((item) =>
          item.id === updatedPrompt.id
            ? updatedPrompt
            : item
        )
      );
    } catch (error) {
      console.error(
        "Failed to update prompt:",
        error
      );

      setError(
        "Failed to update prompt."
      );

      throw error;
    }
  };

  // ==============================
  // DELETE PROMPT
  // ==============================

  const deletePrompt = async (
    id: string
  ) => {
    try {
      setError(null);

      await deletePromptApi(id);

      setPrompts((current) =>
        current.filter(
          (prompt) =>
            prompt.id !== id
        )
      );
    } catch (error) {
      console.error(
        "Failed to delete prompt:",
        error
      );

      setError(
        "Failed to delete prompt."
      );

      throw error;
    }
  };

  // ==============================
  // DUPLICATE PROMPT
  // ==============================

  const duplicatePrompt = async (
    prompt: Prompt
  ) => {
    try {
      setError(null);

      const duplicatedPrompt =
        await createPrompt({
          title: `${prompt.title} (Copy)`,

          content:
            prompt.content,

          category:
            prompt.category,

          tags: [...prompt.tags],

          description:
            prompt.description,

          isFavorite:
            prompt.isFavorite,

          isPinned:
            prompt.isPinned,
        });

      setPrompts((current) => [
        ...current,
        duplicatedPrompt,
      ]);
    } catch (error) {
      console.error(
        "Failed to duplicate prompt:",
        error
      );

      setError(
        "Failed to duplicate prompt."
      );

      throw error;
    }
  };

  // ==============================
  // TOGGLE FAVORITE
  // ==============================

  const toggleFavorite = async (
    id: string
  ) => {
    const prompt =
      prompts.find(
        (item) => item.id === id
      );

    if (!prompt) {
      return;
    }

    await updatePrompt({
      ...prompt,

      isFavorite:
        !prompt.isFavorite,

      updatedAt:
        new Date().toISOString(),
    });
  };

  // ==============================
  // TOGGLE PIN
  // ==============================

  const togglePin = async (
    id: string
  ) => {
    const prompt =
      prompts.find(
        (item) => item.id === id
      );

    if (!prompt) {
      return;
    }

    await updatePrompt({
      ...prompt,

      isPinned:
        !prompt.isPinned,

      updatedAt:
        new Date().toISOString(),
    });
  };

  return (
    <PromptContext.Provider
      value={{
        prompts,

        loading,

        error,

        addPrompt,

        updatePrompt,

        deletePrompt,

        duplicatePrompt,

        toggleFavorite,

        togglePin,
      }}
    >
      {children}
    </PromptContext.Provider>
  );
}

export default PromptContext;