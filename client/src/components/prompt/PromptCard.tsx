import type { Prompt } from "../../types/prompt";

interface PromptCardProps {
  prompt: Prompt;
  onEdit: (prompt: Prompt) => void;
}

function PromptCard({
  prompt,
  onEdit,
}: PromptCardProps) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md">
      
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {prompt.title}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            {prompt.description}
          </p>
        </div>

        {/* Favorite and Pin */}
        <div className="flex gap-2 text-lg">
          {prompt.isFavorite && <span>⭐</span>}
          {prompt.isPinned && <span>📌</span>}
        </div>
      </div>

      {/* Prompt Content */}
      <div className="mt-4 rounded-lg bg-gray-50 p-4">
        <p className="text-sm leading-6 text-gray-700">
          {prompt.content}
        </p>
      </div>

      {/* Category and Tags */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
          {prompt.category}
        </span>

        {prompt.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Date */}
      <div className="mt-4 text-xs text-gray-400">
        Created:{" "}
        {new Date(prompt.createdAt).toLocaleDateString()}
      </div>

      {/* Actions */}
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={() => onEdit(prompt)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          ✏️ Edit
        </button>
      </div>
    </div>
  );
}

export default PromptCard;