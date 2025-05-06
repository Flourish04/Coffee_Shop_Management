import React from "react";
import { useNavigate } from "react-router-dom";
import { showLogOutSucess } from "../components/Alert/Alert";

export default function Logout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    showLogOutSucess();

    navigate("/");
  };
  return (
    <button
      onClick={handleLogout}
      className='className="text-white bg-red-500 hover:bg-red-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5  focus:outline-none dark:focus:ring-blue-800"'
    >
      Logout
    </button>
  );
}
