from flask import Flask, request, render_template, make_response, flash, redirect
from flask.helpers import url_for
from flask.json import jsonify
from flask_cors import CORS
from datetime import datetime;
from os import listdir, makedirs
from os.path import isfile, join, exists
from mputility import listFiles, listDirs
from werkzeug.utils import secure_filename
import json
import logging

app = Flask(__name__)
CORS(app)


# gunicorn_logger = logging.getLogger('gunicorn.error')
# app.logger.handlers = gunicorn_logger.handlers



receptiondir = 'static/reception/'
app.config['UPLOAD_FOLDER'] = './static/uploads/'
# app.config['UPLOAD_FOLDER'] = 'testopvang/'
app.secret_key = 'super secret key'
app.config['MAX_CONTENT_LENGTH'] = 1024 * 1024 # max: 1MB, 10s ogg = 125MB, mp4 = 233MB, webm = 48MB



@app.before_request
def log_request():
    logline = request.method + " " + request.full_path
    app.logger.info(logline)
    return None



# app.static_folder = 'static'
@app.route('/')
def home():
    return 'Flask with dockertje!'

@app.route('/upload/', methods = ['POST', 'GET']) # POST is not in the default. added GET for tests, OPTIONS is always possible
def upload(): #uploaded soundblob from js client
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

        if exists(filename):
            status = "OK"
        else:
            status = "NOT OK"            
        
        returnvalues = {"storestatus" : status} 
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
        lijst = listDirs(receptiondir)
        return render_template("listresponses.html", lijst=lijst, dir=receptiondir )

@app.route('/processwordlist/', methods=['POST'])
def processwordlist():
    uploaded_file = request.files['file'].read()
    uploaded_file = str(uploaded_file, 'utf-8') # comes in as a binary string, have to convert it
    lines = uploaded_file.splitlines()
    dictOfWords = []
    app.logger.info(lines)
    for idx, val in enumerate(lines):
        phrase = {"id" : idx + 1, "phrase": val}
        dictOfWords.insert(len(dictOfWords), phrase)
            
    app.logger.info(dictOfWords)
    jason = json.dumps(dictOfWords,indent=4)
    id = 999 # example
    r = make_response(render_template("limesurvey_choosewords.lsq", id=id, dictOfWords=jason))
    r.headers.set('Content-Type', 'text/xml; charset=utf-8')
    r.headers.set('Content-Disposition', 'attachment; filename="limesurveyquestion.lsq"')
    return r


@app.route('/submitwordlist/', methods=['GET']) # VIEW upload form
def submitwordlist():
    return render_template("uploadwordlist.html")

if __name__ == "__main__":
    # app.config['UPLOAD_FOLDER'] = './static/uploads/'
    # app.config['TEMPLATES_AUTO_RELOAD'] = True
    # app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
    app.run(debug=True)
# else:
    # gunicorn_logger = logging.getLogger('gunicorn.error')
    # app.logger.handlers = gunicorn_logger.handlers
    # app.logger.setLevel(gunicorn_logger.level)



