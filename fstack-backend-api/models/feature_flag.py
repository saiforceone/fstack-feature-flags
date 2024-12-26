# File: feature_flag.py
from sqlalchemy import String, Text, Boolean
from sqlalchemy.orm import Mapped, mapped_column

from .base_model import BaseModel


class FeatureFlag(BaseModel):
    __tablename__ = 'feature_flag'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    flag: Mapped[str] = mapped_column(String(100), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=True)
    enabled: Mapped[bool] = mapped_column(Boolean, default=True)

    def to_dict(self):
        return {
            "flag": self.flag,
            "description": self.description,
        }
