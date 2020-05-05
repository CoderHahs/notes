---
title: "SQL"
metaTitle: "SQL"
metaDescription: "Topics in SQL"
---

# Data Types
- INTEGER
- DECIMAL
- SERIAL (like an integer but its counts automatically)
- VARCHAR
- TIMESTAMP
- BOOLEAN
- ENUM
- ...

# CREATE TABLE
```SQL
create table flights (
  id serial primary key
, origin varchar not null
, destination varchar not null
, duration integer not null
);
```

## Constraints
- NOT NULL
- UNIQUE
- PRIMARY KEY
- DEFAULT
- CHECK

# INSERT INTO
```SQL
insert into flights (origin, destination, duration) values ('New York', 'London', 415)
```

# SELECT
```SQL
select * from flights limit 3
```
select everything from the flights table but only output the first 3 rows

```SQL
select * from flights where id = 3
```
returns row with id = 3

```SQL
select * from flights where origin = 'New York';
```
returns all flights with origin 'New York'

```SQL
select count(*) from flights where origin = 'Moscow';
```
returns the number of flights with origin is Moscow

```SQL
select * from flights where origin in ('New York', 'Moscow')
```
returns all flights with origin = New York or Moscow

```SQL
select * from flights where origin like '%a%';
```
returns all flight where origin has 'a' in it


# Functions
- SUM
- COUNT
- MIN
- MAX
- AVG
- ...

# UPDATE
```SQL
update flights
  set duration = 430
  where origin = 'New York'
  and destination = 'London';
```

# DELETE
```SQL
delete from flights where destination = 'Tokyo'
```

# ORDER BY
```SQL
select * from flights order by duration asc/;
```
sorts rows by duration ascending, for descending (desc)

# GROUP BY
```SQL
select origin, count(*) from flights group by origin having count(*) > 1;
```
returns origins grouped by count that have a count greater than 1

# Foreign Keys
a way to connect multiple tables together

```SQL
create table passengers (
  id serial primary key
, name varchar not null
, flights_id integer references flights
)
```

# JOIN

## Inner JOIN
```SQL
select
  origin
, destination
, name
from flights
join passengers
on passengers.flight_id = flights_id
```
## LEFT/RIGHT JOIN
returns all rows from left/right table
## OUTER JOIN
returns all rows from both tables

# Nested Queries (Personally think they are ugly)
```SQL
select * from flights where id in
(select flight_id from passengers group by flight_id having count(*) > 1);
```

# SQL Injection
```SQL
select * from users
where (username = 'hacker')
and (password = '1' OR '1' = '1')
```

# Race Conditions

SQL queries that run simultaneously might have problems for a database.

Solution: Transactions, lock the database while a transaction is occuring.

## SQL Transactions

- BEGIN
- COMMIT

# SQLAlchemy

```python
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import scope_session, sessionmaker

engine = create_engine(os.getenv("DATABASE_URL"))
db = scoped_session(sessionmaker(bind=engine))

def main():
  flights = db.execute("SELECT origin, destination, duration from flights").fetchall()
  for flight in flights:
    print(f"{flight.origin} to {flight.destination} {flight.duration} minutes." )

if __name__ == "__main__":
  main()
```
flights.csv
```csv
Paris,New York,540
Tokyo,Shanghai,185
Seoul,Mexico City,825
Mexico City,Lima,350
Hong Kong,Shanghai,130
```

```python
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import scope_session, sessionmaker

engine = create_engine(os.getenv("DATABASE_URL"))
db = scoped_session(sessionmaker(bind=engine))

def main():
  f = open("flights.csv")
  reader = csv.reader(f)
  for origin, destination, duration in reader:
    db.execute("INSERT INTO flights (origin, destination, duration) VALUES (:origin, :destination, :duration)",
    {"origin": origin, "destination": destination, "duration": duration})
    print(f"Added flight from {origin} to {destination} lasting {duration} minutes")
  db.commit()

if __name__ == "__main__":
  main()
```

# Merging into Flask
## Example 1 - Book a flight
application.py
```python
import os

from flask import Flask, render_template, request
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

app = Flask(__name__)

engine = create_engine(os.getenv("DATABASE_URL"))
db = scoped_session(sessionmaker(bind=engine))

@app.route("/")
def index():
    flights = db.execute("SELECT * FROM flights").fetchall()
    return render_template("index.html", flights=flights)

@app.route("/book", methods=["POST"])
def book():
    """Book a flight."""

    # Get form information.
    name = request.form.get("name")
    try:
        flight_id = int(request.form.get("flight_id"))
    except ValueError:
        return render_template("error.html", message="Invalid flight number.")

    # Make sure the flight exists.
    if db.execute("SELECT * FROM flights WHERE id = :id", {"id": flight_id}).rowcount == 0:
        return render_template("error.html", message="No such flight with that id.")
    db.execute("INSERT INTO passengers (name, flight_id) VALUES (:name, :flight_id)",
            {"name": name, "flight_id": flight_id})
    db.commit()
    return render_template("success.html")
```
layout.html
```html
<!DOCTYPE html>
<html>
    <head>
        <title>{% block title %}{% endblock %}</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css" integrity="sha384-Zug+QiDoJOrZ5t4lssLdxGhVrurbmBWopoEl+M6BdEfwnCJZtKxi1KgxUyJq13dy" crossorigin="anonymous">
    </head>
    <body>
        <div class="container">
            {% block body %}
            {% endblock %}
        </div>
    </body>
</html>
```
index.html
```html
{% extends "layout.html" %}

{% block title %}
    Flights
{% endblock %}

{% block body %}
    <h1>Book a Flight</h1>

    <form action="{{ url_for('book') }}" method="post">

        <div class="form-group">
            <select class="form-control" name="flight_id">
                {% for flight in flights %}
                    <option value="{{ flight.id }}">{{ flight.origin }} to {{ flight.destination }}</option>
                {% endfor %}
            </select>
        </div>

        <div class="form-group">
            <input class="form-control" name="name" placeholder="Passenger Name">
        </div>

        <div class="form-group">
            <button class="btn btn-primary">Book Flight</button>
        </div>

    </form>
{% endblock %}
```
success.html
```html
{% extends "layout.html" %}

{% block title %}
    Success!
{% endblock %}

{% block body %}
    <h1>Success!</h1>

    You have successfully booked your flight.
{% endblock %}
```
error.html
```html
{% extends "layout.html" %}

{% block title %}
    Error
{% endblock %}

{% block body %}
    <h1>Error</h1>

    {{ message }}
{% endblock %}
```

## Example 2 - List all Flights, Seeing information on flights
layout.html, success.html and error.html are the same from above example.

application.py
```python
import os

from flask import Flask, render_template, request
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

app = Flask(__name__)

engine = create_engine(os.getenv("DATABASE_URL"))
db = scoped_session(sessionmaker(bind=engine))

@app.route("/")
def index():
    flights = db.execute("SELECT * FROM flights").fetchall()
    return render_template("index.html", flights=flights)

@app.route("/book", methods=["POST"])
def book():
    """Book a flight."""

    # Get form information.
    name = request.form.get("name")
    try:
        flight_id = int(request.form.get("flight_id"))
    except ValueError:
        return render_template("error.html", message="Invalid flight number.")

    # Make sure flight exists.
    if db.execute("SELECT * FROM flights WHERE id = :id", {"id": flight_id}).rowcount == 0:
        return render_template("error.html", message="No such flight with that id.")
    db.execute("INSERT INTO passengers (name, flight_id) VALUES (:name, :flight_id)",
            {"name": name, "flight_id": flight_id})
    db.commit()
    return render_template("success.html")

@app.route("/flights")
def flights():
    """Lists all flights."""
    flights = db.execute("SELECT * FROM flights").fetchall()
    return render_template("flights.html", flights=flights)

@app.route("/flights/<int:flight_id>")
def flight(flight_id):
    """Lists details about a single flight."""

    # Make sure flight exists.
    flight = db.execute("SELECT * FROM flights WHERE id = :id", {"id": flight_id}).fetchone()
    if flight is None:
        return render_template("error.html", message="No such flight.")

    # Get all passengers.
    passengers = db.execute("SELECT name FROM passengers WHERE flight_id = :flight_id",
                            {"flight_id": flight_id}).fetchall()
    return render_template("flight.html", flight=flight, passengers=passengers)
```
index.html
```html
{% extends "layout.html" %}

{% block title %}
    Flights
{% endblock %}

{% block body %}
    <h1>Book a Flight</h1>

    <form action="{{ url_for('book') }}" method="post">

        <div class="form-group">
            <select class="form-control" name="flight_id">
                {% for flight in flights %}
                    <option value="{{ flight.id }}">{{ flight.origin }} to {{ flight.destination }}</option>
                {% endfor %}
            </select>
        </div>

        <div class="form-group">
            <input class="form-control" name="name" placeholder="Passenger Name">
        </div>

        <div class="form-group">
            <button class="btn btn-primary">Book Flight</button>
        </div>

    </form>
{% endblock %}
```
flight.html
```html
{% extends "layout.html" %}

{% block title %}
    Flight
{% endblock %}

{% block body %}
    <h1>Flight Details</h1>

    <ul>
        <li>Origin: {{ flight.origin }}</li>
        <li>Destination: {{ flight.destination }}</li>
        <li>Duration: {{ flight.duration}} minutes</li>
    </ul>

    <h2>Passengers</h2>
    <ul>
        {% for passenger in passengers %}
            <li>{{ passenger.name }}</li>
        {% else %}
            <li>No passengers.</li>
        {% endfor %}
    </ul>

{% endblock %}
```
flights.html
```html
{% extends "layout.html" %}

{% block title %}
    Flights
{% endblock %}

{% block body %}
    <h1>All Flights</h1>

    <ul>
        {% for flight in flights %}
            <li>
                <a href="{{ url_for('flight', flight_id=flight.id) }}">
                    {{ flight.origin }} to {{ flight.destination }}
                </a>
            </li>
        {% endfor %}
    </ul>

{% endblock %}
```
