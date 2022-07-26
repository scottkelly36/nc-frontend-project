import axios from 'axios';

const UpVote = ({
	review_id,
	allReviews,
	setAllReviews,
	setReview,
    setLikes,
    likes
}) => {
	const Up = () => {
		axios
			.patch(
				`https://scotts-game-app.herokuapp.com/api/reviews/${review_id}`,
				{
					inc_votes: 1,
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

                    setLikes([...likes, review_id])
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<button
			className='btn btn-feature'
			onClick={() => {
				Up();
			}}
		>
			+
		</button>
	);
};

export default UpVote;
