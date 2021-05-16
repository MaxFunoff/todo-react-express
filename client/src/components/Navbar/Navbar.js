import { NavLink } from 'react-router-dom';
import classes from './Navbar.module.css';

export const Navbar = () => {
	return (
		<nav className={classes.navbar}>
			<NavLink to='/' activeClassName={classes.isActive} exact={true}>
				<div className={classes.navItem}>
					<div className={classes.title}>Home</div>
				</div>
			</NavLink>

			<NavLink to='/form' activeClassName={classes.isActive}>
				<div className={classes.navItem}>
					<div className={classes.title}>New Task</div>
				</div>
			</NavLink>
		</nav>
	);
};
