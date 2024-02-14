import React, { useState } from "react";
import './signpage.css'
import userlogo from '../assets/userlogo.jpg';
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";



function SignupPage({ onSignupSuccess }) {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); 


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userEmail.trim()) {
      setError('User email is required');
      return;
    }
    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    const apiUrl = 'https://rentalreviews365.com/api/admin/admin-login';
    const oauthKey = 'N7Yp3a0VpEFr3wgdagtwa4SpELy445Ys';

    const requestBody = {
      user_email: userEmail,
      password: password,
      oauth_key: oauthKey,
    };

    try {
      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.is_successful === '1') {
        const { full_name } = response.data.data;
        localStorage.setItem('full_name', full_name);
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/meals'); 
        

        onSignupSuccess(full_name); 
      } else {
        setError(response.data.errors || 'Unknown error');
      }
    } catch (error) {
      setError('An error occurred while processing your request');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <div className="form">
        <form onSubmit={handleSubmit}>
          <img src={userlogo} alt="user" width={50} height={50} />
     
          <div className="title">Welcome Back</div>
          <label className="label">Welcome back! Please enter your details</label>
         
          <div className="inputstyle">
          {error && <p className="errorText">{error}</p>}
            <input
              className="input"
              type="text"
              name="UserEmail"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="User Email"
            />
          
            <br />
            <input
              id="pass"
              type={showPassword ? "text" : "password"}
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <br />
          </div>

          <div className="checkbox">
            <input
              id="check"
              type="checkbox"
              checked={showPassword}
              onChange={togglePasswordVisibility}
            />
            <label>Remember Me</label>
         
          </div>
          <div>
            <a href="/" className="a">Forgot Password?</a>
          </div>

          <div>
            <button className="loginButton" type="submit">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
