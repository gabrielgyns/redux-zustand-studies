import { describe, expect, it } from "vitest";
import { PlayerState, useStore } from ".";

describe("zustand store", () => {
	const mockedState: Partial<PlayerState> = {
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
		const { play } = useStore.getState();

		play([0, 1]);

		const { currentLessonIndex, currentModuleIndex } = useStore.getState();

		expect(currentModuleIndex).toEqual(0);
		expect(currentLessonIndex).toEqual(1);
	});

	it("should be able to play the next lesson", () => {
		const { next } = useStore.getState();

		next();

		const { currentLessonIndex, currentModuleIndex } = useStore.getState();

		expect(currentModuleIndex).toEqual(0);
		expect(currentLessonIndex).toEqual(1);
	});

	it("should be able to play the next lesson in the next module", () => {
		useStore.setState({ ...mockedState, currentLessonIndex: 1 });

		const { next } = useStore.getState();

		next();

		const { currentLessonIndex, currentModuleIndex } = useStore.getState();

		expect(currentModuleIndex).toEqual(1);
		expect(currentLessonIndex).toEqual(0);
	});

	it("should not change current module and lesson indexes if there is no more lessons", () => {
		useStore.setState({
			...mockedState,
			currentLessonIndex: 1,
			currentModuleIndex: 1,
		});

		const { next } = useStore.getState();

		next();

		const { currentLessonIndex, currentModuleIndex } = useStore.getState();

		expect(currentModuleIndex).toEqual(1);
		expect(currentLessonIndex).toEqual(1);
	});
});
