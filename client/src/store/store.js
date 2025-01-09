import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user.slice";
import sessionStorage from "redux-persist/es/storage/session";
import persistStore from "redux-persist/es/persistStore";
import { persistReducer } from "redux-persist";

const rootReducer = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage: sessionStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
});
export const persistor = persistStore(store);
