import ReactPlayer from "react-player";
import { Loader } from "lucide-react";
import { useCurrentLesson, useStore } from "../../store-zustand";

export function Video() {
	const { next, isLoading } = useStore((store) => {
		return {
			next: store.next,
			isLoading: store.isLoading,
		};
	});

	const { currentLesson } = useCurrentLesson();

	function handlePlayNext() {
		next();
	}

	return (
		<div className="w-full bg-zinc-950 aspect-video">
			{isLoading ? (
				<div className="flex h-full items-center justify-center">
					<Loader className="w-6 h-6 text-zinc-400 animate-spin" />
				</div>
			) : (
				<ReactPlayer
					width="100%"
					height="100%"
					controls
					url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
					onEnded={handlePlayNext}
				/>
			)}
		</div>
	);
}
