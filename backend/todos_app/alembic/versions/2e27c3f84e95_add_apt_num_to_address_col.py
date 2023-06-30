"""add apt_num to address col

Revision ID: 2e27c3f84e95
Revises: d3b43ad7e650
Create Date: 2023-06-29 20:30:20.528304

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "2e27c3f84e95"
down_revision = "d3b43ad7e650"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("address", sa.Column("apt_num", sa.Integer(), nullable=True))


def downgrade() -> None:
    op.drop_column("address", "apt_num")
