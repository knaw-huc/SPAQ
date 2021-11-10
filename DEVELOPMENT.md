# Development

WIP

## Develop, build, run cycle

FLASK

During development. Shared folders (bind volume) for your code.

After change in Dockerfile, for example from native flask to gunicorn.
No need to specifiy which Dockerfile. The context of the docker-compose takes care of it.

with docker-compose

    docker-compose up -d
    docker-compose stop  audioreception
    docker-compose build audioreception
    docker-comnpose up -d




## realtime logging with docker

    docker-compose logs -f audioreception

name of the service

## GUNICORN

Why: https://blog.ironboundsoftware.com/2016/06/27/faster-flask-need-gunicorn/

How: https://docs.gunicorn.org/en/latest/settings.html

Background: https://www.fullstackpython.com/green-unicorn-gunicorn.html

    CMD ["gunicorn", "--reload", "-b", "0.0.0.0:5000", "-w", "4", "app:app" ]

The --reload parameter during development restarts the server after a change

The accesslog of Gunicorn to standard output:

    CMD ["gunicorn", "--reload", "--access-logfile", "-", "-b", "0.0.0.0:5000", "-w", "4", "app:app" ]

