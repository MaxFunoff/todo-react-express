import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useTasks } from '../../hooks/useTasks';

import { ListItem } from './ListItem/ListItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { SearchBar } from '../SearchBar/SearchBar';

import qs from 'query-string';
import classes from './List.module.css';

export const List = () => {
	const { state } = useTasks();
	const location = useLocation();
	const history = useHistory();

	const queryParam = qs.parse(location.search);
	const [byDate, setByDate] = useState(queryParam.byDate || '');

	const handleByDate = () => {
		const queryParam = qs.parse(location.search);

		let byDate = queryParam.byDate;
		if (byDate !== 'asc') {
			byDate = 'asc';
		} else {
			byDate = 'desc';
		}

		const newQueryParam = {
			...queryParam,
			byDate,
		};

		// Pushing new url with updated query params while keeping the old ones
		setByDate(byDate);
		history.push({ pathname: '/', search: qs.stringify(newQueryParam) });
	};

	return (
		<div className={classes.list}>
			<div className={classes.listHeader}>
				<h2>To Do</h2>

				<SearchBar />
			</div>

			<div className={classes.listDescription}>
				<p>Task</p>
				<div className={classes.dateButton} onClick={handleByDate}>
					<span>Date Added </span>
					<FontAwesomeIcon icon={byDate !== 'asc' ? faCaretDown : faCaretUp} />
				</div>
				<p>Ending Date</p>
				<p>Actions</p>
			</div>

			<div className='divider' />

			<div className={classes.listContent}>
				{state.tasks.map((task) => (
					<ListItem task={task} key={task._id} />
				))}
			</div>
		</div>
	);
};
