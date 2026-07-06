import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { getItem, updateItem } from "../api";
import { STATUSES, type Status } from "../types";

export default function DetailPage() {
  const params = useParams();
  // useParams always returns strings, so convert to a number
  const id = Number(params.id);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["items", id],
    queryFn: () => getItem(id),
  });

  const statusMutation = useMutation({
    mutationFn: (status: Status) => updateItem(id, { status }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["items"] }),
  });

  const ratingMutation = useMutation({
    mutationFn: (rating: number) => updateItem(id, { rating }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["items"] }),
  });

  const noteMutation = useMutation({
    mutationFn: (note: string) =>
      updateItem(id, { note: note === "" ? null : note }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["items"] }),
  });

  if (isLoading) return <p>Loading game...</p>;
  if (isError) return <p className="text-red-600">Could not load this game.</p>;
  if (!data)
    return (
      <div>
        <p className="mb-2 text-xl">Not found — no game with id "{params.id}".</p>
        <Link to="/" className="text-blue-600 hover:underline dark:text-blue-400">
          Back to catalog
        </Link>
      </div>
    );

  const saving =
    statusMutation.isPending ||
    ratingMutation.isPending ||
    noteMutation.isPending;

  return (
    <div className="rounded bg-white p-4 shadow dark:bg-gray-800">
      <Link to="/" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
        ← Back to catalog
      </Link>
      <h1 className="mt-2 text-2xl font-bold">{data.title}</h1>
      <p className="mb-4 text-gray-600 dark:text-gray-400">
        {data.creator} · {data.year} · {data.genre}
      </p>

      <div className="mb-4">
        <label className="mr-2 font-semibold">Status:</label>
        <select
          value={data.status}
          onChange={(e) => statusMutation.mutate(e.target.value as Status)}
          className="rounded border border-gray-300 p-1 dark:border-gray-600 dark:bg-gray-800"
        >
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <span className="mr-2 font-semibold">Rating:</span>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => ratingMutation.mutate(star)}
            className="px-1 text-xl"
            title={`Rate ${star} out of 5`}
          >
            {data.rating !== null && star <= data.rating ? "★" : "☆"}
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
          {data.rating === null ? "not rated yet" : `${data.rating}/5`}
        </span>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const note = new FormData(e.currentTarget).get("note");
          noteMutation.mutate(typeof note === "string" ? note : "");
        }}
      >
        <label className="mb-1 block font-semibold" htmlFor="note">
          Note:
        </label>
        <textarea
          id="note"
          name="note"
          defaultValue={data.note ?? ""}
          rows={3}
          className="mb-2 w-full rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800"
          placeholder="Write a note about this game..."
        />
        <button
          type="submit"
          className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
        >
          Save note
        </button>
      </form>

      {saving && <p className="mt-2 text-sm text-gray-500">Saving...</p>}
    </div>
  );
}
