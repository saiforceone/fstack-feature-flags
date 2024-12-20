# File: app.py
# Desc: The entrypoint of this tutorial application
from starlette.applications import Starlette
from starlette.responses import JSONResponse
from starlette.routing import Route


async def main(request):
    return JSONResponse({
        'success': True,
        'message': 'Tutorial basic route handler'
    })

app_routes = [
    Route('/', main),
]

app = Starlette(debug=True, routes=app_routes)
