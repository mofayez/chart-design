import { configureStore } from "@reduxjs/toolkit";
import chartSlice from "./slices/chart-slice";
import uiSlice from "./slices/ui-slice";

const store = configureStore({
    reducer: {chart: chartSlice.reducer, ui: uiSlice.reducer}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;