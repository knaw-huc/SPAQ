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
    docker-compose up -d


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


## RUN STANDALONE QUESTION TEMPLATE MAKER

### Build

    docker-compose build questiontemplatemaker

### Run

    docker run --rm -p80:5000 spaqpublic_questiontemplatemaker:latest

### Run for development

    docker run --rm -p80:5000 -v $(pwd)/questiontemplatemaker:/usr/src/app spaqpublic_questiontemplatemaker:latest

Check on: http://localhost/submitwordlist/


## GOING TO PRODUCTION / DEVELOPMENT

- don't share code folders, put code IN the image
- share volumes for resources created by the application
- make separate docker-compose and dockerfiles
- build and tag the images
- (push them to repository)
- link to the image from the docker-compose file
- 

### Example

    docker-compose -f docker-compose-prod.yml  build audioreception
    docker image ls
    REPOSITORY                                      TAG       IMAGE ID       CREATED         SIZE
    spaqpublic_audioreception                       latest    8cce276b6580   6 minutes ago   430MB
    docker tag 8cc spaq_audio:1.0

In docker-compose:

    audioreception:
        image: spaq_audio:1.0
        ports:
            - 8087:5000
        environment:
            USER: test
            PASSWORD: test
        volumes:
            - ./storage:/usr/src/app/static/storage

Test:

    docker-compose -f docker-compose-prod.yml up -d audioreception

## PRODUCTION

- protect usernames and password, not in git
- convert docker-compose-prod.yml to Kubernetes files with kompose



