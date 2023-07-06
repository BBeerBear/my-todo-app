from datetime import datetime, timedelta
from typing import Annotated, Union

from dependencies import ACCESS_TOKEN_EXPIRE_MINUTES, ALGORITHM, SECRET_KEY, get_db
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt
from models import Users
from passlib.context import CryptContext
from schemas import CreateUserRequest, Token
from sqlalchemy.orm import Session

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)

access_token_expire = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
db_dependency = Annotated[Session, Depends(get_db)]


def create_user(db, create_user_request: CreateUserRequest):
    create_user_model = Users(
        email=create_user_request.email,
        username=create_user_request.username,
        first_name=create_user_request.first_name,
        last_name=create_user_request.last_name,
        hashed_password=pwd_context.hash(
            create_user_request.password
        ),  # hash the password
        phone_number=create_user_request.phone_number,
        is_active=True,
        role=create_user_request.role,
    )
    db.add(create_user_model)
    db.commit()
    db.refresh(create_user_model)
    return create_user_model


# login
def authenticate_user(db, email: str, password: str):
    user = db.query(Users).filter(Users.email == email).first()
    if not user:
        return False
    if not pwd_context.verify(password, user.hashed_password):  # verify password
        return False
    return user


# create jwt(access token)
def create_access_token(
    username: str,
    user_id: int,
    user_role: str,
    expires_delta: Union[timedelta, None] = None,
):
    to_encode = {
        "sub": username,
        "id": user_id,
        "role": user_role,
    }  # "sub" prevent same id, to differentiate differet id from different sub
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)  # default
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


# register
@router.post("/register", status_code=status.HTTP_201_CREATED, response_model=Token)
async def create_new_user(create_user_request: CreateUserRequest, db: db_dependency):
    validation1 = (
        db.query(Users).filter(Users.username == create_user_request.username).first()
    )
    validation2 = (
        db.query(Users).filter(Users.email == create_user_request.email).first()
    )
    if (
        create_user_request.password != create_user_request.verify_password
        or validation1 is not None
        or validation2 is not None
    ):
        raise HTTPException(status_code=400, detail="Invalid registration request.")
    create_user_model = create_user(db, create_user_request)
    access_token = create_access_token(
        create_user_model.username,
        create_user_model.id,
        create_user_model.role,
        access_token_expire,
    )
    return {"access_token": access_token, "token_type": "bearer"}


# login for jwt
@router.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: db_dependency
):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Could not validate user.")

    access_token = create_access_token(
        user.username, user.id, user.role, access_token_expire
    )
    return {"access_token": access_token, "token_type": "bearer"}
