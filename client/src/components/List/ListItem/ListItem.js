import { useTasks } from '../../../hooks/useTasks';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faTrash,
	faEdit,
	faCheck,
	faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import clsx from 'clsx';
import classes from './ListItem.module.css';

export const ListItem = ({ task }) => {
	const { deleteTask, upsertTask } = useTasks();

	// Convert JS timestamp to local date string
	const toDate = (date) => {
		const _date = new Date(date);
		const formattedDate = _date.toLocaleDateString();

		return formattedDate;
	};

	const handleDelete = () => {
		deleteTask(task._id);
	};

	const handleComplete = () => {
		const _task = { ...task };
		_task.completed = !_task.completed;

		upsertTask(_task, _task._id);
	};
	return (
		<div
			className={clsx(classes.listItem, task.completed && classes.completed)}>
			<div className={clsx(classes.itemTitle, classes.item)}>
				{task.content}
			</div>
			<div className={classes.item}>{toDate(task.createdAt)}</div>
			<div className={classes.item}>{toDate(task.endDate)}</div>

			<div className={classes.itemActions}>
				<div className={classes.actionItem} onClick={handleComplete}>
					<FontAwesomeIcon icon={task.completed ? faTimes : faCheck} />
				</div>

				<div className={classes.actionItem}>
					<Link to={`/form/${task._id}`}>
						<FontAwesomeIcon icon={faEdit} />
					</Link>
				</div>

				<div className={classes.actionItem} onClick={handleDelete}>
					<FontAwesomeIcon icon={faTrash} />
				</div>
			</div>
		</div>
	);
};
