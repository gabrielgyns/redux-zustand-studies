import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "..";
import { api } from "../../lib/axios";

interface Course {
	id: number;
	modules: {
		id: number;
		title: string;
		lessons: {
			id: string;
			title: string;
			duration: string;
		}[];
	}[];
}

export interface PlayerState {
	course: Course | null;
	currentModuleIndex: number;
	currentLessonIndex: number;
	isLoading: boolean;
}

const initialState: PlayerState = {
	course: null,
	currentModuleIndex: 0,
	currentLessonIndex: 0,
	isLoading: false,
};

// yes, id is hardcoded below
export const loadCourse = createAsyncThunk("player/load", async () => {
	const response = await api.get("/courses/1");

	return response.data;
});

const playerSlice = createSlice({
	name: "player",
	initialState,
	reducers: {
		play: (state, action: PayloadAction<[number, number]>) => {
			state.currentModuleIndex = action.payload[0];
			state.currentLessonIndex = action.payload[1];
		},

		next: (state) => {
			const nextLessonIndex = state.currentLessonIndex + 1;
			const nextLesson =
				state.course?.modules[state.currentModuleIndex].lessons[
					nextLessonIndex
				];

			if (nextLesson) {
				state.currentLessonIndex = nextLessonIndex;
			} else {
				const nextModuleIndex = state.currentModuleIndex + 1;
				const nextModule = state.course?.modules[nextModuleIndex];

				if (nextModule) {
					state.currentModuleIndex = nextModuleIndex;
					state.currentLessonIndex = 0;
				}
			}
		},
	},
	extraReducers(builder) {
		builder.addCase(loadCourse.pending, (state) => {
			state.isLoading = true;
		});

		builder.addCase(loadCourse.fulfilled, (state, action) => {
			state.course = action.payload;
			state.isLoading = false;
		});
	},
});

export const player = playerSlice.reducer;

export const { play, next } = playerSlice.actions;

/**
 **** Selectors ****
 *
 * Could be in a different file, like player/selectors.ts or playerSelectors.ts
 */

export const useCurrentLesson = () => {
	return useAppSelector((state) => {
		const { currentLessonIndex, currentModuleIndex } = state.player;

		const currentModule = state.player.course?.modules[currentModuleIndex];

		const currentLesson = currentModule?.lessons[currentLessonIndex];

		return { currentModule, currentLesson };
	});
};
