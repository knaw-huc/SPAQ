from flask import Flask, render_template
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return 'Flask with dockertje!'

@app.route('/receive/') # start slash and end slash essential
def receive():
    return 'message received'

@app.route('/upload/', methods = ['POST', 'GET']) # POST is not in the default. added GET for tests, OPTIONS is always possible
# @app.route('/upload/')
def upload():
    status = "OK"
    bashcmd = "fmpeg converted"
    returnvalue = 0
    returnvalues = {"storestatus" : status, "mp4conv" : {"bashcmd" : bashcmd, "return" : returnvalue}}
    # dump() 
    return json.dumps(returnvalues)


# is this necessary with Docker?

if __name__ == "__main__":
    app.run(debug=True)


