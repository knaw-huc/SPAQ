''' Question template maker '''

from flask import Flask, request, render_template, make_response, flash, redirect
# from flask_httpauth import HTTPBasicAuth
from flask_cors import CORS
import json
from os import environ


app = Flask(__name__)
CORS(app)


# gunicorn_logger = logging.getLogger('gunicorn.error')
# app.logger.handlers = gunicorn_logger.handlers

receptiondir = 'static/storage/reception/'
app.config['UPLOAD_FOLDER'] = './static/uploads/'
# app.config['UPLOAD_FOLDER'] = 'testopvang/'
app.secret_key = 'super secret key'
app.config['MAX_CONTENT_LENGTH'] = 1024 * 1024 # max: 1MB, 10s ogg = 125MB, mp4 = 233MB, webm = 48MB




# app.static_folder = 'static'
@app.route('/')
def home():
    return 'Flask with dockertje!'



@app.route('/processwordlist/', methods=['POST'])
def processwordlist():
    if "AUDIOENDPOINT" in environ:
        endpoint = environ['AUDIOENDPOINT']
    else:
        endpoint = 'UNDEFINED' # probably something else or fail 

    uploaded_file = request.files['file'].read()
    uploaded_file = str(uploaded_file, 'utf-8') # comes in as a binary file, have to convert it
    lines = uploaded_file.splitlines()
    dictOfWords = []
    # app.logger.info(lines)
    app.logger.info(request.form)

    for idx, val in enumerate(lines):
        phrase = {"id" : idx + 1, "phrase": val}
        dictOfWords.insert(len(dictOfWords), phrase)
            
    app.logger.info(dictOfWords)
    jason = json.dumps(dictOfWords,indent=4)


    language = request.form['language']
    if language not in ['nl', 'en', 'nl-informal']:
        language = 'en'

    random =  request.form['random']
    if random not in ['true', 'false']:
        random = 'True'
  
    timelimit = request.form.get('timelimit', type=int) # get does not refer to the method of the form
    app.logger.info('timelimit: ' + request.form['timelimit'])
    if timelimit is None or timelimit > 60:
        timelimit = 10
    maxrecordingtime = 1000 * timelimit # in miliseconds when using get as method to request.form you can cast the type https://stackoverflow.com/questions/12551526/cast-flask-form-value-to-int

    r = make_response(render_template("limesurvey_choosewords.lsq", language=language, random=random, dictOfWords=jason, endpoint=endpoint, maxrecordingtime=maxrecordingtime))
    r.headers.set('Content-Type', 'text/xml; charset=utf-8')
    r.headers.set('Content-Disposition', 'attachment; filename="limesurveyquestion.lsq"')
    return r


@app.route('/submitwordlist/', methods=['GET']) # VIEW upload form
def submitwordlist():
    # return "hoi"
    return render_template("uploadwordlist.html")

if __name__ == "__main__":

    app.run(debug=True)

