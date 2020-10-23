import sys
from flask import Flask, jsonify
from models import db, Task
from flask_marshmallow import Marshmallow

from BackendTest.models import Member

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///task.db"  # change to standalone db in future
db.init_app(app)
ma = Marshmallow(app)
class TaskSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('name')


task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)


# querry for the db API

# endpoint to show all users
@app.route("/task", methods=["GET"])
def get_task():
    all_users = Task.query.all()
    result = tasks_schema.dump(all_users)
    return jsonify(result.data)


# endpoint to get user detail by id
@app.route("/user/<id>", methods=["GET"])
def task_detail(id):
    user = Task.query.get(id)
    return task_schema.jsonify(user)

    """task = Task.query.filter(Task.slug == slug).first_or_404()
    output = {
        "name": task.name,
        "description": task.desc,
        "skills": task.skills,
    }"""
    return jsonify(output)





if __name__ == "__main__":
    app.run(debug=True)
