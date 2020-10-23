import operator
import sys
from flask import Flask, jsonify, request
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
skills_schema = SkillSchema(many=True)
task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)


# querry for the db API

# endpoint to show all tasks
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


# endpoint to create new task
@app.route("/tasks", methods=["POST"])
def add_task():
    name = request.json['name']
    desc = request.json['desc']

    task = Task(name, desc)

    db.session.add(task)
    db.session.commit()


# endpoint to create new member
@app.route("/members", methods=["POST"])
def add_members():
    name = request.json['name']

    member = Member(name)

    db.session.add(member)
    db.session.commit()


# endpoint to create new skill
@app.route("/skills", methods=["POST"])
def add_skills():
    name = request.json['name']

    skill = Skill(name)

    db.session.add(skill)
    db.session.commit()


def create_json_from_member(member):
    return create_json_from_task(member)  # same functionality, just a wrapper with proper name


@app.route("/tasks", methods=["GET"])
def get_tasks():
    all_tasks = Task.query.all()
    all_tasks_as_dict = [create_json_from_task(x) for x in all_tasks]

    return jsonify(all_tasks_as_dict)


@app.route("/tasks/<id>", methods=["GET"])
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


@app.route("/skills", methods=["GET"])
def get_all_skills():
    all_skills = Skill.query.all()
    result = skills_schema.dump(all_skills)
    return jsonify(result)


@app.route("/skills/<id>", methods=["GET"])
def get_skill(id):
    skill = Skill.query.get(id)

    return jsonify(skill_schema.dump(skill))


# -------

# endpoint to update task
@app.route("/tasks/<id>", methods=["PUT"])
def task_update(id):
    task = Task.query.get(id)
    name = task.json['name']
    desc = task.json['desc']

    task.name = name
    task.desc = desc

    db.session.commit()


# endpoint to delete task
@app.route("/tasks/<id>", methods=["DELETE"])
def task_delete(id):
    task = Task.query.get(id)
    db.session.delete(task)
    db.session.commit()
    json_task = create_json_from_task(task)
    return json_task


# endpoint to update members
@app.route("/members/<id>", methods=["PUT"])
def members_update(id):
    members = Member.query.get(id)
    name = Member.json['name']

    members.name = name

    db.session.commit()


# endpoint to delete members
@app.route("/members/<id>", methods=["DELETE"])
def members_delete(id):
    members = Member.query.get(id)
    db.session.delete(members)
    db.session.commit()
    json_member = create_json_from_member(members)
    return json_member


# endpoint to update skills
@app.route("/skills/<id>", methods=["PUT"])
def skills_update(id):
    skills = Skill.query.get(id)
    name = Member.json['name']

    skills.name = name

    db.session.commit()


# endpoint to delete skills
@app.route("/skills/<id>", methods=["DELETE"])
def skills_delete(id):
    skills = Skill.query.get(id)
    db.session.delete(skills)
    db.session.commit()

    return jsonify(skill_schema.dump(skills))


@app.route("/skill/<skill_id>/member/<member_id>", methods=["POST"])
def add_skill_to_member(skill_id, member_id):
    member = Member.query.get(member_id)
    member.skills.append(Skill.query.get(skill_id))
    db.session.commit()

    return jsonify("OK")


@app.route("/member/<member_id>/skill/<skill_id>", methods=["POST"])
def add_skill_to_member_different_url(skill_id, member_id):
    return add_skill_to_member(skill_id, member_id)


@app.route("/skill/<skill_id>/task/<task_id>", methods=["POST"])
def add_skill_to_task(skill_id, task_id):
    task = Task.query.get(task_id)
    task.skills.append(Skill.query.get(skill_id))
    db.session.commit()

    return jsonify("OK")


@app.route("/task/<task_id>/skill/<skill_id>", methods=["POST"])
def add_skill_to_task_different_url(skill_id, task_id):
    return add_skill_to_task(skill_id, task_id)


# RECOMMENDATION SYSTEM
def create_relative_member_mapping_map(member_rating_map):
    relative_map = dict()
    maximum_score = max(member_rating_map.values())

    for member, rating in member_rating_map.items():
        if maximum_score == 0:
            relative_map[member] = 0
        else:
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
    # preferences function
    relative_member_rating_map = create_relative_member_mapping_map(member_rating_map)

    return jsonify(relative_member_rating_map)


@app.route("/simple_recommendation/<id>", methods=["GET"])
def get_recommended_user_for_task(id):
    task = Task.query.get(id)
    all_members = Member.query.all()

    member_rating_map = dict()  # how well each member suits for this task
    task_skills = set(task.skill)

    for member in all_members:
        rating = len(member.skill.intersection(task_skills))
        member_rating_map[member.id] = rating
    # preferences function
    relative_member_rating_map = create_relative_member_mapping_map(member_rating_map)

    return jsonify(max(relative_member_rating_map.iteritems(), key=operator.itemgetter(1))[0])


if __name__ == "__main__":
    app.run(debug=True)
