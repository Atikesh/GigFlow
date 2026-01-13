import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import gigReducer from "./gigSlice";
import bidReducer from "./bidSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    gigs: gigReducer,
    bids: bidReducer,
  },
});

export default store;
