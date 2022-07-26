import { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
	const [isLoading, setLoading] = useState(true);
	const [allReviews, setAllReviews] = useState([]);

	useEffect(() => {
		axios
			.get(
				'https://scotts-game-app.herokuapp.com/api/reviews'
			)
			.then((res) => {
				setAllReviews(res.data.reviews);
				setLoading(false);
			});
	}, []);
	console.log(allReviews);
	return (
		<Fragment>
			<section className='container'>
				<h1>Welcome to NC Games</h1>
			</section>
		</Fragment>
	);
};

export default Home;
