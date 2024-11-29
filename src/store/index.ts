import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { player } from "./slices/player";

export const store = configureStore({
	reducer: {
		player,
	},
});

// Tipando e retornando meu próprio useSelector
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
