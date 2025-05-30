import './dashboard.css';
import React from 'react';
import HomePage from './HomePage';
import PropTypes from 'prop-types';
import Favorites from './Favorites';
import WatchLater from './WatchLater';
import Header from '../../components/navigation/Header';
import SideBar from '../../components/navigation/SideBar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export default function Dashboard(props) {
    const { userUsername, setIsLoggedIn } = props;

    return (
        <BrowserRouter>
            <div className='dashboard'>
                <Header userUsername={userUsername} setIsLoggedIn={setIsLoggedIn}/>
                <SideBar />
                <div className='movies'>
                    <Routes>
                        <Route path='/' element={<HomePage />}/>
                        <Route path='/favorites' element={<Favorites />}/>
                        <Route path='/watchlater' element={<WatchLater />}/>
                        <Route path='/*' element={<Navigate to={"/"}/>} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

Dashboard.propTypes = {
    userUsername: PropTypes.string,
    setIsLoggedIn: PropTypes.func
}

Dashboard.defaultProps = {
    userUsername: "",
    setIsLoggedIn: () => {}
}
