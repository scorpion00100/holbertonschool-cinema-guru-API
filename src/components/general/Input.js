import './general.css';
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function Input(props) {
    const {
        label,
        type,
        className,
        value,
        setValue,
        icon,
        inputAttributes,
        isPassword,
        showPassword,
        setShowPassword
    } = props;

    function handleInput(e) {
        setValue(e.target.value);
    }

    return (
        <div className={className}>
            {icon && <FontAwesomeIcon icon={icon}/>}
            <label>{label}</label>
            {isPassword && <FontAwesomeIcon id='showPasswordIcon' icon={showPassword ? faEyeSlash : faEye} onClick={setShowPassword}/>}
            <input
            type={type}
            value={value}
            onChange={handleInput}
            {...inputAttributes}/>
        </div>
    );
}

Input.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    setValue: PropTypes.func.isRequired,
    icon: PropTypes.object,
    inputAttributes: PropTypes.object,
    isPassword: PropTypes.bool,
    showPassword: PropTypes.bool,
    setShowPassword: PropTypes.func
}

Input.defaultProps = {
    icon: null,
    inputAttributes: null,
    isPassword: false,
    showPassword: false,
    setShowPassword: () => {}
}
