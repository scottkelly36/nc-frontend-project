import {
	Fragment,
	useState,
	useEffect,
	useContext,
} from 'react';

import {
	Link,
	useParams,
	useNavigate,
} from 'react-router-dom';
import axios from 'axios';
import './Reviews.css';
import Filter from '../Filter/Filter';
import Loading from '../Loading/Loading';
import DownVote from '../Buttons/DownVote';
import UpVote from '../Buttons/UpVote';
import { LikeTrackerContext } from '../../Context/LikeTracker.jsx';
import Error from '../Errors/Error';

const Reviews = () => {
	const { category } = useParams();
	const navigate = useNavigate();
	const { likes, setLikes } = useContext(
		LikeTrackerContext
	);

	const [isLoading, setLoading] = useState(true);
	const [allReviews, setAllReviews] = useState([]);
	const [selectedCategory, setCategory] =
		useState(category);
	const [allCategories, setAllCategories] = useState([]);

	const [error, setError] =useState();

	const [order, setOrder] = useState('ASC');
	const [sort, setSort] = useState('created_at');


	useEffect(() => {
		axios
			.get(
				'https://scotts-game-app.herokuapp.com/api/reviews',
				{
					params: {
						category: selectedCategory,
						order: order,
						sort_by: sort,
					},
				}
			)
			.then((res) => {
				setAllReviews(res.data.reviews);
				if (selectedCategory) {
					navigate(`/reviews/${selectedCategory}`);
				}
				setLoading(false);
			}).catch((err)=>{
				setError(err)
				setLoading(false)
			});
	}, [selectedCategory, navigate, order, sort]);
	
	return error? 
	<Error error={error}/> : 
	
	isLoading ? (
		<Loading />
	) : (
		<Fragment>
			<Filter
				setCategory={setCategory}
				setAllCategories={setAllCategories}
				allCategories={allCategories}
				setOrder={setOrder}
				setSort={setSort}
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
							: `${allCategories.map((category) => {
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
									{!likes.includes(review.review_id) ? (
										<UpVote
											review_id={review.review_id}
											allReviews={allReviews}
											setAllReviews={setAllReviews}
											setLikes={setLikes}
											likes={likes}
										/>
									) : (
										<DownVote
											review_id={review.review_id}
											allReviews={allReviews}
											setAllReviews={setAllReviews}
											setLikes={setLikes}
											likes={likes}
										/>
									)}
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
									<Link to={`/review/${review.review_id}`}>
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
