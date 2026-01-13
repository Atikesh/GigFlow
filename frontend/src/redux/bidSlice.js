import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import gigApi from "../services/gigApi";

export const fetchGigs = createAsyncThunk("gigs/fetch", async (query) => {
  const res = await gigApi.getAllGigs(query);
  return res;
});

export const createGig = createAsyncThunk("gigs/create", async (gigData) => {
  const res = await gigApi.createGig(gigData);
  return res;
});

export const fetchGigById = createAsyncThunk("gigs/single", async (id) => {
  const res = await gigApi.getGig(id);
  return res;
});

const gigSlice = createSlice({
  name: "gigs",
  initialState: {
    gigs: [],
    singleGig: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch All Gigs
      .addCase(fetchGigs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGigs.fulfilled, (state, action) => {
        state.loading = false;
        state.gigs = action.payload;
      })
      .addCase(fetchGigs.rejected, (state) => {
        state.loading = false;
      })

      // Fetch Single Gig
      .addCase(fetchGigById.fulfilled, (state, action) => {
        state.singleGig = action.payload;
      })

      // Create Gig
      .addCase(createGig.fulfilled, (state, action) => {
        state.gigs.push(action.payload);
      });
  },
});

export default gigSlice.reducer;
