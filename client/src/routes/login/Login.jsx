import React, { useState } from 'react'
import "./Login.scss"
import { Link, useNavigate } from 'react-router-dom'
import apiRequest from '../../lib/apiRequest'
const Login = () => {
  const [err , setErr]=useState("");
    const [isLoading , setIsLoading]=useState(false);
    const navigate =useNavigate()
  const handleSubmit=async(e)=>{
    e.preventDefault();
    setIsLoading(true);
    setErr("");
    const formData= new FormData(e.target);
    const email= formData.get("email");
    const password= formData.get("password");

    try {
      const res= await apiRequest.post("auth/login",{
        email,password
      })
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/")
    } catch (error) {
      setErr(error.response.data.message);
    }finally{setIsLoading(false)}
  }
  return (
    <div className="login">
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <h1>Welcome back</h1>
        <input name="email"  type="email" placeholder="email" />
        <input name="password" type="password" placeholder="Password" />
        <button disabled={isLoading}>Login</button>
        {err && <span>{err}</span>}
        <Link to="/register">{"Don't"} you have an account?</Link>
      </form>
    </div>
    <div className="imgContainer">
      <img src="/bg.png" alt="" />
    </div>
  </div>
  )
}

export default Login