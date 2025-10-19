import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useEffect } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { DoubleTapImage } from "@/components/DoubleTapImage";
import { Header } from "@/components/Hearder";
import { usePicsumImages } from "@/hooks/usePicsumImages";
import { AppDispatch } from "@/store";
import { selectLikedImages } from "@/store/imageSelectors";
import { toggleLike } from "@/store/imageSlice";
import { PicsumImage } from "@/types/types";

export default function HomeScreen() {
  const [isGrid, setIsGrid] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const likedImages = useSelector(selectLikedImages);
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
    [data]
  );
  useEffect(() => {
    photos.forEach((img) => Image.prefetch?.(img.download_url));
  }, [photos]);

  const toggleLayout = useCallback(() => setIsGrid((prev) => !prev), []);

  const renderItem = useCallback(
    ({ item }: { item: PicsumImage }) => {
      const liked = likedImages.some((img) => img.id === item.id);

      return (
        <View style={[styles.imageWrapper, isGrid && styles.imageWrapperGrid]}>
          <DoubleTapImage
            uri={item.download_url}
            liked={liked}
            isGrid={isGrid}
            onDoubleTap={() => dispatch(toggleLike(item))}
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.5)"]}
            style={[styles.bottomSection, isGrid && styles.bottomSectionGrid]}
          >
            <Text style={styles.author}>{item.author}</Text>
          </LinearGradient>

          <TouchableOpacity
            style={styles.heartButton}
            onPress={() => dispatch(toggleLike(item))}
            hitSlop={10}
          >
            <MaterialIcons
              name={liked ? "favorite" : "favorite-border"}
              size={24}
              color={liked ? "red" : "white"}
            />
          </TouchableOpacity>
        </View>
      );
    },
    [likedImages, isGrid, dispatch],
  );

  if (isLoading) return <Text style={styles.center}>Loading...</Text>;
  if (isError)
    return <Text style={styles.center}>Error: {error?.message}</Text>;

  return (
    <View style={{ flex: 1 }}>
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
        data={photos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        key={isGrid ? "g" : "l"}
        numColumns={isGrid ? 2 : 1}
        contentContainerStyle={styles.list}
        columnWrapperStyle={isGrid ? styles.columnWrapper : undefined}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
        refreshing={false}
        onRefresh={refetch}
        ListFooterComponent={
          isFetchingNextPage ? (
            <Text style={{ textAlign: "center", margin: 10 }}>
              Loading more...
            </Text>
          ) : null
        }
      />
    </View>
  );
}

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
    fontWeight: "bold",
  },
  list: {
    padding: 10,
  },
  imageWrapper: {
    position: "relative",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 10,
    width: "100%",
  },

  imageWrapperGrid: {
    flexBasis: "48%",
  },

  bottomSection: {
    position: "absolute",
    bottom: 0,
    width: "95%",
    paddingHorizontal: 6,
    paddingVertical: 4,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  author: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  heartButton: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 10,
  },
  bottomSectionGrid: {
    position: "absolute",
    bottom: 5,
    left: 5,
    right: 5,
    width: "95%",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    overflow: "hidden",
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  card: {
    marginBottom: 15,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f8f8f8",
  },
  cardGrid: {
    flex: 1,
    margin: 5,
  },
  iconShadow: {
    textShadowColor: "white",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
