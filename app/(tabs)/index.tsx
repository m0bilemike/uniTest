import { DoubleTapImage } from "@/components/DoubleTapImage"; // our animated component
import { Header } from "@/components/Hearder";
import { fetchImages, QUERY_KEY } from "@/data/data";
import { AppDispatch, RootState } from "@/store";
import { toggleLike } from "@/store/likesSlice";
import { PicsumImage } from "@/types/types";
import { MaterialIcons } from "@expo/vector-icons";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { Image as ExpoImage } from "expo-image";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const screenWidth = Dimensions.get("window").width;

export default function HomeScreen() {
  const [isGrid, setIsGrid] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const likedImages = useSelector(
    (state: RootState) => state.likes.likedImages,
  );

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
    if (nextPageData)
      nextPageData.forEach((img) => ExpoImage.prefetch(img.download_url));
  }, [data]);

  const toggleLayout = useCallback(() => setIsGrid((prev) => !prev), []);
  const handleRefresh = useCallback(() => refetch(), [refetch]);

  const renderItem = ({ item }: { item: (typeof images)[0] }) => {
    const liked = likedImages.some((img) => img.id === item.id);

    return (
      <View style={[styles.card, isGrid && styles.cardGrid]}>
        <DoubleTapImage
          uri={item.download_url}
          liked={liked}
          onDoubleTap={() => dispatch(toggleLike(item))}
          isGrid={isGrid}
        />

        {/* Top-right heart button */}
        <TouchableOpacity
          style={styles.heartButton}
          onPress={() => dispatch(toggleLike(item))}
        >
          <MaterialIcons
            name={liked ? "favorite" : "favorite-border"}
            size={24}
            color={liked ? "red" : "white"}
            style={styles.iconShadow}
          />
        </TouchableOpacity>

        {/* Bottom author overlay */}
        <View
          style={[styles.bottomSection, isGrid && styles.bottomSectionGrid]}
        >
          <Text style={styles.author}>{item.author}</Text>
        </View>
      </View>
    );
  };

  if (isPending) return <Loader />;
  if (isError) return <Error message={error?.message} />;
  if (!isSuccess) return null;

  return (
    <View style={{ flex: 1 }}>
      {/* Header with toggle */}
      <Header />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Images</Text>
        <TouchableOpacity onPress={toggleLayout}>
          <MaterialIcons
            name={isGrid ? "view-list" : "grid-view"}
            size={28}
            color="black"
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        key={isGrid ? "g" : "l"}
        numColumns={isGrid ? 2 : 1}
        contentContainerStyle={styles.list}
        columnWrapperStyle={isGrid ? styles.columnWrapper : undefined}
        onEndReached={() =>
          hasNextPage && !isFetchingNextPage && fetchNextPage()
        }
        onEndReachedThreshold={2}
        refreshing={isRefetching}
        onRefresh={handleRefresh}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator style={{ marginVertical: 20 }} />
          ) : null
        }
      />
    </View>
  );
}

const Loader = () => (
  <View style={styles.center}>
    <ActivityIndicator size="large" />
  </View>
);
const Error = ({ message }: { message?: string }) => (
  <View style={styles.center}>
    <Text style={{ color: "red" }}>{message ?? "Error"}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold"
  },
  list: {
    padding: 10
  },
  columnWrapper: {
    justifyContent: "space-between"
  },
  card: {
    marginBottom: 15,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f8f8f8",
  },
  cardGrid: {
    flex: 1,
    margin: 5
  },
  bottomSection: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 6,
    justifyContent: "center",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  bottomSectionGrid: {
    paddingVertical: 4,
  },
  author: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12
  },
  heartButton: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 2
  },
  iconShadow: {
    textShadowColor: "white",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
});
