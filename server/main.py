from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from PIL import Image
import random

app = FastAPI()

origins = [
    "http://localhost:5000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def read_root():
    return {
        "Hello": "You are in the root. If you read this everything works alright. Go to /docs for documentation"
    }


# http://localhost:8000/convert?type=png
@app.post("/convert")
async def read_image(user_image: UploadFile, type: str):
    if user_image and type:
        randomSeed = random.seed()
        hashCode = hash(f"{user_image.filename}{randomSeed}")
        image = Image.open(user_image.file)
        image.save(
            f"./images/{hashCode}.{type}"
        )  # to avoid having the possibility of a file with the same name, add a hash code with a random seeded value to the filename
        path = f"./images/{hashCode}.png"
        return {"status_code": 201, "message": "Object created", "path": path}


# http://localhost:8000/scale?scaling=2
@app.post("/scale")
async def scale_image(scaling: int, user_image: UploadFile):
    if user_image and scaling:
        randomSeed = random.seed()
        hashCode = hash(f"{user_image.filename}{randomSeed}")
        image = Image.open(user_image.file)
        image = image.resize([image.width * scaling, image.height * scaling])
        image.save(f"./images/{hashCode}.png")
        path = f"{hashCode}.png"
        return {"status_code": 201, "message": "Object created", "path": path}


@app.get("/image/{image_name}")
async def get_image(image_name: str):
    return FileResponse(f"./images/{image_name}")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)
