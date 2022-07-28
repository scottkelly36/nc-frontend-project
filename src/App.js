import './App.css';
import Reviews from './components/Reviews/Reviews.jsx';
import Home from './components/Home/Home.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Review from './components/Review/Review.jsx';
import Error from './components/Errors/Error.jsx';
import { useState } from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
} from 'react-router-dom';
import { LikeTrackerContext } from './Context/LikeTracker';
import { DefaultUserContext } from './Context/DefaultUserContext';

function App() {
	const [likes, setLikes] = useState([]);
	const [user, setUser] = useState({
		username: 'tickle122',
		name: 'Tom Tickle',
		avatar_url:
			'https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953',
	});

	return (
		<div className='App'>
			<LikeTrackerContext.Provider
				value={{ likes, setLikes }}
			>
				<DefaultUserContext.Provider
					value={{ user, setUser }}
				>
					<BrowserRouter>
						<Navbar />
						<Routes>
							<Route path='/' element={<Home />} />

							<Route
								path='/reviews'
								element={<Reviews />}
							/>
							<Route
								path='review/:review_id'
								element={<Review />}
							/>

							<Route
								path='/reviews/:category'
								element={<Reviews />}
							/>
							<Route path='*' element={<Error />} />
						</Routes>
					</BrowserRouter>
				</DefaultUserContext.Provider>
			</LikeTrackerContext.Provider>
		</div>
	);
}
export default App;
