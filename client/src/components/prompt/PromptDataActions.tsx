import {
  useContext,
  useRef,
  type ChangeEvent,
} from "react";

import PromptContext from "../../context/PromptContext";
import type { Prompt } from "../../types/prompt";

function PromptDataActions() {
  const context = useContext(PromptContext);

  const fileInputRef =
    useRef<HTMLInputElement | null>(null);

  if (!context) {
    return null;
  }

  const { prompts } = context;

  // -------------------------
  // EXPORT
  // -------------------------

  const handleExport = () => {
    const jsonData = JSON.stringify(
      prompts,
      null,
      2
    );

    const blob = new Blob(
      [jsonData],
      {
        type: "application/json",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "ai-prompt-library.json";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // -------------------------
  // OPEN FILE PICKER
  // -------------------------

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  // -------------------------
  // IMPORT
  // -------------------------

  const handleImport = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader =
      new FileReader();

    reader.onload = () => {
      try {
        const importedData =
          JSON.parse(
            reader.result as string
          );

        if (
          !Array.isArray(
            importedData
          )
        ) {
          throw new Error(
            "Invalid file format"
          );
        }

        const validPrompts =
          importedData.filter(
            (prompt: Prompt) =>
              prompt.id &&
              prompt.title &&
              prompt.content &&
              prompt.category &&
              Array.isArray(prompt.tags)
          );

        if (
          validPrompts.length === 0
        ) {
          alert(
            "No valid prompts found in the file."
          );

          return;
        }

        const existingIds =
          new Set(
            prompts.map(
              (prompt) =>
                prompt.id
            )
          );

        const newPrompts =
          validPrompts.filter(
            (prompt: Prompt) =>
              !existingIds.has(
                prompt.id
              )
          );

        if (
          newPrompts.length === 0
        ) {
          alert(
            "All imported prompts already exist."
          );

          return;
        }

        const mergedPrompts = [
          ...prompts,
          ...newPrompts,
        ];

        localStorage.setItem(
          "ai-prompt-library",
          JSON.stringify(
            mergedPrompts
          )
        );

        alert(
          `${newPrompts.length} prompt(s) imported successfully. Please refresh the page.`
        );
      } catch (error) {
        console.error(
          "Import failed:",
          error
        );

        alert(
          "Invalid JSON file."
        );
      }
    };

    reader.readAsText(file);

    // Allow importing the same file again
    event.target.value = "";
  };

  return (
    <div className="flex flex-wrap gap-2">
      {/* Export */}
      <button
        type="button"
        onClick={handleExport}
        className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        📤 Export JSON
      </button>

      {/* Import */}
      <button
        type="button"
        onClick={
          handleImportClick
        }
        className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        📥 Import JSON
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        onChange={handleImport}
        className="hidden"
      />
    </div>
  );
}

export default PromptDataActions;