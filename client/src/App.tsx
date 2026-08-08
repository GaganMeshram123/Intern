import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import { PromptProvider } from "./context/PromptContext";

function App() {
  return (
    <PromptProvider>
      <div className="min-h-screen bg-gray-100">
        <Navbar />

        <div className="flex">
          <Sidebar />

          <main className="flex-1 p-6">
            <Dashboard />
          </main>
        </div>
      </div>
    </PromptProvider>
  );
}

export default App;