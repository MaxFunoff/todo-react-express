import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './components/Views/Home';
import { Form } from './components/Views/Form';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Store from './store/Store';

const App = () => {
	return (
		<Store>
			<Router>
				<div className='App'>
					<header>
						<Navbar />
					</header>
					<main>
						<Switch>
							<Route path='/' exact>
								<Home />
							</Route>

							<Route path='/form' exact>
								<Form />
							</Route>

							<Route path='/form/:id'>
								<Form />
							</Route>
						</Switch>
					</main>
				</div>
			</Router>
		</Store>
	);
};

export default App;
