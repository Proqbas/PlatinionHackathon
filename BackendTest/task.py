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
        fields = ('id', 'name', 'skills', 'status', 'assignee')


class TaskDetailSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('id', 'name', 'status', 'assignee')


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

def assignee_to_dict(x):
    result = dict()
    result["id"] = x.id
    result["name"] = x.name
    result["bio"] = x.bio

    return result


def skill_to_dict(x):
    result = dict()
    result["id"] = x.id
    result["name"] = x.name
    result["level"] = x.level

    return result


def task_to_dict(x):
    result = dict()
    result["id"] = x.id
    result["name"] = x.name
    result["desc"] = x.desc
    result["status"] = x.status

    return result


def create_json_from_task(task):
    result = dict()
    result["id"] = task.id
    result["name"] = task.name
    result["status"] = task.status
    result["desc"] = task.desc
    skills = task.skills
    result["skills"] = [skill_to_dict(x) for x in skills]
    assignees = task.assignee
    result["assignee"] = [assignee_to_dict(x) for x in assignees]

    return result


# endpoint to create new task
@app.route("/tasks", methods=["POST"])
def add_task():
    name = request.get_json(force=True)['name']
    desc = request.get_json(force=True)['desc']
    status = "OPEN"
    task = Task()
    task.name = name
    task.desc = desc
    task.status = status

    db.session.add(task)
    db.session.commit()

    return jsonify("OK")

# endpoint to create new member
@app.route("/members", methods=["POST"])
def add_members():
    name = request.get_json(force=True)['name']
    bio = request.get_json(force=True)['bio']

    member = Member()
    member.name = name
    member.bio = bio

    db.session.add(member)
    db.session.commit()

    return jsonify("OK")


# endpoint to create new skill
@app.route("/skills", methods=["POST"])
def add_skills():
    name = request.get_json(force=True)['name']

    skill = Skill()
    skill.name = name

    db.session.add(skill)
    db.session.commit()


def create_json_from_member(member):
    result = dict()
    result["id"] = member.id
    result["name"] = member.name
    result["bio"] = member.bio
    skills = member.skills
    result["skills"] = [skill_to_dict(x) for x in skills]
    assigned_to = member.assigned_to
    result["assigned_to"] = [task_to_dict(x) for x in assigned_to]

    return result


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
    name = request.get_json(force=True)['name']
    desc = request.get_json(force=True)['desc']
    status = request.get_json(force=True)['status']
    assignees = request.get_json(force=True)['assignee']

    for assignee in assignees:
        task.assignee.append(Member.query.get(assignee)) #TODO check if assignee is/must be an int

    task.name = name
    task.desc = desc
    task.status = status

    db.session.commit()

    return jsonify("OK")

# endpoint to delete task
@app.route("/tasks/<id>", methods=["DELETE"])
def task_delete(id):
    task = Task.query.get(id)
    db.session.delete(task)
    db.session.commit()
    json_task = create_json_from_task(task)

    return jsonify("OK")


# endpoint to update members
@app.route("/members/<id>", methods=["PUT"])
def members_update(id):
    members = Member.query.get(id)
    name = Member.json['name']

    members.name = name
    #TODO if we want to be able to add/delete tasks from member detail view it has to be coded here
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
    task_skills = set(task.skills)

    for member in all_members:
        rating = len(set(member.skills).intersection(task_skills))
        member_rating_map[member.id] = rating
    # preferences function
    relative_member_rating_map = create_relative_member_mapping_map(member_rating_map)

    return jsonify(relative_member_rating_map)


@app.route("/simple_recommendation/<id>", methods=["GET"])
def get_recommended_user_for_task(id):
    task = Task.query.get(id)
    all_members = Member.query.all()

    member_rating_map = dict()  # how well each member suits for this task
    task_skills = set(task.skills)

    for member in all_members:
        rating = len(set(member.skills).intersection(task_skills))
        member_rating_map[member.id] = rating
    # preferences function
    relative_member_rating_map = create_relative_member_mapping_map(member_rating_map)

    max_value = max(relative_member_rating_map.values())  # maximum value
    max_keys = [k for k, v in relative_member_rating_map.items() if v == max_value]  # getting all keys containing the `maximum`
    return create_json_from_member(Member.query.get(max_keys))


@app.route("/tasks/<id>/recommend", methods=["GET"])
def get_recommended_user_for_task_another_url(id):
    return get_recommended_user_for_task(id)

if __name__ == "__main__":
    app.run(debug=True)
