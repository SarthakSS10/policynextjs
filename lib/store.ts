import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { userApi } from "./userApi";
import { policyApi } from "./policyApi";





export const makeStore = () =>
  configureStore({
    reducer: {
      [userApi.reducerPath]: userApi.reducer,
      [policyApi.reducerPath]:policyApi.reducer,

    },
    middleware: (gDM) => gDM().concat([userApi.middleware,policyApi.middleware]),
    // middleware: [thunk],

  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });