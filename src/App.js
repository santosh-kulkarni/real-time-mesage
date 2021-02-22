import {Route, BrowserRouter as Router, Switch, Link} from 'react-router-dom';
import LogIn from "./MessageApp/LogIn";
import SignUp from "./MessageApp/SignUp";
import Messages from "./MessageApp/Messages";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <SignUp />
          </Route>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route path="/messages" render={(props) => <Messages {...props} />}>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
