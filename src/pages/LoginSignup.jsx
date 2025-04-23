import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
 
const LoginSignup = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
 
  const toggleForm = () => {
    setIsSignup((prev) => !prev);
    setMessage('');
    setUsername('');
    setEmail('');
    setPassword('');
  };
 
  const handleSubmit = () => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
 
    if (isSignup) {
      // Check if email already exists
      const existingUser = storedUsers.find((user) => user.email === email);
      if (existingUser) {
        setMessage('❌ Account already exists with this email');
        return;
      }
 
      const newUser = { username, email, password };
      storedUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(storedUsers));
      setMessage('✅ Successfully registered!');
    } else {
      // Login flow
      const matchedUser = storedUsers.find(
        (user) => user.email === email && user.password === password
      );
 
      if (matchedUser) {
        setMessage('✅ Login successful! Redirecting...');
        setTimeout(() => {
          navigate('/config');
        }, 1500);
      } else {
        setMessage('❌ Invalid email or password');
      }
    }
  };
 
  return (
    <div className="login-wrapper">
      <div  
        className="global-exit-button"
        onClick={() => navigate('/')}
        title="Back to Home"
      >
        🗙
      </div>
      <div className="modal is-open">
        <div className="modal-container">
          <div className="modal-left">
            <h1 className="modal-title">Welcome to VeriCODE</h1>
            <p className="modal-desc">
              {isSignup
                ? 'Create your account to get started.'
                : 'Login to continue your AI-powered code reviews.'}
            </p>
 
            {isSignup && (
              <div className="input-block">
                <label htmlFor="username" className="input-label">Username</label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
              </div>
            )}
 
            <div className="input-block">
              <label htmlFor="email" className="input-label">Email</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            </div>
 
            <div className="input-block">
              <label htmlFor="password" className="input-label">Password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            </div>
 
            <div className="modal-buttons">
              {!isSignup && <a href="#">Forgot your password?</a>}
              <button className="input-button" onClick={handleSubmit}>
                {isSignup ? 'Sign Up' : 'Login'}
              </button>
            </div>
 
            {message && (
              <p className="sign-up" style={{ color: message.startsWith('✅') ? 'green' : 'red' }}>
                {message}
              </p>
            )}
 
            <p className="sign-up">
              {isSignup ? (
                <>
                  Already have an account?{' '}
                  <span className="toggle-link" onClick={toggleForm}>Login now</span>
                </>
              ) : (
                <>
                  Don’t have an account?{' '}
                  <span className="toggle-link" onClick={toggleForm}>Signup now</span>
                </>
              )}
            </p>
          </div>
 
          <img src="/images/sign.jpg" alt="MyImage" className="modal-right" />
        </div>
      </div>
    </div>
  );
};
 
export default LoginSignup;