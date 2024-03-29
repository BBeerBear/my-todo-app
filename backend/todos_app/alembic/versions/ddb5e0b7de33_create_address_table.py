"""create address table

Revision ID: ddb5e0b7de33
Revises: 20e206c0ba43
Create Date: 2023-06-29 19:34:08.656805

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "ddb5e0b7de33"
down_revision = "20e206c0ba43"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "address",
        sa.Column("id", sa.Integer(), nullable=False, primary_key=True),
        sa.Column("address1", sa.String(), nullable=False),
        sa.Column("address2", sa.String(), nullable=False),
        sa.Column("city", sa.String(), nullable=False),
        sa.Column("state", sa.String(), nullable=False),
        sa.Column("country", sa.String(), nullable=False),
        sa.Column("postalcode", sa.String(), nullable=False),
    )


def downgrade() -> None:
    op.drop_table("address")
