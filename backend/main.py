import os.path

from fastapi import FastAPI, Query

import pandas as pd
import uvicorn
from starlette.middleware.cors import CORSMiddleware
from starlette.staticfiles import StaticFiles

from backend.routers import image
from backend.utils.lancedb_utils import create_table, search_table
from backend.utils.image_utils import get_images

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
IMG_DIR = os.path.join(BASE_DIR, "img_source")

table = create_table("images")
uris = get_images(IMG_DIR)
table.add(pd.DataFrame({"image_uri": uris}))
app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:8000",

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/img_source", StaticFiles(directory=IMG_DIR), name="img_source")

app.include_router(image.router)


@app.get("/")
def home():
    return {"message": "Welcome to the Image Search API! Use /(search)/{query} to (search) for images."}


@app.get("/search/{query}")
async def search_images(query: str, matching_amount: int = Query(9, ge=1, le=50)):
    results = search_table(table, query, matching_amount)
    image_paths = [img.image_uri for img in results]
    return {"images": image_paths}


if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000)
