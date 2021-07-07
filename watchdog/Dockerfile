FROM python:3.9-slim-buster
# https://pythonspeed.com/articles/base-image-python-docker-images/
WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y ffmpeg

COPY requirements.txt requirements.txt
# COPY watcher.py watcher.py

RUN pip install -r requirements.txt
# RUN python watcher.py
# COPY . .
CMD ["python3", "watcher.py"]

