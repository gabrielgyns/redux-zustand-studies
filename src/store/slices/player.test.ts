import { describe, expect, it } from "vitest";
import { player as reducer, play, next, PlayerState } from "./player";

describe("player slice", () => {
	const mockedState: PlayerState = {
		course: {
			id: 1,
			modules: [
				{
					id: 1,
					title: "Iniciando com React",
					lessons: [
						{ id: "Jai8w6K_GnY", title: "CSS Modules", duration: "13:45" },
						{
							id: "w-DW4DhDfcw",
							title: "Estilização do Post",
							duration: "10:05",
						},
					],
				},
				{
					id: 2,
					title: "Estrutura da aplicação",
					lessons: [
						{
							id: "gE48FQXRZ_o",
							title: "Componente: Comment",
							duration: "13:45",
						},
						{ id: "Ng_Vk4tBl0g", title: "Responsividade", duration: "10:05" },
					],
				},
			],
		},
		currentModuleIndex: 0,
		currentLessonIndex: 0,
		isLoading: false,
	};

	it("should be able to play a video", () => {
		const state = reducer(mockedState, play([1, 1]));

		expect(state.currentModuleIndex).toEqual(1);
		expect(state.currentLessonIndex).toEqual(1);
	});

	it("should be able to play the next lesson", () => {
		const state = reducer(mockedState, next());

		expect(state.currentModuleIndex).toEqual(0);
		expect(state.currentLessonIndex).toEqual(1);
	});

	it("should be able to play the next lesson in the next module", () => {
		const state = reducer({ ...mockedState, currentLessonIndex: 1 }, next());

		expect(state.currentModuleIndex).toEqual(1);
		expect(state.currentLessonIndex).toEqual(0);
	});

	it("should not change current module and lesson indexes if there is no more lessons", () => {
		const state = reducer(
			{ ...mockedState, currentLessonIndex: 1, currentModuleIndex: 1 },
			next()
		);

		expect(state.currentModuleIndex).toEqual(1);
		expect(state.currentLessonIndex).toEqual(1);
	});
});
