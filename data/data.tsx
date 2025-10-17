import { PicsumImage } from "@/types/types";
import { QueryFunctionContext } from "@tanstack/react-query";

export const QUERY_KEY = ["images"] as const;
export const fetchImages = async (
  context: QueryFunctionContext<typeof QUERY_KEY, number>,
): Promise<PicsumImage[]> => {
  const pageParam = context.pageParam ?? 1;
  const res = await fetch(
    `https://picsum.photos/v2/list?page=${pageParam}&limit=10`,
  );
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};
