import { type ReactNode, useCallback, useEffect, useState } from "react";
import { BiSolidArrowToLeft, BiSolidEdit, BiSolidNote, BiSolidTrash } from "react-icons/bi";
import NotificationBlock from "../../components/shared/notification-block.tsx";
import PageWrapper from "../../components/shared/page-wrapper.tsx";
import NotesService from "../../services/notes-service.ts";
import { Note } from "../../@types/fstack-flags";
import NoteCard from "../../components/notes/note-card.tsx";
import NoResultBlock from "../../components/shared/no-result-block.tsx";
import { NavLink } from "react-router-dom";
import FeatureWrapper from "../../components/shared/feature-wrapper.tsx";
import ConfirmDialog from "../../components/shared/confirm-dialog.tsx";

export default function NotesIndex(): ReactNode {
  const [filterText, setFilterText] = useState<string>("");
  const [notes, setNotes] = useState<Array<Note>>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const filteredNotes = filterText
    ? notes.filter((note) => note.title.toLowerCase().includes(filterText.toLowerCase()))
    : notes;

  const fetchNotes = useCallback(() => {
    const _exec = async () => {
      const notesService = new NotesService();
      const notesOrNull = await notesService.getNotes();
      setNotes(notesOrNull ?? []);
    };

    _exec().then();
  }, []);

  const deleteNote = useCallback(() => {
    const _exec = async () => {
      if (!selectedNote) return;
      const notesService = new NotesService();
      const deleteResult = await notesService.deleteNote(`${selectedNote.id}`);
      if (!deleteResult.success) return alert("Failed to delete note");
      fetchNotes();
    };

    _exec().then();
  }, [fetchNotes, selectedNote]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <PageWrapper
      pageTitle='Note Listing'
      rightContent={
        <NavLink
          className='bg-blue-600 text-white p-2 rounded flex items-center gap-2'
          to='new-note'
        >
          <BiSolidNote />
          Add Note
        </NavLink>
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
      <div className='py-2'>
        <label
          htmlFor='noteFilter'
          className='text-blue-400 font-bold'
        >
          Filter Notes
        </label>
        <input
          id='noteFilter'
          type='text'
          className='p-2 rounded border-2 border-blue-300 text-blue-600 w-full'
          placeholder='Filter notes by title'
          onChange={(e) => setFilterText(e.target.value)}
          value={filterText}
        />
      </div>
      {filteredNotes.length ? (
        <div className='grid grid-cols-1 gap-4'>
          {filteredNotes.map((note) => (
            <NoteCard
              key={`note-${note.id}`}
              note={note}
              actionElements={
                <>
                  <NavLink
                    className='underline text-blue-600 flex items-center gap-1'
                    to={`/edit-note/${note.id}`}
                  >
                    <BiSolidEdit />
                    Edit Note
                  </NavLink>
                  <FeatureWrapper requiredFeature='FE_INLINE_NOTE_DELETE'>
                    <button
                      className='flex items-center gap-1 text-red-600 underline cursor-pointer'
                      onClick={() => setSelectedNote(note)}
                    >
                      <BiSolidTrash />
                      Delete
                    </button>
                  </FeatureWrapper>
                </>
              }
            />
          ))}
        </div>
      ) : (
        <NoResultBlock />
      )}
      {selectedNote ? (
        <ConfirmDialog
          content={
            <p className='text-lg'>
              You are about to delete the note:{" "}
              <span className='font-medium'>{selectedNote.title}</span>. Would you like to continue?
            </p>
          }
          dialogDismissAction={() => setSelectedNote(null)}
          dialogOpen={true}
          titleText='Delete Note?'
          dialogActionElements={
            <div className='flex items-center gap-2'>
              <button
                className='p-2 rounded bg-slate-800 text-white flex items-center'
                onClick={() => setSelectedNote(null)}
              >
                <BiSolidArrowToLeft />
                No, don't delete it
              </button>
              <button
                className='p-2 rounded bg-red-600 text-white flex items-center'
                onClick={() => {
                  setSelectedNote(null);
                  deleteNote();
                }}
              >
                <BiSolidTrash />
                Yes, delete it!
              </button>
            </div>
          }
        />
      ) : null}
    </PageWrapper>
  );
}
