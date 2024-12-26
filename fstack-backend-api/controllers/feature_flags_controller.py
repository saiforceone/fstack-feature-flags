# File: feature_flags_controller.py
import sqlalchemy
from starlette.requests import Request
from starlette.responses import JSONResponse
from starlette.types import Scope, Receive, Send

from controllers.base_controller import BaseController
from models.base_model import BaseModel
from models.feature_flag import FeatureFlag
from support.db_utils import db_utils


class FeatureFlagsController(BaseController):

    def __init__(self, scope: Scope, receive: Receive, send: Send):
        super().__init__(scope, receive, send)

        self.session = db_utils.session

        # check if the table exists and creates it if necessary
        if not sqlalchemy.inspect(db_utils.engine).has_table('feature_flag'):
            BaseModel.metadata.create_all(bind=db_utils.engine, tables=[BaseModel.metadata.tables['feature_flag']])

    async def get(self, request: Request) -> JSONResponse:
        response = FeatureFlagsController._build_response()

        # try to retrieve feature flags that are enabled
        try:
            feature_flags = self.session.query(
                FeatureFlag
            ).where(FeatureFlag.enabled).all()
        except Exception as e:
            print(f"Failed to retrieve feature flags with error: {e}")
            response['message'] = 'An unexpected error occurred while retrieving feature flags'
            return JSONResponse(response, status_code=500)

        if len(feature_flags) == 0:
            response['message'] = 'No feature are available'
            return JSONResponse(response, status_code=404)

        response['data'] = [flag.to_dict() for flag in feature_flags]
        response['success'] = True
        return JSONResponse(response)
