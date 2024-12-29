import { type ReactNode } from "react";

export default function AppNav(): ReactNode {
  return (
    <nav className='sticky top-0 p-4 bg-blue-950 text-white flex justify-between'>
      <h1 className='font-medium uppercase'>A 🥞 of Feature Flags</h1>
    </nav>
  );
}
