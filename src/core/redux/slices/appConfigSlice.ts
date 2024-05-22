import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppConfig {
  backdrop: boolean;
  menuMobile: boolean;
  shoppingCartMobileMenu: boolean;
  dashboardLayoutMobile: boolean;
}

const initialState: AppConfig = {
  backdrop: false,
  menuMobile: false,
  shoppingCartMobileMenu: false,
  dashboardLayoutMobile: false,
};

export const appConfigSlice = createSlice({
  name: "appConfig",
  initialState,
  reducers: {
    showMenuMobileHandler: (state: AppConfig, action: PayloadAction) => {
      state.menuMobile = !state.menuMobile;
    },
  },
});

export const { showMenuMobileHandler } = appConfigSlice.actions;

export default appConfigSlice.reducer;
