import { useState, useContext } from 'react';
import { Context } from '../store/Store';

export const useTasks = () => {
	const [state, dispatch] = useContext(Context);
	// Loading not used but can be used for spinners and user indication
	const [loading, setLoading] = useState(false);
	// Same goes for error
	const [err, setErr] = useState(null);

	// Fetching all tasks by URI
	const fetchData = async (uri) => {
		if (!uri) return;
		setLoading(true);

		const response = await fetch(uri);
		const _data = await response.json();

		if (_data.success) {
			dispatch({ type: 'SET_TASKS', payload: _data.data });
		}

		setErr(_data.err);

		setLoading(false);
	};

	// Deleting task
	const deleteTask = async (_id) => {
		const response = await fetch(`/api/tasks/${_id}`, {
			method: 'DELETE',
		});
		const data = await response.json();

		if (data.success) {
			dispatch({ type: 'REMOVE_TASK', payload: _id });
		}
	};

	// Fetching one task by ID
	const fetchOne = async (id) => {
		const response = await fetch(`/api/tasks/${id}`);
		const _data = await response.json();

		return { err: _data.err, data: _data.data };
	};


	// Upserting task
	const upsertTask = async (task, _id) => {
		setLoading(true);

		// Fetch request options
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				...task,
				_id,
			}),
		};

		try {
			await fetch(`/api/tasks`, requestOptions);

			// Update tasks array in store
			if (_id) {
				const _tasks = [...state.tasks];
				const index = _tasks.findIndex((task) => task._id === _id);

				if (index !== -1) {
					_tasks[index] = { ..._tasks[index], ...task };
					dispatch({type: 'SET_TASKS', payload: _tasks})
				}
			}
		} catch (error) {
			console.log(error);

			setErr(error);
		}

		setLoading(false);
	};

	return { fetchData, deleteTask, fetchOne, upsertTask, state, loading, err };
};
