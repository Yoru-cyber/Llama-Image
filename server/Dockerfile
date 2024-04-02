FROM python:3.11

#directory 
WORKDIR /src

#setup requirements
COPY ./requirements.txt /src/requirements.txt

#install dependencies
RUN pip install --no-cache-dir --upgrade -r /src/requirements.txt

#copy created app folder
COPY ./main.py /src/

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]