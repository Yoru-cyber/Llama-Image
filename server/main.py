from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from PIL import Image
import random
app = FastAPI()

origins =[
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
    return {"Hello": "You are in the root. If you read this everything works alright. Go to /docs for documentation"}


#http://localhost:8000/convert?type=png
@app.post("/convert")
async def read_image(file: UploadFile, type: str):
    if file and type:
        randomSeed = random.seed()
        hashCode = hash(f'{file.filename}{randomSeed}')
        image = Image.open(file.file)
        image.save(f'./images/{hashCode}.{type}') #to avoid having the possibility of a file with the same name, add a hash code with a random seeded value to the filename
        return FileResponse(f'./images/{hashCode}.{type}')


# http://localhost:8000/scale?scaling=2
@app.post("/scale")
async def scale_image(file: UploadFile, scaling: int):
    if file and scaling:
        image = Image.open(file.file)
        image = image.resize([image.width * scaling, image.height * scaling])
        image.save(f'./images/{file.filename}')
        return {"status_code": 200}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)