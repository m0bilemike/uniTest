import { DoubleTapImage } from "@/components/DoubleTapImage";
import { AppDispatch, RootState } from "@/store";
import { toggleLike } from "@/store/likesSlice";
import { PicsumImage } from "@/types/types";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function LikedImages() {
  const dispatch = useDispatch<AppDispatch>();
  const likedImages = useSelector(
    (state: RootState) => state.likes.likedImages,
  );
  const [isGrid, setIsGrid] = useState(true);

  const validImages = useMemo(
    () =>
      likedImages.filter((img) => img?.id && img?.download_url && img?.author),
    [likedImages],
  );

  const toggleLayout = () => setIsGrid((prev) => !prev);

  const renderItem = ({ item }: { item: PicsumImage }) => {
    const liked = likedImages.some((img) => img.id === item.id);

    return (
      <View style={[styles.card, isGrid && styles.cardGrid]}>
        {/* wrapper relative */}
        <View style={{ position: "relative" }}>
          <DoubleTapImage
            uri={item.download_url}
            liked={liked}
            onDoubleTap={() => dispatch(toggleLike(item))}
            isGrid={isGrid}
          />

          {/* Top-right heart */}
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

          {/* Bottom author overlay, full width */}
          <View style={styles.bottomSection}>
            <Text style={styles.author}>{item.author}</Text>
          </View>
        </View>
      </View>
    );
  };

  if (validImages.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No liked images yet!</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingTop: 100 }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Liked Images</Text>
        <TouchableOpacity onPress={toggleLayout}>
          <MaterialIcons
            name={isGrid ? "view-list" : "grid-view"}
            size={28}
            color="black"
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={validImages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={isGrid ? 2 : 1}
        key={isGrid ? "g" : "l"}
        contentContainerStyle={styles.list}
        columnWrapperStyle={isGrid ? styles.columnWrapper : undefined}
        showsVerticalScrollIndicator={false}
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
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  list: { padding: 10 },
  columnWrapper: { justifyContent: "space-between" },

  card: {
    marginBottom: 15,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f8f8f8",
  },

  cardGrid: {
    flexBasis: "48%", // fixed width for grid, leaves some gap
    marginBottom: 15,
    borderRadius: 8,
    overflow: "hidden",
  },

  heartButton: { position: "absolute", top: 5, right: 5, zIndex: 2 },
  iconShadow: {
    textShadowColor: "white",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
  },

  bottomSection: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    justifyContent: "center",
  },

  author: { color: "white", fontWeight: "bold", fontSize: 12 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
