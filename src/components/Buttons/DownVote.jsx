import axios from 'axios';

const DownVote = ({
	review_id,
	allReviews,
	setAllReviews,
	setReview,
}) => {
	const Down = () => {
		axios
			.patch(
				`https://scotts-game-app.herokuapp.com/api/reviews/${review_id}`,
				{
					inc_votes: -1,
				}
			)
			.then((res) => {
				allReviews
					? setAllReviews(
							[...allReviews].map((review) => {
								if (review.review_id === review_id) {
									return res.data.review;
								} else {
									return review;
								}
							})
					  )
					: setReview(res.data.review);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<button
			className='btn btn-danger'
			onClick={() => Down()}
		>
			-
		</button>
	);
};

export default DownVote;
