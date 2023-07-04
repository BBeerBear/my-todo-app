from typing import Annotated

from dependencies import get_current_user, get_db
from fastapi import APIRouter, Depends, HTTPException, Path, status
from models import Todos
from schemas import TodoRequest
from sqlalchemy.orm import Session

router = APIRouter(
    prefix="/todos",
    tags=["todos"],
    dependencies=[Depends(get_current_user)],
)

user_dependency = Annotated[dict, Depends(get_current_user)]
db_dependency = Annotated[Session, Depends(get_db)]


# Read all Todos of the current user
@router.get("/")
async def read_all(user: user_dependency, db: db_dependency):
    return db.query(Todos).filter(Todos.owner_id == user.get("id")).all()


# Get a Todo by its ID
@router.get("/{todo_id}", status_code=status.HTTP_200_OK)
async def read_todo(
    user: user_dependency, todo_id: Annotated[int, Path(gt=0)], db: db_dependency
):
    todo_model = (
        db.query(Todos)
        .filter(Todos.id == todo_id)
        .filter(Todos.owner_id == user.get("id"))
        .first()
    )
    if todo_model is not None:
        return todo_model
    raise HTTPException(status_code=404, detail="Todo not found.")


# Create a new Todo
@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_todo(
    user: user_dependency, todo_request: TodoRequest, db: db_dependency
):
    todo_model = Todos(**todo_request.dict(), owner_id=user.get("id"))

    db.add(todo_model)
    db.commit()


# Update a Todo
@router.put("/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_todo(
    user: user_dependency,
    todo_id: Annotated[int, Path(gt=0)],
    todo_request: TodoRequest,
    db: db_dependency,
):
    todo_model = (
        db.query(Todos)
        .filter(Todos.id == todo_id)
        .filter(Todos.owner_id == user.get("id"))
        .first()
    )
    if todo_model is None:
        raise HTTPException(status_code=404, detail="Todo not found")

    todo_model.title = todo_request.title
    todo_model.description = todo_request.description
    todo_model.priority = todo_request.priority

    db.add(todo_model)
    db.commit()


# delete a post
@router.delete("/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_todo(
    user: user_dependency, todo_id: Annotated[int, Path(gt=0)], db: db_dependency
):
    todo_model = (
        db.query(Todos)
        .filter(Todos.id == todo_id)
        .filter(Todos.owner_id == user.get("id"))
        .first()
    )
    if todo_model is None:
        raise HTTPException(status_code=404, detail="Todo not found")

    db.query(Todos).filter(Todos.id == todo_id).delete()

    db.commit()
