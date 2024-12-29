import { type ReactNode } from "react";
import { NavLink } from "react-router-dom";

/**
 * @function AppNav
 * @constructor
 * @description Renders application navigation
 * @returns {ReactNode}
 */
export default function AppNav(): ReactNode {
  return (
    <nav className='sticky top-0 p-4 bg-blue-950 text-white flex justify-between'>
      <NavLink to='/'>
        <h1 className='font-medium uppercase hover:underline'>A 🥞 of Feature Flags</h1>
      </NavLink>
    </nav>
  );
}
