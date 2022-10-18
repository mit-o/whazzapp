# pull official base image
FROM python:3.10-alpine

# set work directory
WORKDIR /app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONBUFFERED 1

# update packages
RUN apk add --update --no-cache --virtual .tmp-build-deps \
    gcc libc-dev linux-headers postgresql-dev \
    && apk add libffi-dev
RUN python -m pip install --upgrade pip
RUN pip install --upgrade wheel
RUN pip install --upgrade setuptools

# install dependencies
ADD requirements.txt /app/
RUN pip install -r requirements.txt

# add the rest files into the Docker container
ADD . /app/