import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', {
        email,
        password,
      });
      console.log(response.data)
      localStorage.setItem('email', response.data.email)
      localStorage.setItem('token', response.data.token); // Store JWT
      navigate('/chat'); // Redirect to chat after login
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          {error && <p>{error}</p>}
          <div>
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"          >
            Login
          </button>
        </form>
        <p>
          Don't have an account?{' '}
          <a href='/register'>Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
