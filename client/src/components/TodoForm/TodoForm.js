import classes from './TodoForm.module.css';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useTasks } from '../../hooks/useTasks';

export const TodoForm = () => {
	const history = useHistory();
	const { id } = useParams();

	const { fetchOne, upsertTask, loading } = useTasks();

	const [form, setForm] = useState({
		content: '',
		endDate: '',
	});

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await fetchOne(id);
			// Convert date to ISO to inject into input value
			const endDate = new Date(data.endDate).toISOString().split('T')[0];

			setForm({ content: data.content, endDate });
		};

		if (id) {
			fetchData();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Task upserting
		const task = {
			content: form.content,
			endDate: form.endDate,
		};

		await upsertTask(task, id);
		history.push('/');
	};

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const minDate = () =>{
		const today = new Date();
		const fromTmrw = new Date(today.setDate(today.getDate() + 2)).toISOString().split("T")[0];

		return fromTmrw
	}

	return (
		<form onSubmit={handleSubmit} className={classes.form}>
			<div className={classes.inputGroup}>
				<label htmlFor='content'>Task:</label>
				<input
					type='text'
					id='content'
					name='content'
					value={form.content}
					onChange={handleChange}
					required
					minLength={5}
				/>
			</div>

			<div className={classes.inputGroup}>
				<label htmlFor='endDate'>End Date:</label>
				<input
					type='date'
					id='endDate'
					name='endDate'
					value={form.endDate}
					onChange={handleChange}
					required
					min={minDate()}
				/>
			</div>

			<button disabled={loading} className={classes.submitBtn}>
				Save
			</button>
		</form>
	);
};
