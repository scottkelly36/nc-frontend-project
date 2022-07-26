import './App.css';
import Reviews from './components/Reviews/Reviews.jsx';
import Home from './components/Home/Home.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import {
	BrowserRouter,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/reviews' element={<Reviews />} />
					<Route
						path='/reviews/:category'
						element={<Reviews />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
