import crypto from "crypto";

import Prompt from "../models/Prompt.js";

// ==============================
// GET ALL PROMPTS
// ==============================

export const getPrompts = async (
  req,
  res,
  next
) => {
  try {
    const prompts = await Prompt.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: prompts,
    });
  } catch (error) {
    next(error);
  }
};


// ==============================
// GET ONE PROMPT
// ==============================

export const getPrompt = async (
  req,
  res,
  next
) => {
  try {
    const prompt = await Prompt.findOne({
      id: req.params.id,
    });

    if (!prompt) {
      return res.status(404).json({
        success: false,
        message: "Prompt not found",
      });
    }

    res.status(200).json({
      success: true,
      data: prompt,
    });
  } catch (error) {
    next(error);
  }
};


// ==============================
// CREATE PROMPT
// ==============================

export const createPrompt = async (
  req,
  res,
  next
) => {
  try {
    const {
      title,
      content,
      category,
      tags,
      description,
      isFavorite,
      isPinned,
    } = req.body;

    // Basic validation
    if (
      !title ||
      !content ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Title, content and category are required",
      });
    }

    const prompt = await Prompt.create({
      id: crypto.randomUUID(),
      title,
      content,
      category,
      tags: tags || [],
      description:
        description || "",
      isFavorite:
        isFavorite || false,
      isPinned:
        isPinned || false,
    });

    res.status(201).json({
      success: true,
      message:
        "Prompt created successfully",
      data: prompt,
    });
  } catch (error) {
    next(error);
  }
};


// ==============================
// UPDATE PROMPT
// ==============================

export const updatePrompt = async (
  req,
  res,
  next
) => {
  try {
    const prompt =
      await Prompt.findOneAndUpdate(
        {
          id: req.params.id,
        },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!prompt) {
      return res.status(404).json({
        success: false,
        message: "Prompt not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Prompt updated successfully",
      data: prompt,
    });
  } catch (error) {
    next(error);
  }
};


// ==============================
// DELETE PROMPT
// ==============================

export const deletePrompt = async (
  req,
  res,
  next
) => {
  try {
    const prompt =
      await Prompt.findOneAndDelete({
        id: req.params.id,
      });

    if (!prompt) {
      return res.status(404).json({
        success: false,
        message: "Prompt not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Prompt deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};