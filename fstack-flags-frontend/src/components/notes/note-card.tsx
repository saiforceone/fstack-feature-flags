import { type ReactNode } from "react";
import { type Note } from "../../@types/fstack-flags";
import { BiSolidNote } from "react-icons/bi";

type NoteCardProps = {
  actionElements?: ReactNode;
  note: Note;
};

export default function NoteCard({ actionElements, note }: NoteCardProps): ReactNode {
  return (
    <div className='p-2 rounded flex bg-blue-50 items-center gap-2 hover:opacity-85 duration-200'>
      <BiSolidNote
        className='text-blue-600'
        size={24}
      />
      <div className='flex flex-col'>
        <h1 className='text-xl font-medium text-blue-600 hover:underline cursor-pointer'>
          {note.title}
        </h1>
        <p className='text-blue-500 text-lg'>{note.content}</p>
      </div>
      {actionElements ? (
        <div className='flex items-center gap-2 flex-wrap'>{actionElements}</div>
      ) : null}
    </div>
  );
}
