# File: app.py
# Desc: The entrypoint of this tutorial application
from starlette.applications import Starlette
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

app = Starlette(debug=True, routes=routes)
