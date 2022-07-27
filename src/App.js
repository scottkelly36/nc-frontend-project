import './App.css';
import Reviews from './components/Reviews/Reviews.jsx';
import Home from './components/Home/Home.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Review from './components/Review/Review.jsx';
import { useState } from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { LikeTrackerContext } from './Context/LikeTracker';

function App() {
	const [likes, setLikes] = useState([]);

	return (
		<div className='App'>
			<LikeTrackerContext.Provider
				value={{ likes, setLikes }}
			>
				<BrowserRouter>
					<Navbar />
					<Routes>
						<Route path='/' element={<Home />} />

						<Route path='/reviews' element={<Reviews />} />
						<Route
							path='review/:review_id'
							element={<Review />}
						/>

						<Route
							path='/reviews/:category'
							element={<Reviews />}
						/>
					</Routes>
				</BrowserRouter>
			</LikeTrackerContext.Provider>
		</div>
	);
}

export default App;
