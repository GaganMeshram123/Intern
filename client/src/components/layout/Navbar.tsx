function Navbar() {
  return (
    <header className="h-16 border-b bg-white px-6 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-gray-900">
        AI Prompt Library
      </h1>

      <div className="flex items-center gap-4">
        <button className="text-gray-600 hover:text-gray-900">
          🌙
        </button>

        <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center">
          U
        </div>
      </div>
    </header>
  );
}

export default Navbar;