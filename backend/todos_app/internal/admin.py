from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from dependencies import get_admin, get_db
from models import Todos
from schemas import TodoRequest

router = APIRouter(prefix="/admin", tags=["admin"], dependencies=[Depends(get_admin)])
db_dependency = Annotated[Session, Depends(get_db)]


@router.get("/")
async def read_all(db: db_dependency):
    return db.query(Todos).all()


@router.get("/{todo_id}")
async def read_todo(db: db_dependency, todo_id: int):
    return db.query(Todos).filter(Todos.id == todo_id).first()


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_todo(
    admin: Annotated[dict, Depends(get_admin)],
    db: db_dependency,
    todo_request: TodoRequest,
):
    todo_model = Todos(**todo_request.dict(), owner_id=admin.id)

    db.add(todo_model)
    db.commit()


@router.delete("/{todo_id}")
async def delete_todo(db: db_dependency, todo_id: int):
    todo_model = db.query(Todos).filter(Todos.id == todo_id).first()
    if todo_model is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    db.query(Todos).filter(Todos.id == todo_id).delete()
    db.commit()
