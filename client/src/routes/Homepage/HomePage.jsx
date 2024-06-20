import React, { useContext } from 'react'
import "./HomePage.scss"
import SearchBar from '../../components/searchBar/SearchBar'
import { AuthContext } from '../../context/AuthContext'

const HomePage = () => {
    const {currentUser}=useContext(AuthContext)

    console.log(currentUser);
  return (
    <div className="homePage">
        <div className="textContainer">
            <div className="wrapper">
                <h1 className='title'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta ipsum dignissimos voluptatibus ea nulla blanditiis?</p>
                <SearchBar/>
                <div className="boxes">
                    <div className="box">
                        <h1>1+</h1>
                        <h2>YOE</h2>
                    </div>
                    <div className="box">
                        <h1>10+</h1>
                        <h2>Awards Gain</h2>
                    </div>
                    <div className="box">
                        <h1>100+</h1>
                        <h2>Ready to Move</h2>
                    </div>
                </div>
            </div>
        </div>
        <div className="imgContainer">
            <img src="/bg.png" alt="" />
        </div>
    </div>
  )
}

export default HomePage