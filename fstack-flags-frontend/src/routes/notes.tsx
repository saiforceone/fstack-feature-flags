import { type ReactNode } from "react";
import { Outlet } from "react-router";
import AppNav from "../components/shared/app-nav.tsx";
import FStackFeContextProvider from "../context/fstack-fe-context.tsx";

export default function Notes(): ReactNode {
  return (
    <FStackFeContextProvider>
      <>
        <AppNav />
        <div className='flex flex-col flex-1 overflow-y-scroll gap-4'>
          <Outlet />
        </div>
      </>
    </FStackFeContextProvider>
  );
}
