from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Table, Column, ForeignKey, Integer

from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base


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
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    desc = db.Column(db.String(128), nullable=True)
    skills = db.relationship('Skill', secondary=wantedSkills, backref=db.backref('needed'))


class Member(db.Model):
    __tablename__ = 'member'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    skills = db.relationship('Skill', secondary=givenSkills, backref=db.backref('given'))


class Skill(db.Model):
    __tablename__ = 'skill'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
