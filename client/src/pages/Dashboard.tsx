import {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import DashboardCard from "../components/dashboard/DashboardCard";
import PromptCard from "../components/prompt/PromptCard";
import PromptModal from "../components/prompt/PromptModal";
import PromptForm from "../components/prompt/PromptForm";
import DeletePromptDialog from "../components/prompt/DeletePromptDialog";

import PromptContext from "../context/PromptContext";
import type { Prompt } from "../types/prompt";

import { CATEGORIES } from "../constants/categories";
import PromptDataActions from "../components/prompt/PromptDataActions";

function Dashboard() {
  // Get prompts and functions from Context
  const context = useContext(PromptContext);

  // Dashboard must be inside PromptProvider
  if (!context) {
    throw new Error(
      "Dashboard must be used inside PromptProvider"
    );
  }

  const {
    prompts,
    addPrompt,
    updatePrompt,
    deletePrompt,
    duplicatePrompt,
    toggleFavorite,
    togglePin,
  } = context;

  // -------------------------
  // MODAL STATES
  // -------------------------

  // Add Prompt modal
  const [isAddModalOpen, setIsAddModalOpen] =
    useState(false);

  // Prompt currently being edited
  const [editingPrompt, setEditingPrompt] =
    useState<Prompt | null>(null);

  // Prompt currently being deleted
  const [deletingPrompt, setDeletingPrompt] =
    useState<Prompt | null>(null);
 

const searchInputRef =
  useRef<HTMLInputElement | null>(null);
  // -------------------------
  // SEARCH / FILTER / SORT
  // -------------------------

  // Search
  const [searchQuery, setSearchQuery] =
    useState("");

  // Category filter
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  // Tag filter
  const [selectedTag, setSelectedTag] =
    useState("All");

  // Sort
  const [sortBy, setSortBy] =
    useState("newest");

  // -------------------------
  // GET ALL UNIQUE TAGS
  // -------------------------

  const allTags = useMemo(() => {
    const tags = prompts.flatMap(
      (prompt) => prompt.tags
    );

    return [...new Set(tags)].sort();
  }, [prompts]);


  useEffect(() => {
  const handleKeyDown = (
    event: KeyboardEvent
  ) => {
    if (
      (event.ctrlKey || event.metaKey) &&
      event.key.toLowerCase() === "k"
    ) {
      event.preventDefault();

      searchInputRef.current?.focus();
    }
  };

  window.addEventListener(
    "keydown",
    handleKeyDown
  );

  return () => {
    window.removeEventListener(
      "keydown",
      handleKeyDown
    );
  };
}, []);

  // -------------------------
  // SEARCH + FILTER + SORT
  // -------------------------

  const filteredPrompts = useMemo(() => {
    // Make a copy so we don't modify the original prompts
    let result = [...prompts];

    // -------------------------
    // SEARCH
    // -------------------------

    const query = searchQuery
      .trim()
      .toLowerCase();

    if (query) {
      result = result.filter((prompt) => {
        const title =
          prompt.title.toLowerCase();

        const content =
          prompt.content.toLowerCase();

        const tags =
          prompt.tags
            .join(" ")
            .toLowerCase();

        return (
          title.includes(query) ||
          content.includes(query) ||
          tags.includes(query)
        );
      });
    }

    // -------------------------
    // CATEGORY FILTER
    // -------------------------

    if (selectedCategory !== "All") {
      result = result.filter(
        (prompt) =>
          prompt.category === selectedCategory
      );
    }

    // -------------------------
    // TAG FILTER
    // -------------------------

    if (selectedTag !== "All") {
      result = result.filter((prompt) =>
        prompt.tags.includes(selectedTag)
      );
    }

    // -------------------------
    // SORT
    // -------------------------

   result.sort((a, b) => {
  // Pinned prompts always come first
  if (a.isPinned && !b.isPinned) {
    return -1;
  }

  if (!a.isPinned && b.isPinned) {
    return 1;
  }

  // Newest created
  if (sortBy === "newest") {
    return (
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
    );
  }

  // Oldest created
  if (sortBy === "oldest") {
    return (
      new Date(a.createdAt).getTime() -
      new Date(b.createdAt).getTime()
    );
  }

  // Recently updated
  if (sortBy === "updated") {
    return (
      new Date(b.updatedAt).getTime() -
      new Date(a.updatedAt).getTime()
    );
  }

  return 0;
});

    return result;
  }, [
    prompts,
    searchQuery,
    selectedCategory,
    selectedTag,
    sortBy,
  ]);

  // -------------------------
  // JSX
  // -------------------------

  return (
    <div>
      {/* =========================
          DASHBOARD HEADER
      ========================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
  <div>
    <h2 className="text-2xl font-bold text-gray-900">
      Dashboard
    </h2>

    <p className="mt-1 text-gray-600">
      Manage and organize your AI prompts.
    </p>
  </div>

  <div className="flex flex-wrap gap-2">
    <PromptDataActions />

    <button
      type="button"
      onClick={() =>
        setIsAddModalOpen(true)
      }
      className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
    >
      + Add Prompt
    </button>
  </div>
</div> 

      {/* =========================
          DASHBOARD STATISTICS
      ========================== */}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Prompts"
          value={prompts.length}
          icon="📝"
        />

        <DashboardCard
          title="Favorite Prompts"
          value={
            prompts.filter(
              (prompt) =>
                prompt.isFavorite
            ).length
          }
          icon="⭐"
        />

        <DashboardCard
          title="Categories"
          value={CATEGORIES.length}
          icon="📁"
        />

        <DashboardCard
          title="Recently Added"
          value={prompts.length}
          icon="🕒"
        />
      </div>

      {/* =========================
          PROMPTS SECTION
      ========================== */}

      <div className="mt-8">

        {/* Heading */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900">
            Prompts
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Search, filter and sort your prompts.
          </p>
        </div>

        {/* =========================
            SEARCH
        ========================== */}

        <div className="mb-4">
         <input
  ref={searchInputRef}
  type="text"
  value={searchQuery}
  onChange={(event) =>
    setSearchQuery(event.target.value)
  }
  placeholder="🔍 Search title, content or tags..."
  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm"
/>
        </div>

        {/* =========================
            FILTERS
        ========================== */}

       <div className="mb-6 flex flex-wrap gap-3">

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(event) =>
              setSelectedCategory(
                event.target.value
              )
            }
            className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-gray-900"
          >
            <option value="All">
              All Categories
            </option>

            {CATEGORIES.map(
              (category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              )
            )}
          </select>

          {/* Tag Filter */}
          <select
            value={selectedTag}
            onChange={(event) =>
              setSelectedTag(
                event.target.value
              )
            }
            className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-gray-900"
          >
            <option value="All">
              All Tags
            </option>

            {allTags.map((tag) => (
              <option
                key={tag}
                value={tag}
              >
                #{tag}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(event) =>
              setSortBy(
                event.target.value
              )
            }
            className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-gray-900"
          >
            <option value="newest">
              Newest Created
            </option>

            <option value="oldest">
              Oldest Created
            </option>

            <option value="updated">
              Recently Updated
            </option>
          </select>
          {/* Clear Filters */}
  <button
    type="button"
    onClick={() => {
      setSearchQuery("");
      setSelectedCategory("All");
      setSelectedTag("All");
      setSortBy("newest");
    }}
    className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
  >
    Reset Filters
  </button> 
  

        </div>

        {/* =========================
            RESULT COUNT
        ========================== */}

        <div className="mb-4 text-sm text-gray-500">
          Showing {filteredPrompts.length} of{" "}
          {prompts.length} prompts
        </div>

        {/* =========================
            PROMPT CARDS
        ========================== */}

        {filteredPrompts.length > 0 && (
          <div className="grid gap-4">
            {filteredPrompts.map(
              (prompt) => (
                <PromptCard
                  key={prompt.id}
                  prompt={prompt}

                  onEdit={(prompt) => {
                    setEditingPrompt(
                      prompt
                    );
                  }}

                  onDelete={(prompt) => {
                    setDeletingPrompt(
                      prompt
                    );
                  }}

                  onDuplicate={(prompt) => {
                    duplicatePrompt(
                      prompt
                    );
                  }}

                  onFavorite={(prompt) => {
                    toggleFavorite(
                      prompt.id
                    );
                  }}

                  onPin={(prompt) => {
                    togglePin(
                      prompt.id
                    );
                  }}
                />
              )
            )}
          </div>
        )}

        {/* =========================
            EMPTY STATE
        ========================== */}

        {filteredPrompts.length === 0 && (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
            <div className="text-4xl">
              🔍
            </div>

            <h4 className="mt-3 text-lg font-semibold text-gray-900">
              No prompts found
            </h4>

            <p className="mt-1 text-sm text-gray-500">
              Try changing your search or
              filters.
            </p>
          </div>
        )}
      </div>

      {/* =========================
          ADD PROMPT MODAL
      ========================== */}

      <PromptModal
        isOpen={isAddModalOpen}
        title="Add New Prompt"
        onClose={() =>
          setIsAddModalOpen(false)
        }
      >
        <PromptForm
          onCancel={() =>
            setIsAddModalOpen(false)
          }
          onSubmit={async (newPrompt) => {
            await addPrompt(newPrompt);

            setIsAddModalOpen(false);
          }}
        />
      </PromptModal>

      {/* =========================
          EDIT PROMPT MODAL
      ========================== */}

      <PromptModal
        isOpen={editingPrompt !== null}
        title="Edit Prompt"
        onClose={() =>
          setEditingPrompt(null)
        }
      >
        {editingPrompt && (
          <PromptForm
            initialPrompt={editingPrompt}
            onCancel={() =>
              setEditingPrompt(null)
            }
            onSubmit={async (updatedPrompt) => {
              await updatePrompt(
                updatedPrompt
              );

              setEditingPrompt(null);
            }}
          />
        )}
      </PromptModal>

      {/* =========================
          DELETE CONFIRMATION
      ========================== */}

      <DeletePromptDialog
        isOpen={
          deletingPrompt !== null
        }
        promptTitle={
          deletingPrompt?.title ?? ""
        }
        onCancel={() =>
          setDeletingPrompt(null)
        }
        onConfirm={() => {
          if (deletingPrompt) {
            deletePrompt(
              deletingPrompt.id
            );

            setDeletingPrompt(null);
          }
        }}
      />
    </div>
  );
}

export default Dashboard;