from app import app
from flask import render_template

@app.route('/')
@app.route('/index')
@app.route('/home')
@app.route('/projects')
def index():
    return render_template('home.html')

@app.route('/tron')
def tron():
    return render_template('tronGame.html')

@app.route('/tfTraining')
def tfTraining():
    return render_template('tfTraining.html')
