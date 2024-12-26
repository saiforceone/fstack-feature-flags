# File: controllers/notes_controller.py
# Desc: Controller that provides CRUD operations for notes

import sqlalchemy
from starlette.requests import Request
from starlette.responses import JSONResponse
from starlette.types import Receive, Scope, Send

from controllers.base_controller import BaseController
from dtos.note_dto import NoteDTO
from models import Note
from models.base_model import BaseModel
from support.db_utils import db_utils
from support.validate_with_dto import validate_with_dto


class NotesController(BaseController):

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
        response = NotesController._build_response()

        note_id = request.path_params.get('note', None)

        # check if we have a note_id and attempt to retrieve and return it as JSON
        if note_id is not None:
            try:
                note = self.session.query(Note).where(Note.id == note_id).scalar()
            except Exception as e:
                print(f"Failed to retrieve note using id with error: {e}")
                response['message'] = "An unexpected error occurred"
                return JSONResponse(response, status_code=500)

            if note is None:
                response['message'] = "Note not found"
                return JSONResponse(response, status_code=404)

            response['data'] = note.to_dict()
            response['success'] = True
            return JSONResponse(response)

        # fetch all the notes
        try:
            notes = self.session.query(Note).all()
        except Exception as e:
            print(f"Failed to retrieve notes with error: {e}")
            response['message'] = "Failed to retrieve unexpected error"
            return JSONResponse(response, status_code=500)

        if len(notes) == 0:
            response['message'] = "No results were found"
            return JSONResponse(response, status_code=404)

        response['data'] = [note.to_dict() for note in notes]
        response['success'] = True

        return JSONResponse(response)

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

        response = NotesController._build_response()

        try:
            note = Note(**body_data.model_dump())
            self.session.add(note)
            self.session.commit()
        except Exception as e:
            print(f"error creating note: {e}")
            response['message'] = "An unexpected error occurred while creating a note"
            return JSONResponse(response, status_code=500)

        response['data'] = note.to_dict()
        response['success'] = True

        return JSONResponse(response, status_code=201)

    @validate_with_dto(required_dto=NoteDTO)
    async def put(self, request: Request, **kwargs) -> JSONResponse:
        """
        Request handler for updating an exiting note
        :param request:
        :param kwargs: additional args to the post method that contains 'body_data'
        :return:
        """
        response = NotesController._build_response()

        # try to get the note_id from the url path
        note_id = request.path_params.get('note', None)

        if note_id is None:
            response['message'] = 'Invalid note identifier or id not given'
            return JSONResponse(response, status_code=400)

        # we're doing an assertion here because if we are able to get to this point, then validation of the incoming
        # data was successful.
        body_data = kwargs['body_data']
        assert isinstance(body_data, NoteDTO)

        try:
            note = self.session.query(Note).where(Note.id == note_id).scalar()
        except Exception as e:
            print(f"Failed to update note having id: {note_id} with error: {e}")
            response['message'] = 'An unexpected error occurred while trying to update an existing note'
            return JSONResponse(response, status_code=500)

        for key, value in body_data.model_dump().items():
            if hasattr(note, key):
                setattr(note, key, value)

        try:
            self.session.add(note)
            self.session.commit()
        except Exception as e:
            print(f"Failed to update note having id: {note_id} with error: {e}")
            response['message'] = 'An unexpected error occurred while trying to update an existing note'
            return JSONResponse(response, status_code=500)

        response['data'] = note.to_dict()
        response['success'] = True

        return JSONResponse(response)

    async def delete(self, request: Request) -> JSONResponse:
        """
        Request handler for deleting an existing note
        :param request:
        :return:
        """
        response = NotesController._build_response()

        note_id = request.path_params.get('note', None)

        if note_id is None:
            response['message'] = 'Invalid note identifier or id not given'
            return JSONResponse(response, 400)

        try:
            note = self.session.query(Note).where(Note.id == note_id).scalar()
        except Exception as e:
            print(f"Failed to delete note having id: {note_id} with error: {e}")
            response['message'] = 'An unexpected error occurred while trying to delete a note'
            return JSONResponse(response, status_code=500)

        if note is None:
            response['message'] = 'Unable to delete a non-existent note'
            return JSONResponse(response, status_code=404)

        try:
            self.session.delete(note)
            self.session.commit()
        except Exception as e:
            print(f"Failed to delete note having id: {note_id} with error: {e}")
            response['message'] = 'An unexpected error occurred while trying to delete a note'
            return JSONResponse(response, status_code=500)

        response['success'] = True
        return JSONResponse(response)
