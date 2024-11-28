import { configureStore, createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

// createSlice -> Cria um reducer com ações e reducers (fatias de estados)
const todoSlice = createSlice({
	name: "todo",
	initialState: ["Make coffee", "Walk the dog", "Study Zustand"], // Como exemplo
	reducers: {
		add: (state, action) => {
			state.push(action.payload);
		},
	},
});

export const store = configureStore({
	reducer: {
		todo: todoSlice.reducer,
	}, // Informações que vamos compartilhar entre os componentes
});

export const { add } = todoSlice.actions;

// Tipando e retornando meu próprio useSelector
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
