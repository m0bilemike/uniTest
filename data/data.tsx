import { PicsumImage } from "@/types/types";

export const QUERY_KEY = ["images"] as const;

export async function fetchImages(page: number): Promise<PicsumImage[]> {
  const res = await fetch(
    `https://picsum.photos/v2/list?page=${page}&limit=20`,
  );
  if (!res.ok) throw new Error("Failed to fetch images");
  const data: PicsumImage[] = await res.json();
  return data;
}
