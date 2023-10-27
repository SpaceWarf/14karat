import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileInfo } from "../../state/profile";

export interface ProfileState {
  info: ProfileInfo;
  pfpUrl: string;
}

const initialState: ProfileState = {
  info: {
    id: '',
    name: '',
    phone: '',
    bleeter: '',
    email: '',
    bank: '',
    admin: false,
    pfp: '',
    division: '',
    roles: [],
    ssn: '',
  },
  pfpUrl: '',
};

export const profile = createSlice({
  name: 'Profile',
  initialState: initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<ProfileInfo>) => {
      state.info = action.payload;
    },
    setPfpUrl: (state, action: PayloadAction<string>) => {
      state.pfpUrl = action.payload;
    },
  },
});

export const { setProfile, setPfpUrl } = profile.actions;
export default profile.reducer;