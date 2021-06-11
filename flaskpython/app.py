from genericpath import isdir
from flask import Flask, request, render_template
from flask_cors import CORS
from datetime import datetime;
from os import listdir, makedirs
from os.path import isfile, join, exists
import json

app = Flask(__name__)
CORS(app)

receptiondir = 'static/reception/'

# app.static_folder = 'static'
@app.route('/')
def home():
    app.logger.info('Processing default request') 
    return 'Flask with dockertje!'

@app.route('/receive/') # start slash and end slash essential
def receive():
    return 'message received'

@app.route('/upload/', methods = ['POST', 'GET']) # POST is not in the default. added GET for tests, OPTIONS is always possible
def upload():
    fplog = open('log/diagnostic.txt' , "a") # niet zoals bij php aw
    # fplog.write("hallo\n")

    blob = request.data
    xfilename = request.headers.get('x-filename') # necessary?
    xclipid = request.headers.get('x-clipid')
    xtension = request.headers.get('x-tension') # .ogg, .mp4, .webm validation?
    xresponseid = request.headers.get('x-responseid')

    # credate folder with responseid
    if exists(receptiondir + xresponseid):
        app.logger.info('it does exist')
    else:
        app.logger.info('it does NOT exist')
        makedirs(receptiondir + xresponseid)

    responsefolder = receptiondir + xresponseid + "/"

    ct = datetime.now()
    currentTime = ct.strftime("-%Y-%m-%d-%H-%M-%S.%f")
    fplog.write(currentTime + "\n")

    if xclipid is not None and xtension is not None:
        filename = responsefolder + xclipid  + currentTime + '.' + xtension

        fplog.write(filename + "\n")

        with open(filename, 'ab') as f:
            f.write(blob)

        # TODO     
        status = "OK"
        bashcmd = "fmpeg converted"
        returnvalue = 0
        returnvalues = {"storestatus" : status, "mp4conv" : {"bashcmd" : bashcmd, "return" : returnvalue}}
        # dump() 
        return json.dumps(returnvalues)
    else:
        return 'geen fetch'    

@app.route('/watch/')
@app.route('/watch/reception/')
@app.route('/watch/<typewatch>/<respid>/')
def watch(typewatch = None, respid = None):
    if typewatch == "reception" and respid is not None and exists(receptiondir + respid):      
        dir = "static/reception/" + respid
        lijst = listFiles(dir)
        return render_template("index.html", lijst=lijst, dir=dir )
    else:
        # dir = receptiondir;
        lijst = listDirs(receptiondir)

        # return '<h1>TODO list of responses still watching...</h1>'
        return render_template("listresponses.html", lijst=lijst, dir=receptiondir )


def listFiles(mypath):
    onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]
    return onlyfiles

def listDirs(mypath):
    onlydirs = [f for f in listdir(mypath) if isdir(join(mypath, f))]
    return onlydirs    

@app.route('/createquestion/')
def createquestion():
    a = 3
    return render_template("audioquestion.html", a=a)

# app.add_url_rule('/watch/', '', watch)    # works also?
# https://stackoverflow.com/questions/45607711/what-is-the-endpoint-in-flasks-add-url-rule

# is this necessary with Docker?

if __name__ == "__main__":
    # app.config['TEMPLATES_AUTO_RELOAD'] = True
    # app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
    app.run(debug=True)


