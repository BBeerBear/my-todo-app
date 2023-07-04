from typing import Annotated

import models
import schemas
from dependencies import get_current_user, get_db
from fastapi import APIRouter, Body, Depends
from sqlalchemy.orm import Session

router = APIRouter(
    prefix="/address",
    tags=["address"],
    dependencies=[Depends(get_current_user)],
    responses={404: {"description": "Not found"}},
)

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]


@router.post("/")
async def create_address(
    db: db_dependency,
    user: user_dependency,
    address: Annotated[schemas.Address, Body()],
):
    address_model = models.Address(**address.dict())

    db.add(address_model)
    db.flush()  # return teh id and has the id attached

    user_model = (
        db.query(models.Users).filter(models.Users.id == user.get("id")).first()
    )
    user_model.address_id = address_model.id

    db.add(user_model)
    db.commit()
