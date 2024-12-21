import datetime
from typing import Optional
from sqlalchemy import String, Text
from sqlalchemy.dialects.sqlite import DATETIME
from sqlalchemy.orm import Mapped, mapped_column

from .base_model import BaseModel


class Note(BaseModel):
    __tablename__ = "note"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(100))
    content: Mapped[str] = mapped_column(Text)
    created_at: Mapped[DATETIME] = mapped_column(DATETIME, default=datetime.datetime.now)
    updated_at: Mapped[DATETIME] = Mapped[Optional[DATETIME]]

    def __repr__(self) -> str:
        return f"Note(id={self.id!r}), title={self.title!r}"

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "created_at": self.created_at.isoformat(),
        }
