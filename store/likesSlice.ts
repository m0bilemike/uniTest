import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PicsumImage {
  id: string;
  author: string;
  download_url: string;
  width: number;
  height: number;
  url: string;
}

interface LikesState {
  likedImages: PicsumImage[];
}

const initialState: LikesState = {
  likedImages: [],
};

const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<PicsumImage>) => {
      const image = action.payload;
      const exists = state.likedImages.find((img) => img.id === image.id);
      if (exists) {
        state.likedImages = state.likedImages.filter(
          (img) => img.id !== image.id,
        );
      } else {
        state.likedImages.push(image);
      }
    },
  },
});

export const { toggleLike } = likesSlice.actions;
export default likesSlice.reducer;
