import React, { useContext } from 'react'
import "./Profile.scss"
import List from '../../components/list/List'
import Chat from '../../components/Chat/Chat';
import apiRequest from"../../lib/apiRequest.js"
import { Link, useNavigate } from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext.jsx"
const Profile = () => {
  const {updateUser, currentUser}=useContext(AuthContext);
  const navigate =useNavigate();

  const handleLogout = async() => {
    try {
      await apiRequest.post("auth/logout");
      updateUser({userInfo: null});
       navigate("/")
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to={"/profile/update"}>
            <button>Update Profile</button>

            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={currentUser.avatar || "/noavatar.jpg"}
                alt=""
              />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/add">
              <button>Create New Post</button>
            </Link>
          </div>
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat/>
        </div>
      </div>
    </div>
  )
}

export default Profile