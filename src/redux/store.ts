import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/atuhReducer";

// persistの設定
const persistConfig = {
  key: "root", // ストレージキー
  storage,     // 保存先をlocalStorageに設定
};

// ルートリデューサーをpersistReducerでラップ
const rootReducer = combineReducers({
  auth: authReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

// ストアを作成
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // 非シリアライズ可能な値のチェックを無効化
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// persistorを作成
const persistor = persistStore(store);

export { store, persistor };
