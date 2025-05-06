import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Home/Nav";
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
      <main className="min-h-screen"></main>
      <Footer />
    </>
  );
}
