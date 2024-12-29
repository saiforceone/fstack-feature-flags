# File: app.py
# Desc: The entrypoint of this tutorial application
from contextlib import asynccontextmanager

from starlette.applications import Starlette
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse
from starlette.routing import Route

from models.feature_flag import FeatureFlag
from routes import app_routes
from support.db_utils import db_utils


async def main(request):
    return JSONResponse({
        'success': True,
        'message': 'Tutorial basic route handler'
    })

routes = [
    Route('/', main),
] + app_routes

middleware = [
    Middleware(CORSMiddleware, allow_origins=['*'], allow_methods=['*'], allow_headers=['*']),
]


@asynccontextmanager
async def lifespan(application):
    """
    This method performs tasks for application startup and shutdown. In this case, we are caching the enabled feature
    flags on application startup, if none are found, we'll set the cached flags to an empty list
    :param application:
    :return:
    """
    try:
        enabled_features = db_utils.session.query(FeatureFlag).where(FeatureFlag.enabled).all()
        setattr(application.state, 'CACHED_FLAGS', [flag.to_dict() for flag in enabled_features])
    except Exception as e:
        print(f"failed to retrieve enabled feature flags with error: {e}. Continuing application startup...")
        setattr(application.state, 'CACHED_FLAGS', [])
    yield

app = Starlette(debug=True, middleware=middleware, routes=routes, lifespan=lifespan)
