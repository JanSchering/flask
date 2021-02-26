from app import app
from flask import render_template

@app.route('/')
@app.route('/index')
def index():
    return render_template('canvasTemplate.html')


@app.route('/test')
def test():
    return render_template('reactTest.html')
