import { PicsumImage } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ImageState {
  ids: string[];
  entities: Record<string, PicsumImage & { liked?: boolean }>;
}

const initialState: ImageState = {
  ids: [],
  entities: {},
};

export const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<PicsumImage>) => {
      const image = action.payload;
      if (!image?.id) return;

      const id = image.id;
      if (!state.entities[id]) {
        state.entities[id] = { ...image, liked: true };
        state.ids.push(id);
      } else {
        state.entities[id].liked = !state.entities[id].liked;
        if (!state.entities[id].liked) {
          delete state.entities[id];
          state.ids = state.ids.filter((i) => i !== id);
        }
      }
    },
  },
});

export const { toggleLike } = imageSlice.actions;

export default imageSlice.reducer;
