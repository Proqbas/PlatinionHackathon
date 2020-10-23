import sys
from flask import Flask, jsonify
from models import db, Task

from BackendTest.models import Member

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///task.db"  # change to standalone db in future
db.init_app(app)


# querry for the db API

@app.route("/task")
def get_slug():
    id = request.args.get('id')
    if id is None:
        output = Task.query.all()
    else:
        output = Task.query.filterby(id).first
    """task = Task.query.filter(Task.slug == slug).first_or_404()
    output = {
        "name": task.name,
        "description": task.desc,
        "skills": task.skills,
    }"""
    return jsonify(output)





if __name__ == "__main__":
    app.run(debug=True)
