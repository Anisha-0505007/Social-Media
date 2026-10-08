import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice.js";
import postsReducer from "./postsSlice.js";
import profilesReducer from "./profilesSlice.js";
import reelsReducer from "./reelsSlice.js";

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  profiles: profilesReducer,
  reels: reelsReducer,
});

const persistConfig = {
  key: "social-media",
  storage,
  whitelist: ["posts", "profiles", "reels"],
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
