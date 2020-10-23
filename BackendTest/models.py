from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

wantedSkills = db.Table('wantedSkills',
                        db.Column('task_id', db.Integer, db.ForeignKey('task.id')),
                        db.Column('skill_id', db.Integer, db.ForeignKey('skill.id')),
                        )

givenSkills = db.Table('availableSkills',
                       db.Column('member_id', db.Integer, db.ForeignKey('member.id')),
                       db.Column('skill_id', db.Integer, db.ForeignKey('skill.id')),
                       )


class Task(db.Model):
    __tablename__ = 'task'
    RELATIONSHIPS_TO_DICT = True

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    desc = db.Column(db.String(256), nullable=True)


class Member(db.Model):
    __tablename__ = 'member'
    RELATIONSHIPS_TO_DICT = True

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    bio = db.Column(db.String(512), nullable=True)


class Skill(db.Model):
    __tablename__ = 'skill'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    given = db.relationship('Member', secondary=givenSkills, backref=db.backref('skills'))
    needed = db.relationship('Task', secondary=wantedSkills, backref=db.backref('skills'))
