import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FirestoreEntity } from "../../utils/firestore";

export interface ProfileState {
  info: ProfileInfo;
  pfpUrl: string;
}

export interface ProfileInfo extends FirestoreEntity {
  id: string;
  name: string;
  phone: string;
  bleeter: string;
  email: string;
  bank: string;
  admin: boolean;
  pfp: string;
  division: string;
  roles: string[];
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