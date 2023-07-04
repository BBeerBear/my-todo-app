from typing import Annotated

from dependencies import get_current_user, get_db
from fastapi import APIRouter, Depends, HTTPException, status
from models import Users
from passlib.context import CryptContext
from schemas import UserVerification
from sqlalchemy.orm import Session

router = APIRouter(
    prefix="/user", tags=["user"], dependencies=[Depends(get_current_user)]
)

user_dependency = Annotated[dict, Depends(get_current_user)]
db_dependency = Annotated[Session, Depends(get_db)]
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# return all information about the user that is currently logged in
@router.get("/", status_code=status.HTTP_200_OK)
async def get_user(user: user_dependency, db: db_dependency):
    return db.query(Users).filter(Users.id == user.get("id")).first()


# change current user password
@router.post("/", status_code=status.HTTP_204_NO_CONTENT)
async def change_password(
    db: db_dependency,
    user_model: Annotated[Users, Depends(get_user)],
    user_verification: UserVerification,
):
    if not pwd_context.verify(user_verification.password, user_model.hashed_password):
        raise HTTPException(status_code=401, detail="Error on password change")
    user_model.hashed_password = pwd_context.hash(user_verification.new_password)

    db.add(user_model)
    db.commit()
