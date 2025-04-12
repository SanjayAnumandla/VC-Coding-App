# backend/
# ├── app/
# │   ├── __init__.py
# │   ├── main.py
# │   ├── db.py
# │   ├── models/
# │   ├── schemas/
# │   ├── routes/
# │   └── sockets/
# ├── alembic/
# ├── requirements.txt

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db import Base, engine
from app.models import user
from app.routes import auth
from app.sockets.editor import editor_socket

app = FastAPI()

# CORS settings for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with frontend URL in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(auth.router)

Base.metadata.create_all(bind=engine)

# WebSocket endpoint
app.add_api_websocket_route("/ws/editor/{session_id}", editor_socket)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Real-Time Collab Editor API"}
