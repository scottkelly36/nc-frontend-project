import { useState, Fragment } from 'react';
import axios from 'axios';

const Delete = ({
	comment_id,
	setAllComments,
	allComments,
}) => {
	const [checkSure, setCheckSure] = useState(false);

	const DeleteComment = () => {
		axios
			.delete(
				`https://scotts-game-app.herokuapp.com/api/comments/${comment_id}`
			)
			.then(() => {
				setAllComments(
					allComments.filter((comment) => {
						return comment.comment_id !== comment_id;
					})
				);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return !checkSure ? (
		<button
			className='btn btn-danger'
			onClick={() => {
				setCheckSure(true);
			}}
		>
			<i className='fa-solid fa-trash'></i> Delete
		</button>
	) : (
		<Fragment>
			<p className="check">Are you sure?</p>
		<div className='check-container'>
			<button
				className='btn btn-success'
				onClick={() => {
					DeleteComment();
				}}
			>
				<i class='fa-solid fa-check'></i> Yes
			</button>
			<button
				className='btn btn-danger'
				onClick={() => {
					setCheckSure(false);
				}}
			>
				<i class='fa-solid fa-x'></i> No
			</button>
		</div>
		</Fragment>
		
	);
};

export default Delete;
