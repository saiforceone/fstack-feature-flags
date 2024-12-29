# File: routes/__init__.py
from starlette.routing import Route, Mount

from controllers import NotesController, FeatureFlagsController

app_routes: list[Route | Mount] = [
    Mount('/api', routes=[
        Route('/notes', NotesController),
        Route('/notes/{note}', NotesController),
        Route('/features', FeatureFlagsController),
    ]),
]
