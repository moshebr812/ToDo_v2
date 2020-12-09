// PROJECT:   Todo_v1
// FILE:      Welcome.js

import React from 'react'
import './Welcome.scss';

function isPali(e) {
    alert ('value is: ' + e.target.value);
}

export function Welcome (props) {
    
    const currentDate = (new Date()).toDateString();
    
    return <div className="welcome">

        <div className="welcomeWrapper">
            <h2>Welcome to your Todo Application</h2>
            <hr></hr>
            <h3>Manage your time efficiently</h3>
            <h3>Version: V1.0.2 <br></br></h3>
            <h3>Date: {currentDate} <br></br></h3>
            <br></br>
           <button>Login</button>
        </div>
    </div>
}