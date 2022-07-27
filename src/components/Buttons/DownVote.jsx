import axios from 'axios';

const DownVote = ({
	review_id,
	allReviews,
	setAllReviews,
	setReview,
	setLikes,
	likes,
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
				setLikes(
					[...likes].filter((id) => {
						return id !== review_id;
					})
				);
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
					d='M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5'
				/>
			</svg>
			Unlike
		</button>
	);
};

export default DownVote;
