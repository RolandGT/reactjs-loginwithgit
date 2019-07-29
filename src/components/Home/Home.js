import React, {useState, useEffect, useContext } from "react";
import "./Home.css";
import "../../bootstrap-grid.min.css";
import { AuthContext } from "../../App";
import firebase from 'firebase';
import User from "../../api/User/User";

const Home = props =>{
    const Auth = useContext(AuthContext);
    const[content,setContent] = useState();
    const[userProf,setProfile] = useState();
    const[lastSignIn,setLastSignIn] = useState();
    //const[userEmail,setUserEmail] = useState('');
    const[searchString, setSearchString] = useState('');
    const handleChange = e =>{
        e.preventDefault();
        setSearchString(e.target.value);
    }
    const handleSearch = (e)=>{
        e.preventDefault();
        setSearchString(searchString);
        //let userProf= <Profile input={searchString}/>
        let userProf= <User input={searchString}/>
        setProfile(userProf);
        console.log('handle search works');
    }
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
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(result) {
            
            Auth.name.setUserName();
            if (result.user) {
                Auth.avatarURL.setUserAvatarURL(result.user.photoURL);
            } else {
              //alert("No user!")
            }
          });
        if(Auth.login.isLoggedIn){
            setContent('Signed in as: ');
            if(Auth.lastSignInDate.userLastSignInDate){
                setLastSignIn('Last sign in: ');
            }
        }else{
            setContent('Please sign in.');
            setLastSignIn();
        }
    },[Auth.avatarURL, Auth.lastSignInDate.userLastSignInDate, Auth.login.isLoggedIn,Auth.name]);
    if(Auth.login.isLoggedIn){
        return (
            <div className='container'>
                <div className='row'>
                    <div className="col-md-6">
                        <div className="userInfo-wrapper">
                            <div className="userInfo">
                                <img className="avatar" src={Auth.avatarURL.userAvatarURL} alt='avatar'/>
                            </div>
                            <div className="userInfo">
                                <p><b>{content}</b></p><p> {Auth.email.userEmail} </p><br></br><hr></hr>
                                <p><b>{lastSignIn}</b></p><p> {Auth.lastSignInDate.userLastSignInDate}</p>
                            </div>
                        </div>
                        <div>
                            <button onClick={e => handleSignOut(e)}>Sign out</button>
                        </div>
                    </div>
                    <div className='col-md-6 '>
                        <div className='search-input-wrapper'>
                            <form  onSubmit={handleSearch}>
                                <p>Name:</p>
                                <input className='search-input' type="text" value={searchString} onChange={handleChange} />
                                <button className='search-button' type="submit" value="Submit"  >Search</button>
                            </form>
                        </div>
                        <div className='profile'>
                            {userProf}
                        </div>
                    </div>
            </div>
            </div>
        );
    }
    return (
        <div className="userInfo-wrapper">
            <h1>{content}</h1>
        </div>
    );
}
export default Home