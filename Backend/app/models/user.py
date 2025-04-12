from sqlalchemy import Column, Integer, String, DateTime, Sequence
from sqlalchemy.sql import func
from app.db import Base

class User(Base):
    __tablename__ = "db_user"

    # Use custom sequence for ID
    id = Column(Integer, Sequence('user_id_seq', start=2025001, increment=1), primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
