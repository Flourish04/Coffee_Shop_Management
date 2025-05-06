import React from "react";
import Logout from "../../screen/Logout";
import { Link, NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <>
      <nav className=" border-gray-200 bg-gray-900">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
          <a
            href="/"
            className="flex  items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-mono text-red-500 font-semibold whitespace-nowrap dark:text-white">
              ADMIN
            </span>
          </a>
          <div className="flex items-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
            <Logout />
          </div>
          <div
            className="items-center justify-between  w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            <ul className="flex flex-col  font-extrabold p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  to="product"
                  className={({ isActive }) =>
                    isActive ? "text-red-800 underline" : "text-blue-500"
                  }
                >
                  PRODUCT
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="gift"
                  className={({ isActive }) =>
                    isActive ? "text-red-800 underline" : "text-blue-500"
                  }
                >
                  GIFT
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="employee"
                  className={({ isActive }) =>
                    isActive ? "text-red-800 underline" : "text-blue-500"
                  }
                >
                  EMPLOYEE
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="cus"
                  className={({ isActive }) =>
                    isActive ? "text-red-800 underline" : "text-blue-500"
                  }
                >
                  CUSTOMER
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
