from flask import Flask, request, render_template, make_response
from flask.json import jsonify
from flask_cors import CORS
from datetime import datetime;
from os import listdir, makedirs
from os.path import isfile, join, exists
from mputility import listFiles, listDirs
import json

app = Flask(__name__)
CORS(app)

receptiondir = 'static/reception/'

# app.static_folder = 'static'
@app.route('/')
def home():
    app.logger.info('Processing default request') 
    return 'Flask with dockertje!'

@app.route('/subsmith/', methods = ['POST', 'GET']) # start slash and end slash essential
def subsmith():
    id = None
    dictOfWords = []
    if request.method == 'POST' and 'id' in request.form:
        id = request.form['id']
        words = request.form['words']
        wordslist = words.split(',')

        for idx, val in enumerate(wordslist):
            print(idx)
            phrase = {"id" : idx + 1, "phrase": val}
            dictOfWords.insert(len(dictOfWords), phrase)
            
        app.logger.info(dictOfWords)


        # jason = jsonify(dictOfWords)
        jason = json.dumps(dictOfWords,indent=4)
        # https://docs.python.org/3/library/json.html

        # return jason # for test


    elif request.method == 'GET' and 'id' in request.args: # for easy test
        id = request.args['id']

    if id is None:
        return "nothing subsmithed"
    else:            
        # return 'form subsmithed, you can collect your .lsq with id: ' + id + 'file on '
        r = make_response(render_template("limesurvey_choosewords.lsq", id=id, dictOfWords=jason))
        r.headers.set('Content-Type', 'text/xml; charset=utf-8')
        r.headers.set('Content-Disposition', 'attachment; filename="limesurveyquestion.lsq"')
        # return render_template("limesurvey_choosewords.lsq", id=id)
        return r


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
        lijst = listDirs(receptiondir)

        return render_template("listresponses.html", lijst=lijst, dir=receptiondir )

 

@app.route('/createquestion/')
def createquestion():
    return render_template("audioquestion.html", a=1)


@app.route('/getphrases/')
def getphrases():
    file = open('static/testjsons/quiz.json', 'r');
    content = file.read()
    return content, {'Content-Type': 'Application/json; charset=utf-8'}


# app.add_url_rule('/watch/', '', watch)    # works also?
# https://stackoverflow.com/questions/45607711/what-is-the-endpoint-in-flasks-add-url-rule

# is this necessary with Docker?

if __name__ == "__main__":
    # app.config['TEMPLATES_AUTO_RELOAD'] = True
    # app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
    app.run(debug=True)


