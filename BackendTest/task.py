import sys
from flask import Flask, jsonify
from models import db, Task, Skill
from flask_marshmallow import Marshmallow

from models import Member

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
        model = Task
        fields = ('id', 'name', 'skills')


class TaskDetailSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('id', 'name')


class SkillSchema(ma.Schema):
    class Meta:
        # Fields to expose
        model = Skill
        fields = ('id', 'name')


skill_schema = SkillSchema()
skill_schema = SkillSchema(many=True)
task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)


# querry for the db API

# endpoint to show all users
def skill_to_dict(x):
    result = dict()
    result["id"] = x.id
    result["name"] = x.name

    return result

def create_json_from_task(task):
    result = dict()
    result["id"] = task.id
    result["name"] = task.name
    skills = task.skills
    result["skills"] = [skill_to_dict(x) for x in skills]

    return result


def create_json_from_member(member):
    return create_json_from_task(member)  # same functionality, just a wrapper with proper name


@app.route("/task", methods=["GET"])
def get_tasks():
    all_tasks = Task.query.all()
    all_tasks_as_dict = [create_json_from_task(x) for x in all_tasks]

    return jsonify(all_tasks_as_dict)


@app.route("/task/<id>", methods=["GET"])
def get_task(id):
    task = Task.query.get(id)
    json_task = create_json_from_task(task)
    return json_task


@app.route("/members", methods=["GET"])
def get_all_members():
    all_members = Member.query.all()
    json_members = [create_json_from_member(x) for x in all_members]
    return jsonify(json_members)


@app.route("/members/<id>", methods=["GET"])
def get_member(id):
    member = Member.query.get(id)
    json_member = create_json_from_member(member)
    return json_member


# -------

# endpoint to update user
@app.route("/task/<id>", methods=["PUT"])
def task_update(id):
    task = Task.query.get(id)
    name = task.json['name']

    task.username = name

    db.session.commit()
    return task_schema.jsonify(task)


# endpoint to delete user
@app.route("/task/<id>", methods=["DELETE"])
def task_delete(id):
    task = Task.query.get(id)
    db.session.delete(task)
    db.session.commit()

    return task_schema.jsonify(task)


# RECOMMENDATION SYSTEM
def create_relative_member_mapping_map(member_rating_map):
    relative_map = dict()
    maximum_score = max(member_rating_map.values())

    for member, rating in member_rating_map.items():
        relative_map[member] = rating / maximum_score

    return relative_map


@app.route("/simple_recommendations/<task_id>", methods=["GET"])
def get_recommended_users_for_task(task_id):
    task = Task.query.get(task_id)
    all_members = Member.query.all()

    member_rating_map = dict()  # how well each member suits for this task
    task_skills = set(task.skill)

    for member in all_members:
        rating = len(member.skill.intersection(task_skills))
        member_rating_map[member.id] = rating

    relative_member_rating_map = create_relative_member_mapping_map(member_rating_map)

    return jsonify(relative_member_rating_map)


if __name__ == "__main__":
    app.run(debug=True)
