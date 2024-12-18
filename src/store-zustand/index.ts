import { create } from "zustand";
import { api } from "../lib/axios";

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

	load: () => Promise<void>;
	play: (moduleAndLessonIndex: [number, number]) => void;
	next: () => void;
}

export const useStore = create<PlayerState>((set, get) => ({
	course: null,
	currentModuleIndex: 0,
	currentLessonIndex: 0,
	isLoading: false,

	load: async () => {
		// set({ isLoading: true });

		// const response = await api.get("/courses/1"); // yes, id is hardcoded for now.
		// set(() => ({ course: response.data, isLoading: false }));
		try {
			set({ isLoading: true });
			const response = await api.get("/courses/1");
			set({
				course: response.data,
				isLoading: false,
			});
		} catch (error) {
			set({ isLoading: false });
			console.error("GSS Failed to load course:", error);
		}
	},

	play: (moduleAndLessonIndex: [number, number]) => {
		const [moduleIndex, lessonIndex] = moduleAndLessonIndex;

		set({
			currentModuleIndex: moduleIndex,
			currentLessonIndex: lessonIndex,
		});
	},

	next: () => {
		const { currentModuleIndex, currentLessonIndex, course } = get();

		const nextLessonIndex = currentLessonIndex + 1;
		const nextLesson =
			course?.modules[currentModuleIndex].lessons[nextLessonIndex];

		if (nextLesson) {
			set({ currentLessonIndex: nextLessonIndex });
		} else {
			const nextModuleIndex = currentModuleIndex + 1;
			const nextModule = course?.modules[nextModuleIndex];

			if (nextModule) {
				set({
					currentModuleIndex: nextModuleIndex,
					currentLessonIndex: 0,
				});
			}
		}
	},
}));

export const useCurrentLesson = () => {
	return useStore((store) => {
		const { currentLessonIndex, currentModuleIndex } = store;

		const currentModule = store.course?.modules[currentModuleIndex];
		const currentLesson = currentModule?.lessons[currentLessonIndex];

		return { currentModule, currentLesson };
	});
};
