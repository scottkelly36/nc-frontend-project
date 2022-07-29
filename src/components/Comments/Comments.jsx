import {
	useEffect,
	useState,
	Fragment,
	useContext,
} from 'react';

import './Comments.css';
import axios from 'axios';
import PostComment from '../PostComment/PostComment.jsx';
import Loading from '../Loading/Loading';
import Delete from '../Buttons/Delete';
import { DefaultUserContext } from '../../Context/DefaultUserContext';

const Comments = ({
	review_id,
	allComments,
	setAllComments,
}) => {
	const [isLoading, setIsLoading] = useState(true);
	const { user } = useContext(DefaultUserContext);

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
			<PostComment
				review_id={review_id}
				setAllComments={setAllComments}
				allComments={allComments}
				setIsLoading={setIsLoading}
			/>
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
									Votes {comment.votes}
								</p>
								{comment.author === user.username ? (
									<Delete
										comment_id={comment.comment_id}
										allComments={allComments}
										setAllComments={setAllComments}
									/>
								) : null}
							</div>
						</article>
					);
				})}
			</section>
			
		</Fragment>
	);
};

export default Comments;
