---
title: "Flask"
metaTitle: "Flask"
metaDescription: "Topics in Flask"
---

# Intro to Python

- already know the basics

## Importing from other files
```Python
from functions import square
```
from the file functions.py you import the function 'square'

```Python
if __name__ == "_main_":
  main()
```
if currently running this particular file, run the 'main' function

## Python Classes
```Python
class Point:
  def __init__(self, x, y):
    self.x = x
    self.y = y
```

# Flask

## Configuration
**application.py**
```Python
from flask import flask

app = Flask(__name__)

@app.route("/")
def index():
  return "Hello, world!"
```

To run the program and create a server:
1. go to directory of application.py
2. run ```$ flask run```

## Routing
```Python
from flask import flask

app = Flask(__name__)

@app.route("/")
def index():
  return "Hello, world!"

@app.route("/hrithik")
def hrithik():
  return "Hello, Hrithik!"
```

## Smart Routing
```Python
from flask import flask

app = Flask(__name__)

@app.route("/")
def index():
  return "Hello, world!"

@app.route("/<string:name>")
def hello(name):
  return "Hello " + name + "!"
```

## render_template
```Python
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
  return render_template("index.html")
```
flask will only look for 'index.html' under a folder called templates

## Passing variables
```Python
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
  headline = "Hello"
  return render_template("index.html", headline = headline)
```
```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Website!</title>
  </head>
  <body>
    <h1>{{headline}}</h1>
  </body>
</html>
```
{{}}  comes from Jinja2 syntax, a templating language used by Flask

## If statements in HTML files
```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Website!</title>
  </head>
  <body>
    {% if new_year %}
      <h1>Yes! Happy new year</h1>
    {% else %}
      <h1>NO</h1>
  </body>
</html>
```
this is very similar to Ruby on Rails

## for loops
```HTML
<html>
  ...
    <ul>
      {% for name in names %}
      <li> {{ name }}</li>
      {% endfor %}
    </ul>
  ...
</html>
```

## links for urls
```HTML
<html>
  ...
    <a href="{{ url_for('index') }}"> index</a>
  ...
</html>
```
renders the page returned by the 'index' function

# Template Inheritance
have a layout.html file in templates folder

```HTML
<!DOCTYPE html>
<html>
  <head>
    <title>My Website!</title>
  </head>
  <body>
    <h1>{% block heading %}{% endblock %}</h1>

    {% block body %}
    {% endblock %}
  </body>
</html>
```
That block code tells the program that some html code could go between that.

## Post Requests
```html
{% extends "layout.html" %}

{% block heading %}
  First page
{% endblock %}

{% block body %}
  <form action ="{{url_for('hello')}}" method ="post">
    <input type="text" name="name" placeholder="Enter Your Name">
    <button> Submit</button>
  </form>
{% endblock %}
```
```Python
from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/")
def index():
  return render_template("index.html")

@app.rout("/hello", methods=["POST"])
def hello():
  name = request.form.get("name")
  return render_template("hello.html", name=name)
```
methods["POST"] makes it so that the method can only be called through POST Requests

## Get Requests
```Python
from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/")
def index():
  return render_template("index.html")

@app.rout("/hello", methods=["GET", "POST"])
def hello():
  if request.method == "GET":
    return "Please submit form instead."
  else:
    name = request.form.get("name")
    return render_template("hello.html", name=name)
```

## Sessions
```Python
from flask import Flask, render_template, request, session
from flask_session import Session

app = Flask (__name__)

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

@app.route("/", methods=['GET', 'POST'])
def index():
  if session.get("notes") is None:
    session['notes'] = []
  if request.method == "POST":
    note = request.form.get("note")
    session['notes'].append(note)

  return render_template("index.html", notes=session['notes'])
```
