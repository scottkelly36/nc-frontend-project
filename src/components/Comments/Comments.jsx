
import {useEffect, useState} from 'react';
import './Comments.css';
import axios from 'axios';

const Comments = ({review_id}) => {
    const [allComments, setAllComments] = useState([]);


    useEffect(()=>{
        axios.get(`https://scotts-game-app.herokuapp.com/api/reviews/${review_id}/comments`)
        .then((res)=>{
            setAllComments(res.data.comments);
        })
    }, [review_id])
    
  return (
    <section className='comments-container'>
        {
            [...allComments].map((comment)=>{
                return(
                    <article className="comment-card">
                        <div className="comment-card-section">
                            <p className="comment-author">{comment.author}</p>
                            <p className="date">{comment.created_at.slice(0,10)}</p>
                        </div>
                        <div className="comment-card-main">
                            <p className="comment-body">{comment.body}</p>
                            <p className="comment-votes">{comment.votes}</p>
                        </div>
                    </article>
                )
            })
        }
    </section>
  )
}

export default Comments

