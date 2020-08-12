import React from 'react';
import { Link  } from 'react-router-dom';

export default function Index(){
    return (
        <div>
            <h1> Welcome to Todox</h1>
            <Link to="/home">Go to home</Link>
        </div>
    )
}