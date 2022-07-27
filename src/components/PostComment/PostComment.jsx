import axios from 'axios';
import { useState, useContext } from 'react';
import './PostComment.css';
import { DefaultUserContext } from '../../Context/DefaultUserContext';

const PostComment = ({ review_id }) => {
	const [error, setError] = useState();
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [body, setBody] = useState('');
	const { user } = useContext(DefaultUserContext);

	const SubmitComment = (event) => {
		event.preventDefault();
		if (body.length < 50) {
			setError(
				'Your comment needs top at least 50 characters'
			);
			removeMessage(setError);
		} else {
			setError('');
			axios
				.post(
					`https://scotts-game-app.herokuapp.com/api/reviews/${review_id}/comments`,
					{
						body: body,
						username: user.username,
					}
				)
				.then((res) => {
					//TODO: change to optimistically render the new comment
					console.log(res);
					setIsSubmitted(true);
					removeMessage(setIsSubmitted);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const removeMessage = (state) => {
		setTimeout(() => {
			if (state === setIsSubmitted) {
				setIsSubmitted(false);
			}
			if (state === setError) {
				setError('');
			}
		}, 2500);
	};

	return !isSubmitted ? (
		<div className='form-container'>
			{error ? (
				<div className='error-message'>
					<p className='error'>{error}</p>
				</div>
			) : (
				<></>
			)}

			<form className='post-form' onSubmit={SubmitComment}>
				<textarea
					className='textarea-post'
					name='body'
					id='body'
					value={body}
					onChange={(e) => {
						setBody(e.target.value);
					}}
					placeholder='Type your comment here ... '
				></textarea>
				<button type='submit' className='btn btn-feature'>
					Post Comment
				</button>
			</form>
		</div>
	) : (
		<div className='success-message'>
			<h2 className='message'>Your post was submitted!</h2>
		</div>
	);
};

export default PostComment;
