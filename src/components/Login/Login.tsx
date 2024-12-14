'use client';
import { useState } from 'react';
import "./Login.css";
import { redirect } from 'next/navigation'
import useAuth from '@/hook/useAuth';
import { loginUser } from '@/api/user';

const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (username === '' || password === '') {
      setError('Please fill all the fields.');
      return;
    }
    const response = await loginUser(username, password);
    if (!response.ok) {
      setError("Incorrect password");
      return;
    }
    const data = await response.json() as AccessToken;
    login(data.access_token, data.username);
    redirect("/")
  }

  return (
    <div className="Login">
      <h1 className="Login__title">Log In</h1>
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
        <button type="submit" className="Login__button">Log In</button>
      </form>
    </div>
  );
};

export default Login;