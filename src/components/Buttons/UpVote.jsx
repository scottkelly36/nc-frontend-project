import axios from 'axios';

const UpVote = ({
	review_id,
	allReviews,
	setAllReviews,
	setReview,
	setLikes,
	likes,
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

				setLikes([...likes, review_id]);
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
			<svg
				xmlns='http://www.w3.org/2000/svg'
				className='h-6 w-6'
				fill='none'
				viewBox='0 0 24 24'
				stroke='currentColor'
				strokeWidth={2}
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5'
				/>
			</svg>{' '}
			Like
		</button>
	);
};

export default UpVote;
