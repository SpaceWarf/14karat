import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WarInfo } from "../../state/warInfo";

export interface WarInfoState {
  warInfo: WarInfo;
}

const initialState: WarInfoState = {
  warInfo: {},
};

export const warInfo = createSlice({
  name: 'WarInfo',
  initialState: initialState,
  reducers: {
    setWarInfo: (state, action: PayloadAction<WarInfo>) => {
      state.warInfo = action.payload;
    },
  },
});

export const { setWarInfo } = warInfo.actions;
export default warInfo.reducer;