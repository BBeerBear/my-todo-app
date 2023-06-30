from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# SQLALCHEMY_DATABASE_URL = "sqlite:///./todos.db"
SQLALCHEMY_DATABASE_URL = (
    "postgresql://postgres:19990622@localhost/TodoApplicationDatabase"
)

# SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:19990622@localhost:3306/todo_app"

# engine = create_engine(
#     SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
# )
engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
