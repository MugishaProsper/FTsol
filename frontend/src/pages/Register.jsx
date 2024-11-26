import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [secondName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateInputs = () => {
    if (!firstName.trim() || !lastName.trim()) {
      console.log("First name or lastName is required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      console.log("Please enter a valid email address.");
      return false;
    }
    if (password.length < 6) {
      console.log("Password must be at least 6 characters long.");
      return false;
    }
    if (password !== confirmPassword) {
      console.log("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    try {
      const response = await axios.post('/api/auth/register', { name, email, password });
      console.log(response.data); // Handle success (e.g., redirect to login page)
    } catch (err) {
      console.log(err.message); // Handle errors (e.g., display a message)
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className='border border-black p-2 px-4'>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className='border border-black' placeholder='Full Name' />
        </div>
        <div className='border border-black p-2 px-4'>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required className='border border-black' placeholder='Last Name' />
        </div>
        <div className='border border-black p-2 px-4'>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className='border border-black' placeholder='Email' />
        </div>
        <div className='border border-black p-2 px-4'>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className='border border-black' placeholder='Password' />
        </div>
        <div className='border border-black p-2 px-4'>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className='border border-black' placeholder='Confirm Password' />
        </div>
        <button type="submit" className='border border-black px-5 p-1'>Register</button>
      </form>
    </div>
  );
};

export default Register;
