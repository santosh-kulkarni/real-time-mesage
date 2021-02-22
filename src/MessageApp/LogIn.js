import { useState } from "react";
import React from 'react';
import {logInApp} from "./actions";
import StaticMsg from "./StaticMsg";
import { Redirect } from "react-router-dom";

function LogIn() {
    const [userName, setUserName] = useState('');
    const [password, setPassWord] = useState('');
    const [logIn, setLogIn] = useState(false);
    const [signUpStatus, setSignUpStatus] = useState(false);
    const [messages, setMessages] = useState([]);

    if (logIn) {
        return <Redirect 
            to={{
            pathname: "/messages",
            currentUser: userName 
            }}
        />
    } else if(signUpStatus) {
        return (
            <Redirect to="/" />
        )
    }
    return (
        <div>
            { messages.length > 0 &&
                <React.Fragment>
                    <StaticMsg messages={messages} />
                </React.Fragment>
            }
            <ul style={{ listStyleType: 'none' }}>
                <li style={{ marginBottom: '10px' }}>
                    <label >UserName: </label>
                    <input type='text' value={userName} onChange={(e) => setUserName(e.target.value)} />
                </li>
                <li style={{ marginBottom: '10px' }}>
                    <label >PassWord: </label>
                    <input type='password' value={password} onChange={(e) => setPassWord(e.target.value)} />
                </li>
                <li style={{ marginBottom: '10px' }}>
                    <button onClick={() => logInApp(userName, password, setLogIn, setMessages)}>Log In</button>
                </li>
                <li style={{ marginBottom: '10px' }}>
                    Dont have an account sign up here <button onClick={() => setSignUpStatus(true)}>Sign Up</button>
                </li>
            </ul>
        </div>
    );
}

export default LogIn;