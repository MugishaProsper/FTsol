import React, { useState } from 'react';
import useLogin from '../hooks/useLogin';
import { Link } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className='border border-black p-2 px-4'>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className='border border-black' placeholder='email' />
        </div>
        <div className='border border-black p-2 px-4'>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className='border border-black' placeholder='password' />
        </div>
        <button type="submit" className='border border-black px-5 p-1' disabled={loading}>{ loading ? <span>loading ...</span> : "Login"}</button>
      </form>
    </div>
  );
};

export default Login;
