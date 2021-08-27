''' Question template maker '''

from flask import Flask, request, render_template, make_response, flash, redirect
# from flask_httpauth import HTTPBasicAuth
from flask_cors import CORS
import json

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
    uploaded_file = request.files['file'].read()
    uploaded_file = str(uploaded_file, 'utf-8') # comes in as a binary string, have to convert it
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
  


    r = make_response(render_template("limesurvey_choosewords.lsq", language=language, random=random, dictOfWords=jason))
    r.headers.set('Content-Type', 'text/xml; charset=utf-8')
    r.headers.set('Content-Disposition', 'attachment; filename="limesurveyquestion.lsq"')
    return r


@app.route('/submitwordlist/', methods=['GET']) # VIEW upload form
def submitwordlist():
    return render_template("uploadwordlist.html")

if __name__ == "__main__":

    app.run(debug=True)

