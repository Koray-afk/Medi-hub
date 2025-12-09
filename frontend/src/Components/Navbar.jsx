import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../Context/AppContext";

function Navbar() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  // const [token, setToken] = useState(true); 
  // now we will get the token from api 
  const{token,setToken}=useContext(AppContext)

  const logout = ()=>{ 
    setToken(false)
    localStorage.removeItem('token')
  }

  const navLinkClasses = ({ isActive }) =>
    `relative px-2 py-1 transition duration-300 
         ${
           isActive
             ? "text-blue-600 font-semibold"
             : "text-gray-700 hover:text-blue-500"
         }`;
    console.log(token)

  return (
    <div className="flex justify-between items-center text-sm px-5 py-4 mb-5 border-b border-gray-300 shadow-sm">
      <h1
        onClick={() => navigate("/")}
        className="text-xl font-bold text-blue-600 tracking-wide"
      >
        Medi Hub
      </h1>

      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/" className={navLinkClasses}>
          <li>Home</li>
          <hr />
        </NavLink>
        <NavLink to="/doctors" className={navLinkClasses}>
          <li>Doctors</li>
          <hr />
        </NavLink>
        <NavLink to="/about" className={navLinkClasses}>
          <li>About</li>
          <hr />
        </NavLink>
        <NavLink to="/contact" className={navLinkClasses}>
          <li>Contact</li>
          <hr />
        </NavLink>
      </ul>
      <div className="flex items-center gap-2">
        {token ? (
          <div className="flex items-center justify-center gap-2 cursor-pointer group relative ">
            <img className="w-8 rounded-full" src={assets.profile_pic} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block ">
              <div className="bg-stone-100 min-w-48 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("/MyProfile")}
                  className="hover:text-black"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/MyAppointment")}
                  className="hover:text-black"
                >
                  My Appointment
                </p>
                <p onClick={logout} className="hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition"
          >
            Create account
          </button>
        )}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt=""
        />

        <div
          className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-all duration-300 z-50
    ${showMenu ? "w-64" : "w-0 overflow-hidden"}`}
        >
          <div className="flex items-center justify-between px-5 py-6 border-b border-gray-200">
            <h1
              onClick={() => {
                navigate("/");
                setShowMenu(false);
              }}
              className="text-xl font-bold text-blue-600 tracking-wide"
            >
              Medi Hub
            </h1>
            <img
              className="w-7 cursor-pointer"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt="close"
            />
          </div>

          <ul className="flex flex-col gap-6 px-6 py-6 font-medium text-gray-700">
            <NavLink
              to="/"
              className="hover:text-blue-500"
              onClick={() => setShowMenu(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/doctors"
              className="hover:text-blue-500"
              onClick={() => setShowMenu(false)}
            >
              Doctors
            </NavLink>
            <NavLink
              to="/about"
              className="hover:text-blue-500"
              onClick={() => setShowMenu(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className="hover:text-blue-500"
              onClick={() => setShowMenu(false)}
            >
              Contact
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
