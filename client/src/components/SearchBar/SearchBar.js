import { useLocation, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import classes from './SearchBar.module.css';
import qs from 'query-string';


export const SearchBar = () => {
	const location = useLocation();
	const history = useHistory();
	const queryParam = qs.parse(location.search);
	const [search, setSearch] = useState(queryParam.search || '');

	const handleSearch = (e) => {
		e.preventDefault();
		const queryParam = qs.parse(location.search);
		const newQueryParam = {
			...queryParam,
			search,
		};

		// Pushing new url with updated query params while keeping the old ones
		history.push({ pathname: '/', search: qs.stringify(newQueryParam) });
	};

	return (
		<div className={classes.searchBar}>
			<form onSubmit={handleSearch} className={classes.searchForm}>
				<input
					type='text'
					placeholder='Search...'
					className={classes.searchInput}
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>

				<button className={classes.searchButton}>
					<FontAwesomeIcon icon={faSearch} />
				</button>
			</form>
		</div>
	);
};
