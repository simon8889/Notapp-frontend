'use client'
import Link from 'next/link';
import "./Header.css";
import useAuth from '@/hook/useAuth';
import { redirect } from 'next/navigation';
const Header = () => {
  const { isAuthenticated, logout, username } = useAuth();

  return (
    <header className="Header">
      <h1 className="Header__title">
        <Link href="/">NotApp</Link>
      </h1>
      <nav>
        {isAuthenticated ? (
          <div className="Header__buttons">
            <span>Hello, {username}!</span>
            <button
              onClick={() => {
                logout();
                redirect('/login');
              }}
              className="Header__button"
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className="Header__links">
            <Link
              href="/login"
              className="Header__link"
            >
              Log In
            </Link>
            <Link
              href="/signin"
              className="Header__link"
            >
              Sign In
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;      