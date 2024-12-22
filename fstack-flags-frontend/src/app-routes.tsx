import { type RouteObject } from "react-router";
import Notes from "./routes/notes.tsx";
import NotesIndex from "./routes/notes/_index.tsx";

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
      ],
    },
  ];
}
