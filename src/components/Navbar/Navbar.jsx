import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import Logo from '../../images/favicon-32x32.png';
import { DefaultUserContext } from '../../Context/DefaultUserContext';

const Navbar = () => {
	const { user } = useContext(DefaultUserContext);

	return (
		<nav>
			<div className='logo'>
				<img src={Logo} alt='' />
			</div>
			<div className='links'>
				<NavLink
					to='/'
					className={(isActive) =>
						'nav-link' + (!isActive ? 'unselected' : '')
					}
				>
					Home
				</NavLink>
				<NavLink
					to='/reviews'
					className={(isActive) =>
						'nav-link' + (!isActive ? 'unselected' : '')
					}
				>
					Reviews
				</NavLink>
				<div className='user-info'>
					<p className='nav-link'>user : {user.username}</p>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
