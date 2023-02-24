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
    app.logger.info('lines: ', lines)
    app.logger.info(request.form)

    for idx, val in enumerate(lines):
        phrase = {"id" : idx + 1, "phrase": val}
        dictOfWords.insert(len(dictOfWords), phrase)
            
    app.logger.info("dict of words: ", dictOfWords)
    jason = json.dumps(dictOfWords,indent=4)



    translation_nl = {
        "record": "Opnemen",
        "stop": "Stoppen",
        "store": "Bewaar",
        "delete": "Verwijderen",
        "stored_succes": "is bewaard!"
    }    

    translation_en= {
       "record": "Record",
        "stop": "Stop",
        "store": "Store",
        "delete": "Delete",
        "stored_succes": "stored succesful!"
    }

    # translation = translation_en
    
    language = 'nl'
    language = request.form['language']
    if language not in ['nl', 'en', 'nl-informal']:
        language = 'en'

    if(language == 'en'):
        translation = translation_en
    else:
        translation = translation_nl    
    
    
#         Stop à Stoppen
# Store à Bewaren
# Delete à Verwijderen
# (schuur) stored succesful! à (schuur) is bewaard!
# Thank you! à Bedankt voor het meedoen!
    
    random =  request.form['random']
    if random not in ['true', 'false']:
        random = 'True'
  
    interrupt =  request.form['interrupt']
    if interrupt not in ['true', 'false']:
        interrupt = 'True'

    app.logger.info("interrupt ", interrupt)

    timelimit = request.form.get('timelimit', type=int) # get does not refer to the method of the form
    app.logger.info('timelimit: ' + request.form['timelimit'])
    if timelimit is None or timelimit > 60:
        timelimit = 10
    maxrecordingtime = 1000 * timelimit # in miliseconds when using get as method to request.form you can cast the type https://stackoverflow.com/questions/12551526/cast-flask-form-value-to-int

    questiontext = request.form['questiontext'] # todo safety or in template
    if questiontext == '' or len(questiontext) > 150:
        questiontext = 'Hier klopt iets niet'

    endtext = request.form['endtext'] # todo safety or in template
    if endtext == '':
        endtext = ' '

    # these parameters end up from the webform, in the ninja template audioapp.html

    question = {
        "language": language,
        "interrupt": interrupt,
        "random": random,
        "endpoint": endpoint,
        "maxrecordingtime": maxrecordingtime,
        "questiontext": questiontext,
        "endtext": endtext,
        "dictOfWords" : jason,
        "translation" : translation
    }

    mode = request.form['mode'] # todo safety or in template

    app.logger.info('mode: ' + request.form['mode'])

    if mode == 'limesurvey':
        template = render_template("limesurvey_choosewords.lsq", question=question)
        r = make_response(template)
        r.headers.set('Content-Type', 'text/xml; charset=utf-8')
        r.headers.set('Content-Disposition', 'attachment; filename="limesurveyquestion.lsq"')
        return r
    else:
        template = render_template("test.html", question=question)
        r = make_response(template)
        r.headers.set('Content-Type', 'text/html; charset=utf-8')
        r.headers.set('Content-Disposition', 'attachment; filename="test.html"')
        return r
  

    # r.headers.set('Content-Type', 'text/xml; charset=utf-8')
    # return r




    r.headers.set('Content-Type', 'text/xml; charset=utf-8')
    r.headers.set('Content-Disposition', 'attachment; filename="limesurveyquestion.lsq"')
    return r


@app.route('/submitwordlist/', methods=['GET']) # VIEW upload form
def submitwordlist():
    # return "hoi"
    # app.logger.info('test')

    return render_template("uploadwordlist.html")

if __name__ == "__main__":

    app.run(debug=True)

