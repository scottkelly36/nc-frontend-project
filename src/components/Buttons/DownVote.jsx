import axios from 'axios';

const DownVote = ({
	review_id,
	allReviews,
	setAllReviews,
	setReview,
	setLikes,
	likes
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
					setLikes([...likes].filter((id)=>{
						return id !== review_id
					}))
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
