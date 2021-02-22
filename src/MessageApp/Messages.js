import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from 'react';
import { fetchCurrentUserData } from "./actions";
import { searchUsers, sendMessage, fetchMessage } from "./actions";

let offRef;
function Messages(props) {

    const [userData, setUserData] = useState({});
    const [searchResult, setSearchResult] = useState([]);
    const [searchUser, setSearchUse] = useState('');
    const [toUser, setToUser] = useState('');
    const [messages, setMessages] = useState([]);
    const [typedMessage, setTypeMessage] = useState('');

    let fromUser = props.location.currentUser ? props.location.currentUser.replaceAll('.', ',') : '';
    useEffect(() => {
        if (props.location.currentUser) {
            fetchCurrentUserData(props.location.currentUser, setUserData);
        }
    }, []);

    useEffect(() => {
        setMessages([]);
        if(offRef) {
            offRef.off();
        }
        if (toUser.length > 0) {
            let database = fetchMessage();
            let key1, key2;
            if (fromUser > toUser) {
                key1 = toUser;
                key2 = fromUser
            } else {
                key1 = fromUser;
                key2 = toUser;
            }
            offRef = database.ref('Messages/' + key1 + '/' + key2);
            offRef.on('value', (snapShot) => {
                if (snapShot.val()) {
                    let val = snapShot.val();
                    let newUpdatedMessages = [];
                    Object.entries(val).forEach(newMessageObj => {
                        newUpdatedMessages.push({
                            message: newMessageObj[1].message,
                            sentByMe: newMessageObj[1].sentBy === fromUser
                        });
                    });
                    setMessages(newUpdatedMessages);
                }
            });
        }
    }, [toUser])
    return (
        <div>
            {
                props.location.currentUser ? <React.Fragment>
                    <h1>Current User is: {userData.firstName + ' ' + userData.lastName} {props.location.currentUser}</h1>
                    <input type='text' placeholder='username' value={searchUser} onChange={(e) => setSearchUse(e.target.value)} /> &nbsp;
                    <button onClick={() => searchUsers(searchUser, setSearchResult, props.location.currentUser)}>Search Users</button>
                    {
                        searchResult.length > 0 && <p>Click on the User to Start Chat</p>
                    }
                    <ul>
                        {
                            searchResult.map(user => (
                                <li><a style={{ cursor: "pointer" }} onClick={() => {
                                    setToUser(user.userName.replaceAll('.', ','));
                                }} >{user.name} ({user.userName})</a></li>
                            ))
                        }
                    </ul>
                    <hr></hr>
                    {
                        toUser.length > 0 && fromUser.length > 0 && <React.Fragment>
                            <h3>You are now chating with {toUser.replaceAll(',', '.')}</h3>
                            <ul style={{ listStyleType: "none" }}>
                                {
                                    messages.map(message => {
                                        return (
                                            <li>{message.sentByMe ? 'Me' : toUser.replaceAll(',', '.')} :&nbsp; {message.message}</li>
                                        )
                                    })
                                }
                            </ul>
                            <input type='text' placeholder='username' value={typedMessage} onChange={(e) => setTypeMessage(e.target.value)} /> &nbsp;
                            <button onClick={() => sendMessage(fromUser, toUser, typedMessage, setTypeMessage)}>Send Message</button>
                            <br /><br /><br /><br />
                        </React.Fragment>
                    }

                </React.Fragment> :
                    <Link to='/login'>Log In</Link>
            }

        </div>
    );
}

export default Messages;