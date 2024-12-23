# File: app.py
# Desc: The entrypoint of this tutorial application
from starlette.applications import Starlette
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse
from starlette.routing import Route

from routes import app_routes


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

app = Starlette(debug=True, middleware=middleware, routes=routes)
