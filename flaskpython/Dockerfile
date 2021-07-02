FROM python:3.9-slim-buster
# https://pythonspeed.com/articles/base-image-python-docker-images/
WORKDIR /usr/src/app
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
#Server will reload itself on file changes if in dev mode
ENV FLASK_ENV=development 
COPY requirements.txt requirements.txt
# COPY watcher.py watcher.py

RUN pip install -r requirements.txt
RUN apt-get update && apt-get install -y ffmpeg
# RUN python watcher.py
# COPY . .
CMD ["flask", "run"]

# CMD ["gunicorn", "-b", "0.0.0.0:5000", "-w", "4", "app:app" ]