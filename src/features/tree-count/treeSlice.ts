import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";

export interface PlantData {
  value: number;
  createdAt: string;
}
export interface TreeState {
  isLoading: boolean;
  error: string;
  data: Array<PlantData>;
}

export const initialState: TreeState = {
  isLoading: false,
  error: "",
  data: [],
};

export const treeSlice = createSlice({
  name: "tree",
  initialState,
  reducers: {
    getPlantData: (state: TreeState) => {
      state.isLoading = true;
    },
    getPlantDataError: (state: TreeState, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    getPlantDataSuccess: (
      state: TreeState,
      action: PayloadAction<Array<PlantData>>
    ) => {
      state.data = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  getPlantData,
  getPlantDataError,
  getPlantDataSuccess,
} = treeSlice.actions;

export const apiGetPlantData = (): AppThunk => (dispatch) => {
  fetch("https://public.ecologi.com/trees")
    .then((response) => response.json())
    .then((data) => dispatch(getPlantDataSuccess(data)));
};

export const selectData = (state: RootState) => state.tree.data;
export const selectLoading = (state: RootState) => state.tree.isLoading;

export default treeSlice.reducer;
