import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { fireApi } from "./Api";

export const store = configureStore({
  reducer: {
    [fireApi.reducerPath]: fireApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fireApi.middleware),
});

setupListeners(store.dispatch);
