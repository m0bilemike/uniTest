import { fetchImages } from "@/data/data";
import { PicsumImage } from "@/types/types";
import {
  InfiniteData,
  QueryFunctionContext,
  useInfiniteQuery,
} from "@tanstack/react-query";

export const usePicsumImages = () => {
  return useInfiniteQuery<
    PicsumImage[],
    Error,
    InfiniteData<PicsumImage[]>,
    ["images"]
  >({
    queryKey: ["images"],
    queryFn: async ({
      pageParam,
    }: QueryFunctionContext<["images"], unknown>) => {
      const page = typeof pageParam === "number" ? pageParam : 1;
      return fetchImages(page);
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 0 ? undefined : allPages.length + 1,
    initialPageParam: 1,
  });
};
