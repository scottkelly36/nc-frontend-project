import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import Logo from '../../images/logo.png';
import { DefaultUserContext } from '../../Context/DefaultUserContext';

const Navbar = () => {
	const { user } = useContext(DefaultUserContext);

	return (
		<nav>
			<div className='logo'>
				<img src={Logo} alt='' className='logo-img' />
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
					<p className='nav-link'>
						<i className='fa-solid fa-user'></i> {user.username}
					</p>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
