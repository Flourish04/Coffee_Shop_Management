import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bg_login from "../assets/bg-login.jpeg";
import axios from "axios";

import { showFail, showSucess } from "../components/Alert/Alert";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

  const handleLogin = async () => {
    if (username == "" || password == "") {
      showFail();
      return;
    }
    try {
      const res = await axios.post("http://localhost:3300/api/login", {
        username,
        password,
      });

      const data = res.data.user;

      localStorage.setItem("id", data.department_id);
      localStorage.setItem("role", data.department_role);
      localStorage.setItem("name", data.department_name);

      const role = data.role;

      if (role === "admin") {
        navigate("/admin");
        showSucess();
      } else if (role === "system") {
        navigate("/depart");
        showSucess();
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error", error);
      showFail();
    }
  };

  return (
    <>
      <div
        className="flex flex-col justify-center items-center min-h-screen bg-gray-100  bg-cover bg-center"
        style={{
          backgroundImage: `url(${bg_login})`,
        }}
      >
        <div className="bg-purple-50 p-6 rounded-lg shadow-md w-80">
          <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="border border-gray-300 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border border-gray-300 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleLogin}
            className="border border-dotted border-gray-400 bg-slate-400 hover:bg-slate-500 text-white rounded-md p-2 w-full transition duration-300"
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}
