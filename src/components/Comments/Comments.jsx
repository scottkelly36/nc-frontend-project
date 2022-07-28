import { useEffect, useState, Fragment } from 'react';
import './Comments.css';
import axios from 'axios';
import PostComment from '../PostComment/PostComment.jsx';
import Loading from '../Loading/Loading';

const Comments = ({
	review_id,
	allComments,
	setAllComments,
}) => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		axios
			.get(
				`https://scotts-game-app.herokuapp.com/api/reviews/${review_id}/comments`
			)
			.then((res) => {
				setAllComments(res.data.comments);
				setIsLoading(false);
			});
	}, [review_id, setAllComments]);

	return isLoading ? (
		<Loading />
	) : (
		<Fragment>
			<section className='comments-container'>
				{allComments.map((comment) => {
					return (
						<article className='comment-card'>
							<div className='comment-card-section'>
								<p className='comment-author'>
									{comment.author}
								</p>
								<p className='date'>
									{comment.created_at.slice(0, 10)}
								</p>
							</div>
							<div className='comment-card-main'>
								<p className='comment-body'>
									{comment.body}
								</p>
								<p className='comment-votes'>
									{comment.votes}
								</p>
							</div>
						</article>
					);
				})}
			</section>
			<PostComment
				review_id={review_id}
				setAllComments={setAllComments}
				allComments={allComments}
				setIsLoading={setIsLoading}
			/>
		</Fragment>
	);
};

export default Comments;
