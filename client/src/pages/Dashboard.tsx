import { useContext, useState } from "react";

import DashboardCard from "../components/dashboard/DashboardCard";
import PromptCard from "../components/prompt/PromptCard";
import PromptModal from "../components/prompt/PromptModal";
import PromptForm from "../components/prompt/PromptForm";

import PromptContext from "../context/PromptContext";
import type { Prompt } from "../types/prompt";
import DeletePromptDialog from "../components/prompt/DeletePromptDialog";

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
  } = context;

  // Controls Add Prompt modal
  const [isAddModalOpen, setIsAddModalOpen] =
    useState(false);

  // Stores the prompt currently being edited
  const [editingPrompt, setEditingPrompt] =
    useState<Prompt | null>(null);

  const [deletingPrompt, setDeletingPrompt] =
  useState<Prompt | null>(null);


  return (
    <div>
      {/* Dashboard Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Dashboard
          </h2>

          <p className="mt-1 text-gray-600">
            Manage and organize your AI prompts.
          </p>
        </div>

        {/* Add Prompt Button */}
        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
        >
          + Add Prompt
        </button>
      </div>

      {/* Dashboard Statistics */}
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
              (prompt) => prompt.isFavorite
            ).length
          }
          icon="⭐"
        />

        <DashboardCard
          title="Categories"
          value={10}
          icon="📁"
        />

        <DashboardCard
          title="Recently Added"
          value={prompts.length}
          icon="🕒"
        />
      </div>

      {/* Recent Prompts */}
      <div className="mt-8">
        <h3 className="mb-4 text-xl font-semibold text-gray-900">
          Recent Prompts
        </h3>

        <div className="grid gap-4">
         {prompts.map((prompt) => (
  <PromptCard
    key={prompt.id}
    prompt={prompt}
    onEdit={(prompt) => {
      setEditingPrompt(prompt);
    }}
    onDelete={(prompt) => {
      setDeletingPrompt(prompt);
    }}
  />
))}
        </div>
      </div>

      {/* Add Prompt Modal */}
      <PromptModal
        isOpen={isAddModalOpen}
        title="Add New Prompt"
        onClose={() => setIsAddModalOpen(false)}
      >
        <PromptForm
          onCancel={() => setIsAddModalOpen(false)}
          onSubmit={(newPrompt: Prompt) => {
            addPrompt(newPrompt);
            setIsAddModalOpen(false);
          }}
        />
      </PromptModal>

      {/* Edit Prompt Modal */}
      <PromptModal
        isOpen={editingPrompt !== null}
        title="Edit Prompt"
        onClose={() => setEditingPrompt(null)}
      >
        {editingPrompt && (
          <PromptForm
            initialPrompt={editingPrompt}
            onCancel={() => setEditingPrompt(null)}
            onSubmit={(updatedPrompt) => {
              updatePrompt(updatedPrompt);
              setEditingPrompt(null);
            }}
          />
        )}
      </PromptModal>
    <DeletePromptDialog
  isOpen={deletingPrompt !== null}
  promptTitle={deletingPrompt?.title ?? ""}
  onCancel={() => setDeletingPrompt(null)}
  onConfirm={() => {
    if (deletingPrompt) {
      deletePrompt(deletingPrompt.id);
      setDeletingPrompt(null);
    }
  }}
/>
    </div>
  );
}

export default Dashboard;