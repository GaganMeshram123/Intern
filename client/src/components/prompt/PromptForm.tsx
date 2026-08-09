import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import { CATEGORIES } from "../../constants/categories";
import type { Prompt } from "../../types/prompt";

interface PromptFormProps {
  onSubmit: (prompt: Prompt) => void | Promise<void>;
  onCancel: () => void;
  initialPrompt?: Prompt;
}

function PromptForm({
  onSubmit,
  onCancel,
  initialPrompt,
}: PromptFormProps) {
  const [title, setTitle] = useState(
    initialPrompt?.title ?? ""
  );

  const [content, setContent] = useState(
    initialPrompt?.content ?? ""
  );

  const [description, setDescription] = useState(
    initialPrompt?.description ?? ""
  );

  const [category, setCategory] = useState(
    initialPrompt?.category ?? ""
  );

  const [tags, setTags] = useState(
    initialPrompt?.tags.join(", ") ?? ""
  );

  useEffect(() => {
    setTitle(initialPrompt?.title ?? "");
    setContent(initialPrompt?.content ?? "");
    setDescription(initialPrompt?.description ?? "");
    setCategory(initialPrompt?.category ?? "");
    setTags(initialPrompt?.tags.join(", ") ?? "");
  }, [initialPrompt]);

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }

    if (!content.trim()) {
      alert("Please enter the prompt content.");
      return;
    }

    if (!category) {
      alert("Please select a category.");
      return;
    }

    const now = new Date().toISOString();

    const prompt: Prompt = {
      id: initialPrompt?.id ?? crypto.randomUUID(),

      title: title.trim(),

      content: content.trim(),

      description: description.trim(),

      category,

      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),

      createdAt:
        initialPrompt?.createdAt ?? now,

      updatedAt: now,

      isFavorite:
        initialPrompt?.isFavorite ?? false,

      isPinned:
        initialPrompt?.isPinned ?? false,
    };

    onSubmit(prompt);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* Title */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Title
        </label>

        <input
          type="text"
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
          placeholder="e.g. Professional Resume Prompt"
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-gray-900"
        />
      </div>

      {/* Prompt Content */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Prompt Content
        </label>

        <textarea
          value={content}
          onChange={(event) =>
            setContent(event.target.value)
          }
          placeholder="Write your AI prompt here..."
          rows={5}
          className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-gray-900"
        />
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Description
        </label>

        <textarea
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
          placeholder="What is this prompt used for?"
          rows={3}
          className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-gray-900"
        />
      </div>

      {/* Category */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Category
        </label>

        <select
          value={category}
          onChange={(event) =>
            setCategory(event.target.value)
          }
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-gray-900"
        >
          <option value="">
            Select a category
          </option>

          {CATEGORIES.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Tags */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Tags
        </label>

        <input
          type="text"
          value={tags}
          onChange={(event) =>
            setTags(event.target.value)
          }
          placeholder="react, javascript, interview"
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-gray-900"
        />

        <p className="mt-1 text-xs text-gray-500">
          Separate multiple tags using commas.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
        >
          {initialPrompt
            ? "Save Changes"
            : "Save Prompt"}
        </button>
      </div>
    </form>
  );
}

export default PromptForm;