import express from "express";

import {
  getPrompts,
  getPrompt,
  createPrompt,
  updatePrompt,
  deletePrompt,
} from "../controllers/promptController.js";

const router = express.Router();


// GET all prompts
router.get("/", getPrompts);


// GET one prompt
router.get("/:id", getPrompt);


// CREATE
router.post("/", createPrompt);


// UPDATE
router.put("/:id", updatePrompt);


// DELETE
router.delete("/:id", deletePrompt);


export default router;