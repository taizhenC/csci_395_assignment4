import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { getItems } from "../api";
import ItemCard from "../components/ItemCard";
import { useUiStore } from "../store";

// Used for both "/" (all items) and "/list/:status" (filtered)
export default function CatalogPage() {
  const { status } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const density = useUiStore((state) => state.density);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["items"],
    queryFn: getItems,
  });

  if (isLoading) return <p>Loading games...</p>;
  if (isError)
    return (
      <p className="text-red-600">
        Could not load games. Is json-server running on port 3001?
      </p>
    );

  const items = data ?? [];
  const visible = items.filter((item) => {
    if (status && item.status !== status) return false;
    if (q && !item.title.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <h1 className="mb-3 text-2xl font-bold capitalize">
        {status ? `${status} games` : "All games"}
      </h1>
      <input
        value={q}
        onChange={(e) => {
          // Keep the search text in the URL (?q=...) so it survives refresh
          if (e.target.value) {
            setSearchParams({ q: e.target.value });
          } else {
            setSearchParams({});
          }
        }}
        placeholder="Search by title..."
        className="mb-4 w-full rounded border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-800"
      />
      {visible.length === 0 && <p>No games found.</p>}
      <ul className={density === "compact" ? "space-y-1" : "space-y-3"}>
        {visible.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}
