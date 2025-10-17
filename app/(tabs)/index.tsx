import { fetchImages, QUERY_KEY } from "@/data/data";
import { PicsumImage } from "@/types/types";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { Image as ExpoImage } from "expo-image";
import React, { useCallback, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function HomeScreen() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isPending,
    isSuccess,
    error,
    refetch,
    isRefetching,
  } = useInfiniteQuery<
    PicsumImage[],
    Error,
    InfiniteData<PicsumImage[]>,
    typeof QUERY_KEY,
    number
  >({
    queryKey: QUERY_KEY,
    queryFn: fetchImages,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 0 ? undefined : allPages.length + 1,
  });

  const images = data?.pages.flat() ?? [];

  useEffect(() => {
    if (!data) return;
    const nextPageData = data.pages[data.pages.length - 1];
    if (nextPageData) {
      nextPageData.forEach((img) => ExpoImage.prefetch(img.download_url));
    }
  }, [data]);

  const renderItem: ListRenderItem<PicsumImage> = ({ item }) => (
    <View style={styles.card}>
      <ExpoImage
        source={{ uri: item.download_url }}
        style={styles.image}
        contentFit="cover"
      />
      <Text style={styles.author}>{item.author}</Text>
    </View>
  );

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  if (isPending) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>{error?.message ?? "Error"}</Text>
      </View>
    );
  }

  if (!isSuccess) return null;

  return (
    <FlatList
      data={images}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) fetchNextPage();
      }}
      onEndReachedThreshold={2}
      refreshing={isRefetching}
      onRefresh={handleRefresh}
      ListFooterComponent={
        isFetchingNextPage ? (
          <ActivityIndicator style={{ marginVertical: 20 }} />
        ) : null
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
  card: {
    marginBottom: 15,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f8f8f8",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: "100%",
    height: 200,
  },
  author: {
    padding: 10,
    fontSize: 14,
    color: "#333",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
