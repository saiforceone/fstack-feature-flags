import { type RouteObject } from "react-router";
import Notes from "./routes/notes.tsx";
import NotesIndex from "./routes/notes/_index.tsx";
import Note from "./routes/notes/$note.tsx";

export default function AppRoutes(): Array<RouteObject> {
  return [
    {
      path: "/",
      element: <Notes />,
      children: [
        {
          path: "",
          element: <NotesIndex />,
        },
        {
          path: "/new-note",
          element: <Note isNewNote />,
        },
        {
          path: "/edit-note/:note",
          element: <Note isNewNote={false} />,
        },
      ],
    },
  ];
}
