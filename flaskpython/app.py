from flask import Flask, request, render_template
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
def upload():
    fplog = open('log/diagnostic.txt' , "a") # niet zoals bij php aw
    # fplog.write("hallo\n")
    
    blob = request.data
    filename = request.headers.get('x-filename')
    extension = request.headers.get('x-tension')

    if filename is not None and extension is not None:
        fplog.write(filename + "\n")

        with open('reception/' + filename + extension, 'ab') as f:
            f.write(blob)
        status = "OK"
        bashcmd = "fmpeg converted"
        returnvalue = 0
        returnvalues = {"storestatus" : status, "mp4conv" : {"bashcmd" : bashcmd, "return" : returnvalue}}
        # dump() 
        return json.dumps(returnvalues)


# is this necessary with Docker?

if __name__ == "__main__":
    app.run(debug=True)


