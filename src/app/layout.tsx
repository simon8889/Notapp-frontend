"use client";
import { useEffect } from "react";
import Header from "@/components/Header/Header";
import "./layout.css";
import useAuth from "@/hook/useAuth";

const Layout = ({ children } : Readonly<{children: React.ReactNode}>) => {
  const { token, checkAuth } = useAuth();
  
  useEffect(() => {
    checkAuth()
  }, [token])

  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html> 

  );
}

export default Layout;
