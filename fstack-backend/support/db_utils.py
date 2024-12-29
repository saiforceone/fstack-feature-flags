from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


class DBUtils:
    _instance = None
    _session = None

    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, 'instance'):
            cls._instance = super(DBUtils, cls).__new__(cls)
        return cls._instance

    def __init__(self):
        print("initializing db_utils...")
        self.engine = create_engine('sqlite:///database.db')
        self.session = sessionmaker(bind=self.engine)()


db_utils = DBUtils()
