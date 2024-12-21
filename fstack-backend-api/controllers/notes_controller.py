# File: controllers/notes_controller.py
# Desc: Controller that provides CRUD operations for notes

import sqlalchemy
from starlette.endpoints import HTTPEndpoint
from starlette.requests import Request
from starlette.responses import JSONResponse
from starlette.types import Receive, Scope, Send

from dtos.note_dto import NoteDTO
from models import Note
from models.base_model import BaseModel
from support.db_utils import db_utils
from support.validate_with_dto import validate_with_dto


class NotesController(HTTPEndpoint):

    def __init__(self, scope: Scope, receive: Receive, send: Send):
        super().__init__(scope, receive, send)

        self.session = db_utils.session

        # check if the table exists and creates it if necessary
        if not sqlalchemy.inspect(db_utils.engine).has_table('note'):
            BaseModel.metadata.create_all(bind=db_utils.engine, tables=[BaseModel.metadata.tables['note']])

    async def get(self, request: Request) -> JSONResponse:
        """
        Request handler for handling retrieving a single note by its id or a list of notes otherwise.
        :param request:
        :return:
        """
        note_id = request.path_params.get('note', None)

        # check if we have a note_id and attempt to retrieve and return it as JSON
        if note_id is not None:
            try:
                note = self.session.query(Note).where(Note.id == note_id).scalar()
            except Exception as e:
                print(f"Failed to retrieve note using id with error: {e}")
                return JSONResponse({
                    'success': False
                })

            return JSONResponse({
                'success': True,
                'data': note.to_dict(),
            })

        # fetch all the notes
        try:
            notes = self.session.query(Note).all()
        except Exception as e:
            print(f"Failed to retrieve notes with error: {e}")
            return JSONResponse({
                'success': False,
                'message': 'Failed to retrieve unexpected error'
            })

        data = [note.to_dict() for note in notes]

        return JSONResponse({
            'success': True,
            'data': data
        })

    @validate_with_dto(required_dto=NoteDTO)
    async def post(self, request: Request, **kwargs) -> JSONResponse:
        """
        Request handler for handling the creation of new notes. When combined with the 'validate_with_dto'
        ensures that the incoming request data meets the validation requirements so that a new note can be saved
        :param request:
        :param kwargs: additional args to the post method that contains 'body_data'
        :return:
        """
        body_data = kwargs['body_data']

        # we're doing an assertion here because if we are able to get to this point, then validation of the incoming
        # data was successful.
        assert isinstance(body_data, NoteDTO)

        try:
            note = Note(**body_data.model_dump())
            self.session.add(note)
            self.session.commit()
        except Exception as e:
            print(f"error creating note: {e}")
            return JSONResponse({
                'success': False,
                'message': 'Unexpected error when creating a note'
            })

        return JSONResponse({
            'success': True,
            'data': note.to_dict()
        })

    @validate_with_dto(required_dto=NoteDTO)
    async def put(self, request: Request, **kwargs) -> JSONResponse:
        """

        :param request:
        :param kwargs:
        :return:
        """

        # try to get the note_id from the url path
        note_id = request.path_params.get('note', None)

        if note_id is None:
            return JSONResponse({
                'success': False,
                'message': 'Invalid note identifier or id not given'
            })

        # we're doing an assertion here because if we are able to get to this point, then validation of the incoming
        # data was successful.
        body_data = kwargs['body_data']
        assert isinstance(body_data, NoteDTO)

        try:
            note = self.session.query(Note).where(Note.id == note_id).scalar()
        except Exception as e:
            print(f"Failed to update note having id: {note_id} with error: {e}")
            return JSONResponse({
                'success': False
            })

        for key, value in body_data.model_dump().items():
            if hasattr(note, key):
                setattr(note, key, value)

        try:
            self.session.add(note)
            self.session.commit()
        except Exception as e:
            print(f"Failed to update note having id: {note_id} with error: {e}")

            return JSONResponse({
                'success': False
            })

        return JSONResponse({
            'success': True
        })

    async def delete(self, request: Request) -> JSONResponse:
        note_id = request.path_params.get('note', None)

        if note_id is None:
            return JSONResponse({
                'success': False,
                'message': 'No note id was given'
            })

        try:
            note = self.session.query(Note).where(Note.id == note_id).scalar()
        except Exception as e:
            print(f"Failed to delete note having id: {note_id} with error: {e}")
            return JSONResponse({
                'success': False
            })

        if note is None:
            return JSONResponse({
                'success': False,
                'message': 'Note not found',
            })

        try:
            self.session.delete(note)
            self.session.commit()
        except Exception as e:
            print(f"Failed to delete note having id: {note_id} with error: {e}")
            return JSONResponse({
                'success': False
            })

        return JSONResponse({
            'success': True
        })
