
import {Link} from 'react-router-dom';
import './Error.css'

const Error = ({error}) => {
	

	return( 
		!error?
		<div className='error-container'>
			<p className="error-code">404</p>
			<p className="error-message">Sorry this page cant be Found!</p>
			<Link to="/">Home</Link>
		</div> : 
		<div className='error-container'>
		<p className="error-code">{error.response.status}</p>
		<p className="error-message">{error.response.data.msg}</p>
		<Link to="/">Home</Link>
		</div>)
	
};

export default Error;
