import { useCurrentLesson, useStore } from "../../store-zustand";

export function Header() {
	const { currentModule, currentLesson } = useCurrentLesson();

	const isLoading = useStore((store) => store.isLoading);

	const renderSkeleton = () => (
		<div className="flex flex-col gap-2">
			<div className="w-44 h-6 bg-zinc-800 rounded animate-pulse" />
			<div className="w-64 h-4 bg-zinc-800 rounded animate-pulse" />
		</div>
	);

	return (
		<div className="flex flex-col gap-1">
			{isLoading ? (
				renderSkeleton()
			) : (
				<>
					<h1 className="text-2xl font-bold">{currentLesson?.title}</h1>
					<span className="text-sm text-zinc-400">
						Módulo "{currentModule?.title}"
					</span>
				</>
			)}
		</div>
	);
}
