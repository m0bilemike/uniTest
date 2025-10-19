import React, { useCallback } from "react";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { Header } from "@/components/Header";
import { HeaderTitle } from "@/components/HeaderTitle";
import { ImageCard } from "@/components/ImageCard";
import { Text, useThemeColor, View } from "@/components/Themed";
import { usePicsumImages } from "@/hooks/usePicsumImages";
import { AppDispatch, RootState } from "@/store";
import { toggleLike } from "@/store/imageSlice";
import { PicsumImage } from "@/types/types";

export default function HomeScreen() {
  const [isGrid, setIsGrid] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const likedImages = useSelector((state: RootState) =>
    state.images.ids.map((id) => state.images.entities[id]).filter(Boolean),
  );

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = usePicsumImages();

  const photos: PicsumImage[] = React.useMemo(
    () => data?.pages.flat() ?? [],
    [data],
  );

  const toggleLayout = useCallback(() => setIsGrid((prev) => !prev), []);

  const textColor = useThemeColor({}, "text");

  const renderItem = useCallback(
    ({ item }: { item: PicsumImage }) => {
      const liked = likedImages.some((img) => img.id === item.id);

      return (
        <ImageCard
          item={item}
          liked={liked}
          isGrid={isGrid}
          onToggleLike={() => dispatch(toggleLike(item))}
        />
      );
    },
    [likedImages, isGrid, dispatch],
  );

  if (isLoading)
    return (
      <Text style={{ flex: 1, textAlign: "center", color: textColor }}>
        Loading...
      </Text>
    );
  if (isError)
    return (
      <Text style={{ flex: 1, textAlign: "center", color: textColor }}>
        Error: {error?.message}
      </Text>
    );

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <HeaderTitle title="Images" isGrid={isGrid} toggleLayout={toggleLayout} />

      <FlatList
        data={photos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        key={isGrid ? "g" : "l"}
        numColumns={isGrid ? 2 : 1}
        contentContainerStyle={{ padding: 10 }}
        columnWrapperStyle={
          isGrid ? { justifyContent: "space-between" } : undefined
        }
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
        refreshing={false}
        onRefresh={refetch}
        ListFooterComponent={
          isFetchingNextPage ? (
            <Text style={{ textAlign: "center", margin: 10, color: textColor }}>
              Loading more...
            </Text>
          ) : null
        }
      />
    </View>
  );
}
