import axios from "axios";

import type { Prompt } from "../types/prompt";

const API_URL = "http://localhost:5000/api/prompts";

// ==============================
// GET ALL PROMPTS
// ==============================

export const getPrompts = async (): Promise<Prompt[]> => {
  const response = await axios.get(API_URL);

  return response.data.data;
};


// ==============================
// GET ONE PROMPT
// ==============================

export const getPrompt = async (
  id: string
): Promise<Prompt> => {
  const response = await axios.get(
    `${API_URL}/${id}`
  );

  return response.data.data;
};


// ==============================
// CREATE PROMPT
// ==============================

export const createPrompt = async (
  prompt: Omit<
    Prompt,
    "id" | "createdAt" | "updatedAt"
  >
): Promise<Prompt> => {
  const response = await axios.post(
    API_URL,
    prompt
  );

  return response.data.data;
};


// ==============================
// UPDATE PROMPT
// ==============================

export const updatePromptApi = async (
  prompt: Prompt
): Promise<Prompt> => {
  const response = await axios.put(
    `${API_URL}/${prompt.id}`,
    prompt
  );

  return response.data.data;
};


// ==============================
// DELETE PROMPT
// ==============================

export const deletePromptApi = async (
  id: string
): Promise<void> => {
  await axios.delete(
    `${API_URL}/${id}`
  );
};