import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Quote } from "../../state/quotes";

export interface QuotesState {
  quotes: Quote[];
}

const initialState: QuotesState = {
  quotes: [],
};

export const quotes = createSlice({
  name: 'Quotes',
  initialState: initialState,
  reducers: {
    setQuotes: (state, action: PayloadAction<Quote[]>) => {
      state.quotes = action.payload;
    },
  },
});

export const { setQuotes } = quotes.actions;
export default quotes.reducer;