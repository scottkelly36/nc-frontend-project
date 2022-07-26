import { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
import DownVote from '../Buttons/DownVote';
import UpVote from '../Buttons/UpVote';

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
	},[]);
	
	return (
		<Fragment>
			<header className='home-header'>
				<h1 className='review-header'>Reviews</h1>
			</header>
			<section className='home-container'>
				{allReviews.map((review) => {
					return (
						<article className='review-card'>
							<div className='card-img-section'>
								<img
									src={review.review_img_url}
									alt=''
									className='review-card-img'
								/>
								<div className='vote-btns'>
									<UpVote review_id={review.review_id} allReviews={allReviews} setAllReviews={setAllReviews}/>
									<DownVote review_id={review.review_id} allReviews={allReviews} setAllReviews={setAllReviews}/>
								</div>

								<p className='total-votes'>
									{review.votes}
								</p>
							</div>
							<div className='review-info'>
								<h2 className='card-title'>
									{review.title}
								</h2>
								<div className='card-details'>
									<p className='card-category'>
										{review.category}
									</p>
									<p>{review.designer}</p>
								</div>
								<p className='card-body'>
									{review.review_body.substring(0, 50)} ...
									<Link to={`/${review.review_id}`}>
										{' '}
										See more
									</Link>
								</p>
								<p className='review-author'>
									{review.owner}
								</p>
							</div>
						</article>
					);
				})}
			</section>
		</Fragment>
	);
};

export default Home;
