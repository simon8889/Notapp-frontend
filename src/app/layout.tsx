"use client";
import { useEffect } from "react";
import Header from "@/components/Header/Header";
import "./layout.css";
import useAuth from "@/hook/useAuth";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { token, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth()
  }, [token])

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://cdn.icon-icons.com/icons2/3266/ICO/512/git_repository_icon_207308.ico" />
        <title>NotApp</title>
        <meta name="description" content="Take, organize and update your notes!" />
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>

  );
}

export default Layout;
