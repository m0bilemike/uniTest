import { PicsumImage } from "@/types/types";
import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

export const imagesAdapter = createEntityAdapter<PicsumImage>({
  selectId: (img) => img.id,
});

const initialState = imagesAdapter.getInitialState();

const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<PicsumImage>) => {
      const image = action.payload;
      const id = image?.id;
      if (!id) return;

      if (!state.entities[id]) {
        state.entities[id] = { ...image, liked: true };
        state.ids.push(id);
      } else {
        state.entities[id].liked = !state.entities[id].liked;
        if (!state.entities[id].liked) {
          state.ids = state.ids.filter((i) => i !== id);
          delete state.entities[id];
        }
      }
    },
    addImages: (state, action: PayloadAction<PicsumImage[]>) => {
      imagesAdapter.addMany(state, action.payload);
    },
  },
});

export const { toggleLike, addImages } = imageSlice.actions;

export default imageSlice.reducer;
