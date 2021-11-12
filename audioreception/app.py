''' Audio Reception '''

from flask import Flask, request, render_template, make_response, flash, redirect
from flask_httpauth import HTTPBasicAuth
from flask.helpers import url_for
from flask.json import jsonify
from flask_cors import CORS
from datetime import datetime;
from os import listdir, makedirs, environ
from os.path import isfile, join, exists
from mputility import listFiles, listDirs
from werkzeug.utils import secure_filename
import json
import logging

app = Flask(__name__)
CORS(app)

auth = HTTPBasicAuth()

# just a dictionary
users = { 
    environ['USER']: environ['PASSWORD'],  
}

@auth.verify_password
def verify_password(username, password):
    if username in users and password == users[username]:
        return username

receptiondir = 'static/storage/reception/'
app.config['UPLOAD_FOLDER'] = './static/uploads/'
# app.config['UPLOAD_FOLDER'] = 'testopvang/'
app.secret_key = 'super secret key'
app.config['MAX_CONTENT_LENGTH'] = 1024 * 1024 # max: 1MB, 10s ogg = 125MB, mp4 = 233MB, webm = 48MB



@app.before_request
def log_request():
    logline = request.method + " " + request.full_path
    # app.logger.info(logline)
    return None



# app.static_folder = 'static'
@app.route('/')
@auth.login_required
def home(): 
    return "Hello, %s!" % auth.current_user()

@app.route('/upload/', methods = ['POST', 'GET']) # POST is not in the default. added GET for tests, OPTIONS is always possible
def upload(): #uploaded soundblob from js client
    fplog = open('log/diagnostic.txt' , "a") # niet zoals bij php aw
    fplog.write("hallo\n")

    blob = request.data
    xfilename = request.headers.get('x-filename') # necessary?
    xclipid = request.headers.get('x-clipid')
    xtension = request.headers.get('x-tension') # .ogg, .mp4, .webm validation?
    xsurveyid = request.headers.get('x-surveyid')

    xresponseid = request.headers.get('x-responseid')

    # credate folder with surveyid / responseid
    if exists(receptiondir + xsurveyid + "/" + xresponseid):
        app.logger.info('it does exist', receptiondir)
    else:
        app.logger.info('it does NOT exist')
        makedirs(receptiondir + xsurveyid + "/" + xresponseid)

    responsefolder = receptiondir + xsurveyid + "/" + xresponseid + "/"

    ct = datetime.now()
    currentTime = ct.strftime("-%Y-%m-%d-%H-%M-%S.%f")
    fplog.write(currentTime + "\n")

    if xclipid is not None and xtension is not None:
        filename = responsefolder + xclipid  + currentTime + '.' + xtension
        fplog.write(filename + "\n")
        with open(filename, 'ab') as f:
            f.write(blob)

        if exists(filename):
            status = "OK"
        else:
            status = "NOT OK"            
        
        returnvalues = {"storestatus" : status} 
        return json.dumps(returnvalues)
    else:
        return 'geen fetch'    


# @app.route('/watch/')
# def hoi():
#     return 'Please go to the reception  /watch/reception'

@app.route('/watch/')
@app.route('/watch/reception/')
@auth.login_required
def showSurveys():

    lijst = listDirs(receptiondir)
    app.logger.warning('my name is %s', 'maarten')
    return render_template("surveys.html", lijst=lijst, dir="static/storage/reception/", title="Surveys")

@app.route('/watch/reception/<surveyid>/')
@auth.login_required
def showResponses(surveyid = None):

    # app.logger.info('surveyid ' + surveyid + "/")
    if (surveyid is not None and exists(receptiondir + surveyid + "/") ):
        app.logger.info('showResponses %s', surveyid)
        lijst = listDirs(receptiondir + surveyid + "/")
        return render_template("responses.html", lijst=lijst, surveyid=surveyid, title="Responses" )
    else:
        return 'nothing to see'

@app.route('/watch/reception/<surveyid>/<responseid>/')
@auth.login_required
def showSoundFiles(surveyid = None, responseid = None):
    # app.logger.info('surveyid ' + surveyid + "/")
    if (responseid is not None and surveyid is not None and exists(receptiondir + surveyid + "/" + responseid + "/")):
        app.logger.info('showSoundFiles %s %s', responseid, surveyid)
        
        lijststring = receptiondir + str(surveyid) + "/" + str(responseid) + "/"
        lijst = listFiles(lijststring)

        return render_template("soundfiles.html", surveyid=surveyid, responseid=responseid, lijst=lijst, dir=lijststring)
    else:       
        return 'go home'    

@app.route('/test/')
def hello():
    return 'hi!'

if __name__ == "__main__":
    app.run(debug=True)
    # app.logger.info("not main")

# else:
#     gunicorn_logger = logging.getLogger('gunicorn.error')
#     app.logger.handlers = gunicorn_logger.handlers
#     app.logger.setLevel(gunicorn_logger.level)



