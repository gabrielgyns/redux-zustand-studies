import { useState } from "react";
import { useDispatch } from "react-redux";
import { add } from "../store";

export function AddTodo() {
	const [newTodo, setNewTodo] = useState("");
	const dispatch = useDispatch();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		dispatch(add(newTodo));
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="New to-do"
				value={newTodo}
				onChange={(e) => setNewTodo(e.target.value)}
			/>

			<button type="submit">Adicionar</button>
		</form>
	);
}
