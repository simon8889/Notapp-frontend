'use client';
import { useState } from 'react';
import "./SignIn.css";
import { redirect } from 'next/navigation'
import { signIn } from '@/api/user';

const SignIn = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (username === '' || password === '') {
      setError('Please fill all the fields.');
      return;
    }
    const result = await signIn(username, password)
    if (!result.ok) {
  		setError("Username not avaliable")
  		return;
    }
    redirect("/login")
  }
  
  return (
    <div className="Login">
      <h1 className="Login__title">Sign In</h1>
      <form className="Login__form" onSubmit={handleLogin}>
        {error && <div className="Login__error">{error}</div>}
        <div className="Login__field">
          <label htmlFor="username">User:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="Login__input"
          />
        </div>
        <div className="Login__field">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="Login__input"
          />
        </div>
        <button type="submit" className="Login__button">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;