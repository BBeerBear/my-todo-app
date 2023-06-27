# uvicorn main:app --reload

from fastapi import FastAPI, Body, Path, HTTPException, Query, status
from typing import Union, Annotated
from pydantic import BaseModel, Field

app = FastAPI()


class Book:
    id: int
    title: str
    author: str
    description: str
    rating: int
    published_date: int

    def __init__(self, id, title, author, description, rating, published_date):
        self.id = id
        self.title = title
        self.author = author
        self.description = description
        self.rating = rating
        self.published_date = published_date


class BookRequest(BaseModel):
    id: Union[int, None] = Field(default=None, description="id is not needed")
    title: str = Field(
        min_length=3, description="the title must longer than 3 characters"
    )
    author: str = Field(min_length=1)
    description: str = Field(min_length=1, max_length=100)
    rating: int = Field(ge=0, le=5)
    published_date: int = Field(ge=1945, le=2023)

    class Config:
        schema_extra = {
            "example": {
                "title": "A new book",
                "author": "codingbear",
                "description": "A very interesting book.",
                "rating": 4,
                "published_date": 2023,
            }
        }


BOOKS = [
    Book(1, "Computer Science Pro", "codingwithroby", "A very nice book!", 5, 2012),
    Book(2, "Be Fast with FastAPI", "codingwithroby", "A great book!", 5, 2012),
    Book(3, "Master Endpoints", "codingwithroby", "A awesome book!", 5, 2029),
    Book(4, "HP1", "Author 1", "Book Description", 2, 2014),
    Book(5, "HP2", "Author 2", "Book Description", 3, 2020),
    Book(6, "HP3", "Author 3", "Book Description", 1, 2018),
]


@app.get("/books")
async def read_all_books():
    return BOOKS


@app.get("/books/{book_id}")
async def read_book(
    book_id: Annotated[
        int,
        Path(
            description="The ID of the book to get",
            gt=0,
        ),
    ]
):
    for book in BOOKS:
        if book.id == book_id:
            return book
    raise HTTPException(status_code=404, detail="Book not found")


@app.get("/books/")
async def read_book_by_rating(
    book_rating: Annotated[
        int, Query(description="The rating of the book to get", ge=0, le=5)
    ]
):
    return [book for book in BOOKS if book.rating == book_rating]


@app.get("/books/publish/")
async def read_book_by_publish(
    book_publish: Annotated[
        int, Query(description="The publish date of the book to get", ge=1945, le=2023)
    ]
):
    return [book for book in BOOKS if book.published_date == book_publish]


@app.post("/boods/create-book", status_code=201)
async def create_book(book_request: BookRequest):
    new_book = Book(**book_request.dict())
    BOOKS.append(new_book)


@app.put("/books/update_book", status_code=status.HTTP_204_NO_CONTENT)
async def update_book(updated_book: BookRequest):
    book_changed = False
    for i in range(len(BOOKS)):
        if BOOKS[i].id == updated_book.id:
            BOOKS[i] = updated_book
            book_changed = True
            break
    if not book_changed:
        raise HTTPException(status_code=404, detail="Book not found")


@app.delete("/books/delete_book/{book_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_book(
    book_id: Annotated[int, Path(description="The id of the book to be deleted", gt=0)]
):
    book_changed = False
    for book in BOOKS:
        if book.id == book_id:
            BOOKS.remove(book)
            book_changed = True
            break
    if not book_changed:
        raise HTTPException(status_code=404, detail="Book not found")
