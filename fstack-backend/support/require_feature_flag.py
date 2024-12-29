import functools
import inspect
import typing
from starlette.requests import Request
from starlette.responses import JSONResponse

from models.feature_flag import FeatureFlag
from support.db_utils import db_utils


def require_feature_flag(required_flag: str):

    def feature_exec_wrapper(func: typing.Callable) -> typing.Callable:
        sig = inspect.signature(func)
        for idx, parameter in enumerate(sig.parameters.values()):
            if parameter.name == "request":
                break
        else:
            raise Exception(
                f'No "request" argument on function "{func}"'
            )
        
        @functools.wraps(func)
        async def exec_feature_check(*args, **kwargs):
            request = kwargs.get("request", args[idx] if idx < len(args) else None)
            assert isinstance(request, Request)

            # retrieve feature flags from the application state
            cached_flags = getattr(request.app.state, 'CACHED_FLAGS', [])

            feature_flag = None

            # check the list of cached_flags
            if len(cached_flags) > 0:
                print("cache hit!")
                # search the cache
                for flag in cached_flags:
                    if flag['flag'] == required_flag:
                        feature_flag = flag
            else:
                print("cache miss")
                # try to retrieve feature flags matching the required_flag
                try:
                    feature_flag = db_utils.session.query(
                        FeatureFlag
                    ).where(
                        FeatureFlag.flag == required_flag, FeatureFlag.enabled == True
                    ).scalar()
                except Exception as e:
                    print(f"failed to retrieve feature flag with error: {e}")
                    return JSONResponse({
                        'success': False,
                        'message': 'Unexpected error occurred'
                    }, status_code=500)
            
            if feature_flag is None:
                print(f"the feature: {required_flag} was not found or is invalid")
                return JSONResponse({
                    'success': False,
                    'message': 'Invalid feature'
                }, status_code=500)
            
            return await func(*args, **kwargs)
        
        return exec_feature_check
    
    return feature_exec_wrapper
