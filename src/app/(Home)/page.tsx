'use client'
import Board from "@/components/Board/Board";
import Landing from "@/components/LandingPage/LandingPage";
import useAuth from "@/hook/useAuth";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    isAuthenticated ? <Board /> : <Landing />
  )
}

export default Home;