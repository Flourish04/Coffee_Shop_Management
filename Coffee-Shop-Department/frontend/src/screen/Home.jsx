import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Home/Nav";
import home_bg from "../assets/home-bg.jpg";
import Footer from "./Footer";

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role) {
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "system") {
        navigate("/depart");
      }
    }
  }, []);
  return (
    <>
      <Nav />
      <main
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${home_bg})` }}
      ></main>
      <Footer />
    </>
  );
}
