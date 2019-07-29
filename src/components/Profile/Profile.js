import React from "react";
import User from "../../api/User/User";

const Profile = props =>{
    return(
        <div>
            <div>User search name: {props.input} {props.users}</div>
            <br></br>
            <User input={props.input}/>
        </div>
    );
}
export default Profile