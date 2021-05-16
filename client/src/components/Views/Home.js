import { useEffect } from 'react';
import { useTasks } from '../../hooks/useTasks';
import { List } from '../List/List';
import { useLocation } from 'react-router-dom';
import qs from 'query-string';

export const Home = () => {
	const location = useLocation();

	const { fetchData } = useTasks();

	useEffect(() => {
		const queryParam = qs.parse(location.search);

		const uri = `
		/api/tasks/?byDate=
		${queryParam.byDate || ''}&search=
		${queryParam.search || ''}`;

		fetchData(uri);
	}, [location]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
			<h1 style={{color: '#fff'}}>Welcome back</h1>
			<List />
		</div>
	);
};
