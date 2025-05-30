import './auth.css';
import axios from 'axios';
import Login from './Login';
import Register from './Register';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Button from '../../components/general/Button';

export default function Authentication(props) {
    const { setIsLoggedIn, setUserUsername } = props;
    const [_switch, set_switch] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [wrongCredentials, setWrongCredentials] = useState(false);

    const signInUpProps = {
        username,
        password,
        setUsername: setUsername,
        setPassword,
        wrongCredentials,
    };

    function handleSubmit(onSubmit) {
        onSubmit.preventDefault();
        const type = _switch ? 'login' : 'register';

        axios.post(`http://localhost:8000/api/auth/${type}`, {username, password})
        .then((res) => {
            localStorage.setItem('accessToken', res.data.accessToken);
            setUserUsername(username);
            setIsLoggedIn(true);
            setWrongCredentials(false);
        })
        .catch(() => {
            setUserUsername("");
            setIsLoggedIn(false);
            setWrongCredentials(true);
        });
    }

    return (
        <div className='authentication'>
            <form className='authentication-form' onSubmit={handleSubmit}>
                <Button text='Sign In'
                type='button'
                className={_switch ? 'btn btn-header active' : 'btn btn-header'}
                onClick={() => set_switch(true)}/>

                <Button text='Sign Up'
                type='button'
                className={_switch ? 'btn btn-header' : 'btn btn-header active'}
                onClick={() => set_switch(false)}/>
                {_switch ? <Login {...signInUpProps}/> : <Register {...signInUpProps}/>}
            </form>
        </div>
        
    );
}

Authentication.propTypes = {
    setIsLoggedIn: PropTypes.func.isRequired,
    setUserUsername: PropTypes.func.isRequired
}
