import { Routes, Route } from "react-router-dom";
import { useUiStore } from "./store";
import NavBar from "./components/NavBar";
import CatalogPage from "./pages/CatalogPage";
import DetailPage from "./pages/DetailPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  const theme = useUiStore((state) => state.theme);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <NavBar />
        <main className="mx-auto max-w-4xl p-4">
          <Routes>
            <Route path="/" element={<CatalogPage />} />
            <Route path="/items/:id" element={<DetailPage />} />
            <Route path="/list/:status" element={<CatalogPage />} />
            <Route path="/about" element={<AboutPage />} />
            {/* Catch-all 404 route: must stay LAST */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
