from flask import Flask, request, render_template
from flask_cors import CORS
import json
from datetime import datetime;

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return 'Flask with dockertje!'

@app.route('/receive/') # start slash and end slash essential
def receive():
    return 'message received'

@app.route('/upload/', methods = ['POST', 'GET']) # POST is not in the default. added GET for tests, OPTIONS is always possible
def upload():
    fplog = open('log/diagnostic.txt' , "a") # niet zoals bij php aw
    # fplog.write("hallo\n")
    
    blob = request.data
    xfilename = request.headers.get('x-filename')
    xtension = request.headers.get('x-tension')
    ct = datetime.now()
    currentTime = ct.strftime("-%Y-%m-%d-%H-%M-%S.%f")
    fplog.write(currentTime + "\n")

    if xfilename is not None and xtension is not None:
        filename = 'reception/' + xfilename  + currentTime + '.' + xtension

        fplog.write(filename + "\n")

        with open(filename, 'ab') as f:
            f.write(blob)
        status = "OK"
        bashcmd = "fmpeg converted"
        returnvalue = 0
        returnvalues = {"storestatus" : status, "mp4conv" : {"bashcmd" : bashcmd, "return" : returnvalue}}
        # dump() 
        return json.dumps(returnvalues)
    else:
        return 'geen fetch'    

@app.route('/watch/')
def watch():
    return '<h1>still watching...</h1>'

# app.add_url_rule('/watch/', '', watch)    # works also?
# https://stackoverflow.com/questions/45607711/what-is-the-endpoint-in-flasks-add-url-rule

# is this necessary with Docker?

if __name__ == "__main__":
    app.run(debug=True)


