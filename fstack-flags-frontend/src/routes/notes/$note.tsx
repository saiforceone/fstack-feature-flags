import { FormEvent, type ReactNode, useCallback, useEffect, useState } from "react";
import PageWrapper from "../../components/shared/page-wrapper.tsx";
import { useNavigate, useParams } from "react-router";
import FormFieldWrapper from "../../components/shared/form-field-wrapper.tsx";
import { BiSolidSave } from "react-icons/bi";
import { NoteFormError } from "../../@types/fstack-flags";
import NotesService from "../../services/notes-service.ts";

type NoteProps = {
  isNewNote: boolean;
};

type NoteSchema = {
  title: string;
  content: string;
};

export default function Note({ isNewNote }: NoteProps): ReactNode {
  const navigate = useNavigate();
  const params = useParams();
  const noteId = params["note"];

  const [noteData, setNoteData] = useState<NoteSchema>({
    title: "",
    content: "",
  });
  const [noteFormErrors, setNoteFormErrors] = useState<NoteFormError>({});

  const fetchNote = useCallback(() => {
    const _exec = async () => {
      if (!noteId) return;
      const notesService = new NotesService();
      const note = await notesService.getNote(noteId);
      if (note) {
        setNoteData({
          title: note.title,
          content: note.content,
        });
      }
    };

    _exec().then();
  }, [noteId]);

  const saveNote = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const _exec = async () => {
        // basic validation
        setNoteFormErrors({});
        const validationErrors: NoteFormError = {};
        if (!noteData.title.trim().length) validationErrors["noteTitle"] = ["Invalid title"];
        if (!noteData.content.trim().length) validationErrors["noteContent"] = ["Invalid content"];
        if (Object.keys(validationErrors).length) {
          setNoteFormErrors(validationErrors);
          return;
        }

        const notesService = new NotesService();
        const noteResponse = await notesService.upsertNote(noteData, noteId);
        if (noteResponse.success) {
          return navigate("/");
        }

        alert(`Something went wrong while trying to save your note`);
      };

      _exec().then();
    },
    [noteData, noteId]
  );

  useEffect(() => {
    fetchNote();
  }, [fetchNote]);

  return (
    <PageWrapper
      pageTitle={`${isNewNote ? "Create New" : "Edit Existing"} Note`}
      subtitle={`Use the form below to ${isNewNote ? "create a new note" : "edit an existing note"}`}
    >
      <form
        className='flex flex-col gap-4'
        onSubmit={saveNote}
      >
        <FormFieldWrapper formFieldErrors={noteFormErrors["noteTitle"]}>
          <label htmlFor='noteTitle'>Title</label>
          <input
            type='text'
            className='p-2 rounded border-blue-300 border-2 w-full text-blue-600'
            id='noteTitle'
            placeholder='Give your note a title'
            onChange={(e) => setNoteData((prevState) => ({ ...prevState, title: e.target.value }))}
            value={noteData.title}
          />
        </FormFieldWrapper>
        <FormFieldWrapper formFieldErrors={noteFormErrors["noteContent"]}>
          <label htmlFor='noteContent'>Contents of your note</label>
          <textarea
            name='noteContent'
            id='noteContent'
            rows={3}
            className='p-2 rounded border-blue-300 border-2 w-full text-blue-600'
            placeholder='Write what you note is about'
            onChange={(e) =>
              setNoteData((prevState) => ({ ...prevState, content: e.target.value }))
            }
            value={noteData.content}
          ></textarea>
        </FormFieldWrapper>
        <div>
          <button
            type='submit'
            className='p-4 rounded flex items-center gap-2 bg-green-600 text-white w-full hover:bg-green-400 duration-200'
          >
            <BiSolidSave />
            {isNewNote ? "Create" : "Update"} Note
          </button>
        </div>
      </form>
    </PageWrapper>
  );
}
