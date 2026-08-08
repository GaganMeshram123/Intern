interface NavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

function Navbar({
  darkMode,
  onToggleDarkMode,
}: NavbarProps) {
  return (
    <nav className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">
            AI Prompt Library
          </h1>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            Manage your prompts
          </p>
        </div>

        {/* Theme Button */}
        <button
          type="button"
          onClick={onToggleDarkMode}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;