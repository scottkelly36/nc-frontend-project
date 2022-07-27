import axios from 'axios';
import { useState } from 'react';


const PostComment = () => {

    const [isSubmitted, handleisSubmitted]=useState(false);
    const [body, setBody]=useState('')

    const handleChange =(e)=>{
        setBody(e.target.value)
    }

    const SubmitComment =()=>{

    }
  return (
    !isSubmitted?
    <form>
        <textarea name="body" id="body" value={body} onChange={(e)=>{handleChange(e)}}placeholder='Type your comment here ... '></textarea>
        <button type="submit" className="btn btn-feature">Post Comment</button>
    </form> : 
    <div>
        <h2 className="message"></h2>
    </div>
  )
}

export default PostComment