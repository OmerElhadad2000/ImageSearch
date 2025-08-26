import os
from fastapi import APIRouter
from fastapi.responses import FileResponse

router = APIRouter()

BASE_DIR = os.getcwd()  # current working directory when starting FastAPI
IMG_DIR = os.path.join(BASE_DIR, "backend/img_source")


@router.get("/image/{filename}")
async def get_image(filename: str):
    file_path = os.path.join(IMG_DIR, filename).replace("\\", "/")

    print(f"Serving file from path: {file_path}")
    if not os.path.exists(file_path):
        return {"error": f"File {filename} not found"}
    return FileResponse(file_path)
