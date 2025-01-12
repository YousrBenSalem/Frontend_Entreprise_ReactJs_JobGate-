import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./userSlice"
import chatSlice from "./chatSlice"

import storage from "redux-persist/lib/storage" ;
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import { combineReducers } from "redux";



//export  const store = configureStore({reducer: authSlice})
 const persistConfig = {
  key : "token",
  storage,
  whitelist: ["user","tokens"],

 }
 const authPersistedReducer = persistReducer(persistConfig, authSlice);
 const rootReducer = combineReducers({
  auth: authPersistedReducer, // Reducer avec persistance
  chat: chatSlice, // Reducer non persistant
});
export const store = configureStore({
  reducer: rootReducer,
});

export let persistor = persistStore(store);