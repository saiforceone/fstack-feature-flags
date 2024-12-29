import typing
from typing import TypedDict

from starlette.endpoints import HTTPEndpoint


class ControllerResponse(TypedDict):
    data: typing.Dict | typing.List[typing.Dict] | None
    message: str
    success: bool


class BaseController(HTTPEndpoint):

    @staticmethod
    def _build_response(
            data: typing.Optional[typing.Dict | typing.List[typing.Dict]] = None,
            message: str = '',
            success: bool = False
    ) -> ControllerResponse:
        return {
            'data': data,
            'message': message,
            'success': success,
        }
