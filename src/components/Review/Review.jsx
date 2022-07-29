import {
	Fragment,
	useState,
	useEffect,
	useContext,
} from 'react';

import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading.jsx';
import axios from 'axios';
import './Review.css';

import DownVote from '../Buttons/DownVote';
import UpVote from '../Buttons/UpVote';
import { LikeTrackerContext } from '../../Context/LikeTracker.jsx';
import Error from '../Errors/Error';


import Comments from '../Comments/Comments.jsx';

const Review = () => {
	const { review_id } = useParams();
	const [review, setReview] = useState({});
	const [isLoading, setLoading] = useState(true);
	const [allComments, setAllComments] = useState([]);
	const [error, setError] =useState();

	const { likes, setLikes } = useContext(
		LikeTrackerContext
	);

	useEffect(() => {
		axios
			.get(
				`https://scotts-game-app.herokuapp.com/api/reviews/${review_id}`
			)
			.then((res) => {
				setReview(res.data.review);
				setLoading(false);
			}).catch((err)=>{
				setError(err)
				setLoading(false)
			})
	}, [review_id]);

	return( 
	error? <Error error={error}/> :
	isLoading ?( 
		<Loading />
	) : (
		<Fragment>
			<div className='review-heading'>
				<h1 className='review-title'>{review.title}</h1>
			</div>
			<section className='review-container'>
				<img
					src={review.review_img_url}
					className='review-img'
					alt=''
				/>
				<div className='review-info-container'>
					<p className='review-category'>
						{review.category}
					</p>
					<p className='review-designer'>
						Designed by {review.designer}
					</p>
					<p className='review-author'>
						Review by {review.owner}
					</p>
					<p className='review-body'>
						{review.review_body}
					</p>
					<div className='vote-btns'>
						{!likes.includes(review.review_id) ? (
							<UpVote
								review_id={review.review_id}
								review={review}
								setReview={setReview}
								setLikes={setLikes}
								likes={likes}
							/>
						) : (
							<DownVote
								review_id={review.review_id}
								review={review}
								setReview={setReview}
								setLikes={setLikes}
								likes={likes}
							/>
						)}
					</div>
					<p className='votes'>{review.votes}</p>
				</div>
			</section>

			<Comments
				review_id={review_id}
				setAllComments={setAllComments}
				allComments={allComments}
				setError={setError}
			/>
		</Fragment>)
	);
};

export default Review;
