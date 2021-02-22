import { useState } from "react";
import React from 'react';
import StaticMsg from "./StaticMsg";
import { signUpApp } from "./actions";
import { Redirect } from "react-router-dom";

function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassWord] = useState('');
    const [messages, setMessages] = useState([]);
    const [signUpSuceess, setSignUpSuccess] = useState(false);
    const [logIn, setLogIn] = useState(false);

    if (signUpSuceess) {
        setFirstName('');
        setLastName('');
        setUserName('');
        setPassWord('');
        setSignUpSuccess(false);
    }
    if (logIn) {
        return <Redirect to='/login' />
    }
    return (
        <div>
            { logIn && <ul style={{ listStyleType: "none" }}>
                <li><button onClick={() => setLogIn(true)}>Log In</button></li>
            </ul>
            }
            { messages.length > 0 &&
                <React.Fragment>
                    <StaticMsg messages={messages} />
                </React.Fragment>
            }
            <ul style={{ listStyleType: "none" }}>
                <li style={{ marginBottom: '10px' }}>
                    <label >First Name: </label>
                    <input type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </li>
                <li style={{ marginBottom: '10px' }}>
                    <label >Last Name: </label>
                    <input type='text' value={LastName} onChange={(e) => setLastName(e.target.value)} />
                </li>
                <li style={{ marginBottom: '10px' }}>
                    <label >UserName: </label>
                    <input type='text' value={userName} onChange={(e) => setUserName(e.target.value)} />
                </li>
                <li style={{ marginBottom: '10px' }}>
                    <label >PassWord: </label>
                    <input type='password' value={password} onChange={(e) => setPassWord(e.target.value)} />
                </li>
                <li style={{ marginBottom: '10px' }}>
                    <button onClick={() => signUpApp(firstName, LastName, userName, password, setSignUpSuccess, setMessages)}>Sign Up</button>
                </li>
                <li style={{ marginBottom: '10px' }}>
                    Already have an account Log In here <button onClick={() => setLogIn(true)}>Log In</button>
                </li>
            </ul>
        </div>
    );
}

export default SignUp;