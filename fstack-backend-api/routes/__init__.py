# File: routes/__init__.py
from starlette.routing import Route

from controllers import NotesController

app_routes: list[Route] = [
    Route('/notes', NotesController),
    Route('/notes/{note}', NotesController)
]
