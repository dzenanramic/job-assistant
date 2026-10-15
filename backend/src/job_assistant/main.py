from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.v1.analyze import router as analyze_router


def create_app() -> FastAPI:

    app = FastAPI()

    origins = ["*"]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(analyze_router, prefix="/jobs", tags=["Job CV"])

    @app.get("/")
    def read_root():
        return {"message": "Hello World"}


app = create_app()
