import sys
from flask import Flask, jsonify
from models import db, Task
from flask_marshmallow import Marshmallow

from BackendTest.models import Member

# --------
app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///task.db"  # change to standalone db in future
db.init_app(app)
ma = Marshmallow(app)


class MemberSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name')


member_schema = MemberSchema()
members_schema = MemberSchema(many=True)


class TaskSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('id', 'name')


task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)


# querry for the db API

# endpoint to show all users
@app.route("/task", methods=["GET"])
def get_task():
    all_users = Task.query.all()
    result = tasks_schema.dump(all_users)
    return jsonify(result)


# endpoint to get user detail by id
@app.route("/task/<id>", methods=["GET"])
def task_detail(id):
    task = Task.query.get(id)
    return task_schema.jsonify(task)


@app.route("/members", methods=["GET"])
def get_all_members():
    all_members = Member.query.all()
    result = members_schema.dump(all_members)
    return jsonify(result)


# -------

# endpoint to update user
@app.route("/user/<id>", methods=["PUT"])
def user_update(id):
    task = Task.query.get(id)
    name = request.json['name']

    task.username = name

    db.session.commit()
    return task_schema.jsonify(task)


# endpoint to delete user
@app.route("/user/<id>", methods=["DELETE"])
def user_delete(id):
    task = Task.query.get(id)
    db.session.delete(task)
    db.session.commit()

    return task_schema.jsonify(task)


if __name__ == "__main__":
    app.run(debug=True)
