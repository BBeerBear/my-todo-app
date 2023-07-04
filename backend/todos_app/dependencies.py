from database import SessionLocal
from typing import Annotated
from jose import JWTError, jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

SECRET_KEY = "0b447bf1378d32ca9b803e5aa6a1478e959eebc17ef65386f35c23bf1f872a96"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")


# get database
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# get current user info from jwt
async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate user.",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        user_id: str = payload.get("id")
        user_role: str = payload.get("role")
        if username is None or user_id is None or user_role is None:
            raise credentials_exception
        return {"username": username, "id": user_id, "user_role": user_role}
    except JWTError:
        raise credentials_exception


# get admin
async def get_admin(user: Annotated[dict, Depends(get_current_user)]):
    if user.get("user_role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication Failed"
        )
    return user
