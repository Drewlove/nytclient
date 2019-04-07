import React from 'react'; 

const Result = (props)=> {
    return <li>
            <h2>{props.app}</h2>
            <p>Rating: {props.rating}</p>
            <p>Genres: {props.genres}</p>
    </li>
}

export default Result