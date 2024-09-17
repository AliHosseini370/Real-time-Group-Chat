import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users', {
        fullName,
        email,
        password,
      });
      console.log(response.data)
      localStorage.setItem('email', response.data.email)
      localStorage.setItem('token', response.data.token); // Store JWT
      navigate('/chat'); // Redirect to chat after Register
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          {error && <p>{error}</p>}
          <div>
            <label>FullName</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Choose a username"
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Choose a Email"
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Choose a password"
              required
            />
          </div>
          <button
            type="submit"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
