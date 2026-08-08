import { useEffect, useState } from "react";

import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import { PromptProvider } from "./context/PromptContext";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <PromptProvider>
      <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <Navbar
          darkMode={darkMode}
          onToggleDarkMode={() => {
            setDarkMode((current) => !current);
          }}
        />

        <div className="flex">
          <Sidebar />

          <main className="min-w-0 flex-1 p-6">
            <Dashboard />
          </main>
        </div>
      </div>
    </PromptProvider>
  );
}

export default App;