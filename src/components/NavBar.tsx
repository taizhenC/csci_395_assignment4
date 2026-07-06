import { NavLink } from "react-router-dom";
import { useUiStore, type Density } from "../store";
import { STATUSES } from "../types";

function linkClass({ isActive }: { isActive: boolean }) {
  return isActive
    ? "rounded px-2 py-1 bg-blue-600 text-white"
    : "rounded px-2 py-1 hover:bg-blue-100 dark:hover:bg-gray-700";
}

export default function NavBar() {
  const theme = useUiStore((state) => state.theme);
  const density = useUiStore((state) => state.density);
  const toggleTheme = useUiStore((state) => state.toggleTheme);
  const setDensity = useUiStore((state) => state.setDensity);

  return (
    <nav className="bg-white shadow dark:bg-gray-800">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-1 p-3 text-sm sm:text-base">
        <span className="mr-2 font-bold">📺 AniVault</span>
        <NavLink to="/" end className={linkClass}>
          Home
        </NavLink>
        {STATUSES.map((status) => (
          <NavLink key={status} to={`/list/${status}`} className={linkClass}>
            {status}
          </NavLink>
        ))}
        <NavLink to="/about" className={linkClass}>
          About
        </NavLink>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="rounded border border-gray-300 px-2 py-1 dark:border-gray-600"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
          <select
            value={density}
            onChange={(e) => setDensity(e.target.value as Density)}
            className="rounded border border-gray-300 px-2 py-1 dark:border-gray-600 dark:bg-gray-800"
          >
            <option value="comfortable">Comfortable</option>
            <option value="compact">Compact</option>
          </select>
        </div>
      </div>
    </nav>
  );
}
