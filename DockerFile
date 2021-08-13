# syntax=docker/dockerfile:1

FROM python:3.9.6-slim-buster

WORKDIR /usr/src/app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY requirements.txt requirements.txt

RUN apt-get update && apt-get -y install gcc
RUN pip install virtualenv
COPY . /usr/src/app

RUN virtualenv venv
RUN . venv/bin/activate
RUN pip install -r requirements.txt


EXPOSE 8000

CMD [ "python", "manage.py" , "runserver", "0.0.0.0:8000"]
