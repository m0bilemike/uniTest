import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';

export const selectLikedImages = createSelector(
  (state: RootState) => state.images.ids,
  (state: RootState) => state.images.entities,
  (ids, entities) =>
    ids
      .map((id) => entities[id])
      .filter((img) => img?.liked) || []
);