import { ChevronDown, MessageCircle } from "lucide-react";
import { Header } from "./Header";
import { Video } from "./Video";
import { Module } from "./Module";
import { useCallback, useEffect } from "react";
import { useCurrentLesson, useStore } from "../../store-zustand";

export function Player() {
	const { course, load, isLoading } = useStore((store) => ({
		course: store.course,
		load: store.load,
		isLoading: store.isLoading,
	}));

	const { currentLesson } = useCurrentLesson();

	const handleLoad = useCallback(() => {
		load();
	}, [load]);

	useEffect(() => {
		handleLoad();
	}, [handleLoad]);

	// Easy, but react-helmet could be better some how?
	useEffect(() => {
		if (currentLesson) {
			document.title = `${currentLesson?.title} - MyPlayer`;
		}
	}, [currentLesson]);

	// This should be in Module maybe
	const renderModuleSkeleton = () => (
		<div>
			<div className="flex w-full items-center gap-3 bg-zinc-800 p-4 animate-pulse">
				<div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs" />

				<div className="flex flex-col gap-1 text-left">
					<div className="w-20 h-4 bg-zinc-900 rounded" />
					<div className="w-32 h-3 bg-zinc-900 rounded" />
				</div>

				<ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform" />
			</div>

			<div className="relative flex flex-col gap-4 p-6">
				<div className="w-full h-4 bg-zinc-800 rounded animate-pulse" />
				<div className="w-full h-4 bg-zinc-800 rounded animate-pulse" />
				<div className="w-full h-4 bg-zinc-800 rounded animate-pulse" />
				<div className="w-full h-4 bg-zinc-800 rounded animate-pulse" />
			</div>
		</div>
	);

	return (
		<div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
			<div className="flex w-[1100px] flex-col gap-6">
				<div className="flex items-center justify-between">
					<Header />

					<button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600">
						<MessageCircle className="w-4 h-4" /> Deixar Feedback
					</button>
				</div>

				<main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-80">
					<div className="flex-1">
						<Video />
					</div>

					<aside className="w-80 absolute top-0 bottom-0 right-0 border-l divide-y-2 divide-zinc-900 border-zinc-800 bg-zinc-900 overflow-y-scroll scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800">
						{isLoading
							? renderModuleSkeleton()
							: course?.modules &&
							  course?.modules.map((module, index) => (
									<Module
										key={module.id}
										moduleIndex={index}
										title={module.title}
										amountOfLessons={module.lessons.length}
									/>
							  ))}
					</aside>
				</main>
			</div>
		</div>
	);
}
