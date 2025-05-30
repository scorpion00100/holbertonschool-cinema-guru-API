import './components.css';
import React from 'react';
import PropTypes from 'prop-types';

export default function Activity(props) {
    const { activity } = props;

    const username = activity.user.username;
    const title = activity.title.title
    const date = new Date(activity.updatedAt);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    let watchList;
    const type = activity.activityType

    if (type === 'favorite' || type === 'removeFavorited') watchList = 'favorites';
    else if (type === 'watchLater' || type === 'removeWatchLater') watchList = "watch later";

    return (
        <li className='activity'>
            <p><span className='red'>{username}</span>
            {type[0] === 'r' ? ' removed ' : ' added '}
            <span className='red'>{title}</span>
            {type[0] === 'r' ? ' from ' : ' to '}
            {watchList} - {formattedDate}</p>
        </li>
    );
}

Activity.propTypes = {
    activity: PropTypes.object.isRequired
}
