import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: false,
	userData: {},
};
export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action) => {
			state.status = true;
			state.userData = action.payload;
		},
		logout: (state) => {
			state.status = false;
			state.userData = {};
			state.token = null;
		},
	},
});

export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
