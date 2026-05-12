from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database import engine, Base
from app import models  # noqa – ensures all models are registered
from app.seed import run_seed
from app.routers import products, orders


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create all tables on startup (idempotent)
    Base.metadata.create_all(bind=engine)
    # Seed default products if tables are empty
    run_seed()
    yield


app = FastAPI(
    title="Orenda API",
    description="أوريندا — Premium DTC Supplements Store API",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs" if settings.ENVIRONMENT != "production" else None,
    redoc_url=None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router, prefix="/api")
app.include_router(orders.router, prefix="/api")


@app.get("/health")
def health():
    return {"status": "ok", "brand": "Orenda أوريندا"}
