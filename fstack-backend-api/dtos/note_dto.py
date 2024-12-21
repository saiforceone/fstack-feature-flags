from pydantic import BaseModel


class NoteDTO(BaseModel):
    title: str
    content: str
