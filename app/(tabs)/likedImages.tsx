import React, { useCallback, useMemo, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { Header } from "@/components/Header";
import { HeaderTitle } from "@/components/HeaderTitle";
import { ImageCard } from "@/components/ImageCard";
import { Text, useThemeColor, View } from "@/components/Themed";
import { AppDispatch, RootState } from "@/store";
import { toggleLike } from "@/store/imageSlice";
import { PicsumImage } from "@/types/types";

export default function LikedImages() {
  const dispatch = useDispatch<AppDispatch>();
  const likedImages = useSelector((state: RootState) =>
    state.images.ids.map(id => state.images.entities[id]).filter(Boolean)
  );
  const theme = useSelector((state: RootState) => state.theme.current);
  const [isGrid, setIsGrid] = useState(true);

  const validImages = useMemo(() => likedImages.filter(img => img?.id && img?.download_url && img?.author), [likedImages]);
  const textColor = useThemeColor({}, "text");
  const toggleLayout = useCallback(() => setIsGrid(prev => !prev), []);

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
    [likedImages, isGrid, dispatch]
  );

  if (validImages.length === 0) {
    return (
      <View style={{ flex: 1, backgroundColor: theme === "light" ? "#fff" : "#121212" }}>
        <Header />
        <View style={styles.center}>
        <Text style={[{ color: textColor }, styles.text]}>No liked images yet!</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1}}>
      <Header />
      <HeaderTitle
              title='Liked Images'
              isGrid={isGrid}
              toggleLayout={toggleLayout}
              />
      <FlatList
        data={validImages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={isGrid ? 2 : 1}
        key={isGrid ? "g" : "l"}
        contentContainerStyle={{ padding: 10 }}
        columnWrapperStyle={isGrid ? { justifyContent: "space-between" } : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"}
})