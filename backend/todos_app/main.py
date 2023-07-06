# uvicorn main:app --reload
import models
from database import engine
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from internal import admin
from routers import address, auth, todos, users

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    # "http://localhost.tiangolo.com",
    # "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router)
app.include_router(todos.router)
app.include_router(users.router)
app.include_router(admin.router)
app.include_router(address.router)
