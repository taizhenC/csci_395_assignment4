import type { Item } from "./types";

export const API_URL = "http://localhost:3001";

export async function getItems(): Promise<Item[]> {
  const res = await fetch(`${API_URL}/items`);
  if (!res.ok) throw new Error("Failed to load items");
  return res.json();
}

export async function getItem(id: number): Promise<Item | null> {
  const res = await fetch(`${API_URL}/items/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to load item");
  return res.json();
}

export async function updateItem(
  id: number,
  changes: Partial<Item>
): Promise<Item> {
  const res = await fetch(`${API_URL}/items/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(changes),
  });
  if (!res.ok) throw new Error("Failed to update item");
  return res.json();
}
