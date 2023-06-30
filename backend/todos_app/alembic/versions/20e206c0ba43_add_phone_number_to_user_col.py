"""add phone number to user col

Revision ID: 20e206c0ba43
Revises: 
Create Date: 2023-06-29 19:28:24.639632

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "20e206c0ba43"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("users", sa.Column("phone_number", sa.Integer(), nullable=True))


def downgrade() -> None:
    op.drop_column("users", "phone_number")
