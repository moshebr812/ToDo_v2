// PROJECT:   Todo_v1
// FILE:      Welcome.js

import React, { useContext } from 'react';
import { AppContextTodo } from '../AppContext';
import { LoginButton } from '../general/login/LoginButton';

import './Welcome.scss';

export function Welcome (props) {
    
    const currentDate = (new Date()).toDateString();
    
    const contextTodo = useContext (AppContextTodo);
    
    return <div className="welcome">

        <div className="welcomeWrapper">
            <h2>Welcome to your Todo Application</h2>
            <hr></hr>
            <h3>Manage your time efficiently</h3>
            <h3>Version: {contextTodo.versionInfo.versionNumber} <br></br></h3>
            <h3>Date: {currentDate} <br></br></h3>
            <br></br>
            <div className="containerForLogin">
            <LoginButton></LoginButton>
           </div>

           Valid User? {contextTodo.userInfo.validUser?"true":"false"}
           <br></br>
           Valid User? {contextTodo.userInfo.loginName?contextTodo.userInfo.loginName:'None'}
        </div>
    </div>
}