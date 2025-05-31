import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-xl transition font-medium ${
      isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50 flex gap-2 justify-center">
      <NavLink to="/" className={linkClass}>
        Dashboard
      </NavLink>
      <NavLink to="/macros" className={linkClass}>
        Macros
      </NavLink>
      <NavLink to="/weight" className={linkClass}>
        Weight
      </NavLink>
      <NavLink to="/workout" className={linkClass}>
        Workout
      </NavLink>
      <NavLink to="/phase" className={linkClass}>
        Phase
      </NavLink>
    </nav>
  );
}
