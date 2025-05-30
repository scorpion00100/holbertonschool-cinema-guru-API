import './auth.css';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../../components/general/Input';
import Button from '../../components/general/Button';
import { faUser, faKey, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Register(props) {
    const {
        username,
        password,
        setUsername,
        setPassword,
        wrongCredentials
    } = props;

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className='register'>
            <h3>Create a new account</h3>

            <Input icon={faUser}
            label='Username:'
            type='text'
            className={wrongCredentials ? 'form-group error' : 'form-group'}
            value={username}
            setValue={setUsername}/>

            <Input icon={faKey}
            label='Password:'
            type={showPassword ? 'text' : 'password'}
            className={wrongCredentials ? 'form-group error' : 'form-group'}
            value={password}
            setValue={setPassword}
            isPassword={true}
            showPassword={showPassword}
            setShowPassword={() => setShowPassword(!showPassword)}/>

            <Button className='btn hover sign'
            text='Sign Up'
            type='submit'
            icon={faPlus}
            onClick={() => {}}/>
        </div>
    );
}

Register.propTypes = {
    username: PropTypes.string,
    password: PropTypes.string,
    setUsername: PropTypes.func,
    setPassword: PropTypes.func,
    wrongCredentials: PropTypes.bool
}

Register.defaultProps = {
    username: '',
    password: '',
    setUsername: () => {},
    setPassword: () => {},
    wrongCredentials: false
}
