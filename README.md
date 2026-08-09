# AI Prompt Library

A full-stack AI Prompt Library that allows users to create, organize, search, filter, and manage reusable AI prompts.

The application is built using React + TypeScript on the frontend and Node.js + Express + MongoDB on the backend.

---

GitHub Repository: https://github.com/GaganMeshram123/Intern

---

## 📌 Project Overview

AI Prompt Library is a web application designed to help users store and manage reusable AI prompts in an organized way.

Users can:

- Create prompts
- Edit prompts
- Delete prompts
- Duplicate prompts
- Favorite prompts
- Pin important prompts
- Copy prompts to clipboard
- Search prompts
- Filter prompts
- Sort prompts
- Import prompts from JSON
- Export prompts as JSON
- Reorder prompts
- Switch between dark and light mode

The project demonstrates React fundamentals, state management, CRUD operations, API integration, database management, LocalStorage persistence, reusable components, responsive design, and performance optimization.

---

# ✨ Features

## 📊 Dashboard

The dashboard provides an overview of the prompt library.

It displays:

- Total Prompts
- Favorite Prompts
- Categories Count
- Recently Added Prompts

---

## 📝 Prompt Management

Each prompt supports the following operations:

### Create Prompt

Users can create a new prompt using the Add Prompt form.

A prompt contains:

- Title
- Prompt Content
- Category
- Tags
- Description
- Favorite Status
- Pin Status
- Created Date
- Last Updated Date

---

### Edit Prompt

Users can edit an existing prompt.

The updated data is sent to the backend using a PUT API request.

---

### Delete Prompt

Users can delete prompts.

A confirmation dialog is displayed before permanently deleting a prompt.

---

### Duplicate Prompt

Users can duplicate an existing prompt.

The duplicated prompt receives a new unique ID.

---

### Favorite / Unfavorite

Users can mark prompts as favorites.

Favorite prompts can be identified easily from the dashboard.

---

### Pin Prompt

Important prompts can be pinned.

Pinned prompts can be displayed at the top of the prompt list.

---

### Copy to Clipboard

Users can copy the prompt content directly using the Clipboard API.

---

### Drag & Drop

Prompt cards can be reordered using drag and drop.

---

# 🔍 Search & Filter

The application provides multiple ways to find prompts.

## Search

Users can search prompts by:

- Prompt title
- Prompt content

## Category Filter

Prompts can be filtered using categories.

## Favorite Filter

Users can view only their favorite prompts.

## Sorting

Prompts can be sorted by:

- Newest
- Oldest
- A → Z
- Z → A

---

# 📁 Categories

The application uses the following categories:

1. Coding
2. Marketing
3. Content Writing
4. Email
5. Resume
6. SQL
7. Design
8. Social Media
9. Productivity
10. Others

---

# 📥 Import / Export

## Export

Users can export all prompts as a JSON file.

The exported file contains the prompt data and can be stored locally.

## Import

Users can import prompts from a JSON file.

The imported data is validated before being added to the application.

---

# 🌙 Dark / Light Mode

The application supports:

- Light Mode
- Dark Mode

The selected theme is persisted so that it remains after refreshing the page.

---

# 🧠 State Management

The application uses React Context API for shared prompt state management.

The main Context is: client/src/context/PromptContext.tsx

<img width="1919" height="922" alt="image" src="https://github.com/user-attachments/assets/fcc55d45-129d-432e-aa2e-9ef7b99c6239" />
<img width="1919" height="914" alt="image" src="https://github.com/user-attachments/assets/284a6ec2-530a-4176-8614-9d0f1e32b82f" />
<img width="1919" height="918" alt="image" src="https://github.com/user-attachments/assets/890e9b88-09d0-40b3-9a44-cc9f16caa8b9" />
<img width="1919" height="947" alt="image" src="https://github.com/user-attachments/assets/1c0dbfa7-d040-445a-866d-cf31faece2b1" />



