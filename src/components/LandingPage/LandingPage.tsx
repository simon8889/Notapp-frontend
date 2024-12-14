import React from 'react';
import './LandingPage.css';
import { redirect } from 'next/navigation';

const LandingPage: React.FC = () => {
  return (
    <div className="LandingPage">
      <section className="LandingPage__header">
        <h1 className="LandingPage__title">Capture Ideas, Stay Organized</h1>
        <p className="LandingPage__subtitle">
          Welcome to <strong>NotApp</strong>, your ultimate tool to create, organize, and manage notes effortlessly. For creators, students, and professionals.
        </p>
        <div className="LandingPage__actions">
          <button className="LandingPage__ctaPrimary" onClick={() => redirect("/signin")}>Get Started for Free</button>
          <button className="LandingPage__ctaSecondary" onClick={() => redirect("/login")}>Explore Your Notes</button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
