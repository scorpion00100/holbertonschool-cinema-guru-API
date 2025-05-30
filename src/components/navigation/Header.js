import './navigation.css';
import React from 'react';
import PropTypes from 'prop-types';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Header(props) {
    const { userUsername, setIsLoggedIn } = props;

    function logout() {
        localStorage.removeItem('accessToken');
        setIsLoggedIn(false);
    }

    return (
        <nav className='header'>
            <p>Cinema Guru</p>
            <div>
               <img src="https://picsum.photos/100/100" alt='Profile' className='nav-item'/>
                <p className='nav-item'>Welcome {userUsername}!</p>
                <span className='logout nav-item' onClick={logout}>
                    <FontAwesomeIcon className='#logout-icon' icon={faSignOut}/>
                    Logout
                </span>
            </div>
            
        </nav>
    );
}

Header.propTypes = {
    userUsername: PropTypes.string,
    setIsLoggedIn: PropTypes.func
}

Header.defaultProps = {
    userUsername: '',
    setIsLoggedIn: () => {}
}
