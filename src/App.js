import React, {useState} from 'react';
import { Route, Switch} from "react-router-dom";
import Home from './components/Home/Home';
import SignIn from './components/SignIn/SignIn';
import './App.css';

export const AuthContext = React.createContext(null);

const App = props => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState();
  const [userAvatarURL, setUserAvatarURL] = useState();
  const [userLastSignInDate, setUserLastSignInDate] = useState();
  const [userName, setUserName] = useState();

  return (
    <AuthContext.Provider value={{
      "login":{ isLoggedIn, setLoggedIn }, 
      "name":{ userName, setUserName },
      "email":{ userEmail, setUserEmail }, 
      "avatarURL":{ userAvatarURL, setUserAvatarURL },
      "lastSignInDate":{ userLastSignInDate, setUserLastSignInDate }
      }} >
      {/* Is logged in? {JSON.stringify(isLoggedIn)} */}
      <div className="App">
        <Switch>
          <Route exact path='/'  component={SignIn}></Route>
          <Route exact path='/home'  component={Home}></Route>
        </Switch>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
