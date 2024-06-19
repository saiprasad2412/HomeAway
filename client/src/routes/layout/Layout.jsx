import React from 'react'
import "./Layout.scss"
import Navbar from "../../components/Navbar/Navbar"
import { Outlet } from 'react-router-dom'
const Layout = () => {
  return (
    <div className="layout">
      <Navbar/>
      <div className="content">
        <Outlet/>
      </div>
    </div>
  )
}

export default Layout