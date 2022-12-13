# pull official base image
FROM python:3.9-slim-buster

# set work directory
WORKDIR /app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONBUFFERED 1

# update packages
RUN apt-get update \
    && apt-get -y install libpq-dev gcc \
    && pip install psycopg2

RUN python -m pip install --upgrade pip
RUN pip3 install --upgrade wheel
RUN pip3 install --upgrade setuptools

# install dependencies
ADD requirements.txt /app/
RUN pip3 install -r requirements.txt

# add the rest files into the Docker container
ADD . /app/