import { type ReactNode } from "react";
import NotificationBlock from "../../components/shared/notification-block.tsx";
import PageWrapper from "../../components/shared/page-wrapper.tsx";
import { BiSolidNote } from "react-icons/bi";

export default function NotesIndex(): ReactNode {
  return (
    <PageWrapper
      pageTitle='Note Listing'
      rightContent={
        <span className='bg-slate-400 text-white p-2 rounded cursor-not-allowed flex items-center gap-2'>
          <BiSolidNote />
          Add Note
        </span>
      }
      subtitle='All your notes in one place'
    >
      <NotificationBlock>
        <p className='text-lg font-medium'>Welcome to the notes tutorial</p>
        <p>
          Here is where we will eventually display the notes from our API with the option to view /
          edit them. The primary purpose of this tutorial is to give you an example of how you may
          implement feature flags in a fullstack application for both the frontend and backend.
        </p>
        <p>We will be removing this component eventually.</p>
      </NotificationBlock>
    </PageWrapper>
  );
}
