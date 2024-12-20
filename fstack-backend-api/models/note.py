from typing import Optional
from sqlalchemy import String, Text
from sqlalchemy.dialects.sqlite import DATETIME
from sqlalchemy.orm import Mapped, mapped_column

from _base_model import BaseModel


class Note(BaseModel):
    __tablename__ = "note"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(100))
    content: Mapped[str] = mapped_column(Text)
    created_at: Mapped[DATETIME] = mapped_column(DATETIME)
    updated_at: Mapped[DATETIME] = Mapped[Optional[DATETIME]]

    def __repr__(self) -> str:
        return f"Note(id={self.id!r}), title={self.title!r}"
