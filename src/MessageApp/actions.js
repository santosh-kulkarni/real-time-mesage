import firebase from "firebase";
import config from "../config/config";

firebase.initializeApp(config);

export const signUpApp = (f, l, u, p, setState, setMessages) => {
    let database = firebase.database();
    let auth = firebase.auth();
    auth.createUserWithEmailAndPassword(u, p)
        .then(() => {
            setMessages(['Sign up Sccess']);
            database.ref('users/' + u.replaceAll('.', ',')).set({
                firstName: f,
                lastName: l,
            }, (error) => {
                if (!error) {
                    setState(true);
                }
            });
        })
        .catch((error) => {
            setState(false);
            setMessages([error.message]);
        });
}

export const logInApp = (u, p, setLogInStatus, setMessages) => {
    let auth = firebase.auth();
    auth.signInWithEmailAndPassword(u, p)
        .then(() => {
            setLogInStatus(true);
        })
        .catch(error => {
            setMessages([error.message]);
            setLogInStatus(false);
        });
};

export const fetchCurrentUserData = (user, setUserData) => {
    let database = firebase.database();
    database.ref('users/' + user.replaceAll('.', ',')).once('value')
        .then((snapShot) => {
            let val = snapShot.val();
            setUserData({
                firstName: val.firstName,
                lastName: val.lastName
            })
        })
        .catch(error => {
            console.log(error.message);
        })
};
export const searchUsers = (username, setSearchResult, currentUser) => {
    let database = firebase.database();
    setSearchResult([]);
    database.ref('users').once('value', (snapShot) => {
        if(snapShot.val()) {
            let searchUserArray = Object.entries(snapShot.val());
            let searchRes = [];
            searchUserArray.forEach(ele => {
                let user = ele[0].replaceAll(',', '.');
                if(user !== currentUser && user.includes(username)) {
                    searchRes.push({
                        name: ele[1].firstName + ' ' +  ele[1].lastName,
                        userName: user
                    });
                }
            });
            setSearchResult(searchRes);
        }
    })
}

export const sendMessage = (from, to, message, setTypeMessage) => {
    let database = firebase.database();
    let key1, key2;
    if(from > to) {
        key1 = to;
        key2 = from
    } else {
        key1 = from;
        key2 = to;
    }
    let messageRef = database.ref('Messages/' + key1 + '/' + key2).push();
    messageRef.set({
        message: message,
        sentBy: from,
        recieiveBy: to
    }, (error) => {
        if(!error) {
            setTypeMessage('');
        }
    });
};

export const fetchMessage = () => {
    let database = firebase.database();
    return database;
}