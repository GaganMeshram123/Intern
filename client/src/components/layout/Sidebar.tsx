import { CATEGORIES } from "../../constants/categories";

function Sidebar() {
  return (
    <aside className="w-64 min-h-[calc(100vh-4rem)] border-r bg-gray-50 p-4">
      <nav>
        <p className="mb-3 text-xs font-semibold uppercase text-gray-500">
          Menu
        </p>

        <button className="w-full rounded-lg bg-gray-900 px-4 py-2 text-left text-white">
          Dashboard
        </button>

        <p className="mt-6 mb-3 text-xs font-semibold uppercase text-gray-500">
          Categories
        </p>

        <div className="space-y-1">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              className="w-full rounded-lg px-4 py-2 text-left text-gray-700 hover:bg-gray-200"
            >
              {category}
            </button>
          ))}
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;