import React, { useState, useContext } from "react";
import { AuthContext } from "../../App";
import "./SignIn.css";
import "../../bootstrap-grid.min.css";
import firebase from 'firebase';
import Home from '../Home/Home';
import { BrowserRouter, Route } from "react-router-dom";

const SignIn = props => {
  const [error, setError] = useState("");
  var provider = new firebase.auth.GithubAuthProvider();
  const Auth = useContext(AuthContext);
  
  const handleSignIn = e => {
    e.preventDefault();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      if(result.user){
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        //const token = result.credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        const {email, photoURL, metadata} = user ; //destructuring
        //console.log(firebase.auth().currentUser());
        Auth.login.setLoggedIn(true);
        Auth.email.setUserEmail(email);
        Auth.avatarURL.setUserAvatarURL(photoURL);
        Auth.lastSignInDate.setUserLastSignInDate(metadata.lastSignInTime);
        props.history.push('/home');
        // console.log(token);
        // console.log(user.email);
        // console.log(user.metadata.lastSignInTime);
        // console.log(user.photoURL);
        // console.log(user);
        // ...
      }
        
      }).catch(function(error) {
        setError(error);
        console.log(error)
        // Handle Errors here.
        //var errorCode = error.code;
        //var errorMessage = error.message;
        // The email of the user's account used.
        //var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        //var credential = error.credential;
        // ...
      });
  };
  
  const handleSignOut = e =>{
    e.preventDefault();
    firebase.auth().signOut().then(function() {
      
      // Sign-out successful.
      Auth.login.setLoggedIn(false);
      Auth.email.setUserEmail();
      Auth.avatarURL.setUserAvatarURL();
      Auth.lastSignInDate.setUserLastSignInDate();
    }).catch(function(error) {
      // An error happened.
      //var errorCode = error.code;
     // var errorMessage = error.message;
    });
  };

  if(Auth.login.isLoggedIn){
    return(
      <div className='signin'>
        <button onClick={e => handleSignOut(e)}>Sign out</button>
        <BrowserRouter>
          <Route >
            <Home isLoggedIn={Auth.login.isLoggedIn} userEmail={Auth.email.userEmail} userAvatarURL={Auth.avatarURL.userAvatarURL} userLastSignInDate={Auth.lastSignInDate.userLastSignInDate}/>
          </Route>
        </BrowserRouter>
      </div>
    );
  }
  return (
    <div className='signin'>
      <p>
        <button onClick={e => handleSignIn(e)}>Signin with <b>GitHub</b>
          <svg className="button github-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 438.55 427.82">
            <path d="M409.13,114.57a218.32,218.32,0,0,0-79.8-79.8Q278.94,5.36,219.27,5.36T109.21,34.77a218.29,218.29,0,0,0-79.8,79.8Q0,165,0,224.63,0,296.3,41.83,353.54t108.06,79.23q7.71,1.43,11.42-2A11.17,11.17,0,0,0,165,422.2q0-.86-.14-15.42t-.14-25.41l-6.57,1.14a83.77,83.77,0,0,1-15.85,1,120.73,120.73,0,0,1-19.84-2A44.34,44.34,0,0,1,103.35,373,36.23,36.23,0,0,1,90.79,355.4l-2.86-6.57a71.34,71.34,0,0,0-9-14.56q-6.14-8-12.42-10.85l-2-1.43a21,21,0,0,1-3.71-3.43,15.66,15.66,0,0,1-2.57-4q-.86-2,1.43-3.29C61.2,310.42,64,310,68,310l5.71.85q5.71,1.14,14.13,6.85a46.08,46.08,0,0,1,13.85,14.84q6.57,11.71,15.85,17.85t18.7,6.14a81.19,81.19,0,0,0,16.27-1.42,56.78,56.78,0,0,0,12.85-4.29q2.57-19.14,14-29.41A195.49,195.49,0,0,1,150,316.28a116.52,116.52,0,0,1-26.83-11.14,76.86,76.86,0,0,1-23-19.13q-9.14-11.42-15-30T79.37,213.2q0-34.55,22.56-58.82-10.57-26,2-58.24,8.28-2.57,24.55,3.85t23.84,11q7.57,4.56,12.13,7.71a206.2,206.2,0,0,1,109.64,0l10.85-6.85A153.65,153.65,0,0,1,311.2,99.29q15.13-5.71,23.13-3.14,12.84,32.26,2.28,58.24,22.55,24.27,22.56,58.82,0,24.27-5.85,43t-15.12,30a79.82,79.82,0,0,1-23.13,19,116.74,116.74,0,0,1-26.84,11.14A195.29,195.29,0,0,1,259,321.42Q273.8,334.26,273.81,362V422.2a11.37,11.37,0,0,0,3.57,8.56q3.57,3.42,11.28,2,66.24-22,108.07-79.23t41.83-128.91Q438.53,165,409.13,114.57Z"/>
          </svg>
        </button>
      </p>
      <span>{error}</span>
    </div>
  );
};

export default SignIn;
