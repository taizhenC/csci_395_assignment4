import { Link } from "react-router-dom";
import { useUiStore } from "../store";
import type { Item } from "../types";

export default function ItemCard({ item }: { item: Item }) {
  // Read density straight from the store (no prop drilling)
  const density = useUiStore((state) => state.density);
  const padding = density === "compact" ? "p-2" : "p-4";

  return (
    <li className={`rounded bg-white shadow dark:bg-gray-800 ${padding}`}>
      <Link
        to={`/items/${item.id}`}
        className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
      >
        {item.title}
      </Link>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {item.creator} · {item.year} · {item.genre}
      </p>
      <p className="text-sm">
        Status: {item.status}
        {item.rating !== null && <span> · ⭐ {item.rating}/5</span>}
      </p>
    </li>
  );
}
