"""change type of phone_number to BigInt to address table

Revision ID: d3b43ad7e650
Revises: fa7cec5edbac
Create Date: 2023-06-29 20:20:41.885799

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "d3b43ad7e650"
down_revision = "fa7cec5edbac"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.alter_column(
        table_name="users",
        column_name="phone_number",
        type_=sa.BIGINT(),
    )


def downgrade() -> None:
    op.alter_column(
        table_name="users",
        column_name="phone_number",
        type_=sa.Integer(),
    )
