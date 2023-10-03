import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Group {
  id: string;
  name: string;
  allies: string[];
  enemies: string[];
  hq: string;
  flag: string;
  identifiers: string;
  notes: string;
  cardColor: string;
}

export interface GroupsState {
  groups: Group[];
}

const initialState: GroupsState = {
  groups: [],
};

export const roles = createSlice({
  name: 'Groups',
  initialState: initialState,
  reducers: {
    setGroups: (state, action: PayloadAction<Group[]>) => {
      state.groups = action.payload;
    },
  },
});

export const { setGroups } = roles.actions;
export default roles.reducer;