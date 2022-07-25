import './App.css';
import Home from './components/Home/Home.jsx';
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
				<Routes>
					<Route path='/' element={<Home />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
