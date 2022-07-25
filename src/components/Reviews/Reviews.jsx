import { Fragment, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './Reviews.css';
import Filter from '../Filter/Filter';

const Reviews = () => {
	const [isLoading, setLoading] = useState(true);
	const [allReviews, setAllReviews] = useState([]);
	const [selectedCategory, setCategory] = useState('');
	const [allCategories, setAllCategories] = useState([]);

	const { params } = useParams();
	console.log(params);

	useEffect(() => {
		axios
			.get(
				'https://scotts-game-app.herokuapp.com/api/reviews',
				{
					params: {
						category: selectedCategory,
					},
				}
			)
			.then((res) => {
				setAllReviews(res.data.reviews);
				setLoading(false);
			});
	}, [selectedCategory]);
	console.log(selectedCategory);
	return (
		<Fragment>
			<Filter
				setCategory={setCategory}
				setAllCategories={setAllCategories}
				allCategories={allCategories}
			/>
			<header className='home-header'>
				<h1 className='review-header'>Reviews</h1>
				<div className='category-description'>
					<h2>
						{!selectedCategory
							? `All Categories`
							: `${selectedCategory}`}
					</h2>
					<p>
						{!selectedCategory
							? ``
							: `${[...allCategories].map((category) => {
									if (category.slug === selectedCategory) {
										return `${category.description}`;
									}
							  })}`}
					</p>
				</div>
			</header>
			<section className='home-container'>
				{[...allReviews].map((review) => {
					return (
						<article className='review-card'>
							<div className='card-img-section'>
								<img
									src={review.review_img_url}
									alt=''
									className='review-card-img'
								/>
								<div className='vote-btns'>
									<button className='btn btn-feature'>
										+
									</button>
									<button className='btn btn-danger'>
										-
									</button>
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

export default Reviews;
