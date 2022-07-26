import { useEffect, useState } from 'react';
import axios from 'axios';

const Comments = () => {
	const [allComments, setAllComments] = useState([]);

	useEffect(() => {}, []);
	return <section className='comments-section'></section>;
};

export default Comments;
