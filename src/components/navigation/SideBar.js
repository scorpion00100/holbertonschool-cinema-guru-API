import './navigation.css';
import axios from 'axios';
import Activity from '../Activity';
import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faStar, faClock, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function SideBar() {
    const [selected, setSelected] = useState("home");
    const [small, setSmall] = useState(true);
    const [activities, setActivities] = useState([]);
    const [showActivitiesboolean, setShowActivitiesboolean] = useState(false);

    const navigate = useNavigate()

    function setPage(pageName) {
        setSelected(pageName);
        navigate(`/${pageName}`);
    }

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const headers = {authorization: `Bearer ${accessToken}`}

        axios.get("http://localhost:8000/api/activity", { headers })
        .then((res) => setActivities(res.data));
    }, [showActivitiesboolean]);

    return (
        <nav className={small ? 'sidebar small' : 'sidebar'}
        onMouseEnter={() => {setSmall(!small); setShowActivitiesboolean(!showActivitiesboolean)}}
        onMouseLeave={() => {setSmall(!small); setShowActivitiesboolean(!showActivitiesboolean)}}>
            <ul className='sidebar-navigation'>
                <li className={selected === 'home' ? 'navigation-item active' : 'navigation-item'}
                onClick={() => {setPage('home')}}>
                    <div>
                       <FontAwesomeIcon icon={faFolder}/>
                        <p>{!small && 'Home'}</p> 
                    </div>
                    {selected === 'home'&& !small && <FontAwesomeIcon icon={faArrowRight}/>}
                </li>
                <li className={selected === 'favorites' ? 'navigation-item active' : 'navigation-item'}
                onClick={() => {setPage('favorites')}}>
                    <div>
                        <FontAwesomeIcon icon={faStar}/>
                        <p>{!small && 'Favorites'}</p>
                    </div>
                    {selected === 'favorites' && !small && <FontAwesomeIcon icon={faArrowRight}/>}
                </li>
                <li className={selected === 'watchlater' ? 'navigation-item active' : 'navigation-item'}
                onClick={() => {setPage('watchlater')}}>
                    <div>
                        <FontAwesomeIcon icon={faClock}/>
                        <p>{!small && 'Watch Later'}</p>
                    </div>
                    {selected === 'watchlater' && !small && <FontAwesomeIcon icon={faArrowRight}/>}
                </li>
            </ul>
            {showActivitiesboolean &&
            <div className='activities'>
                <h3>Latest Activities</h3>
                <ul className='latest'>
                    {activities.length !== 0 && activities.slice(0, 10).map((activity) => <Activity key={activity.id} activity={activity}/>)}
                    {activities.length === 0 && <p>Nothing to see here...</p>}
                </ul>
            </div>
            }
        </nav>
    );
}
