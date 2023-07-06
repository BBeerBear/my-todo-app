from typing import Optional
from pydantic import BaseModel, Field


class CreateUserRequest(BaseModel):
    email: str
    username: str
    first_name: str
    last_name: str
    password: str
    verify_password: str
    phone_number: int
    role: str

    class Config:
        schema_extra = {
            "example": {
                "email": "bbeer@example.com",
                "username": "babear",
                "first_name": "pigg",
                "last_name": "cedy",
                "password": "123456",
                "verify_password": "123456",
                "phone_number": 5139239823,
                "role": "user",
            }
        }


class TodoRequest(BaseModel):
    title: str = Field(min_length=3)
    description: str = Field(min_length=3, max_length=100)
    priority: int = Field(gt=0, lt=6)
    complete: bool


class Token(BaseModel):
    access_token: str
    token_type: str


class UserVerification(BaseModel):
    password: str
    new_password: str = Field(min_length=6)


class Address(BaseModel):
    address1: str
    address2: Optional[str]
    city: str
    state: str
    country: str
    postalcode: str
    apt_num: Optional[int]

    class Config:
        schema_extra = {
            "example": {
                "address1": "Radf Avenue",
                "address2": "Sefd Street",
                "city": "Berdk",
                "state": "New York",
                "country": "US",
                "postalcode": "H1H 1N1",
                "apt_num": "222",
            }
        }
