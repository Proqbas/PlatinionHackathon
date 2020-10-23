from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Table, Column, ForeignKey, Integer

from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
db = SQLAlchemy()

association_table = Table('association', Base.metadata,
                          db.Column('left_id', db.Integer, db.ForeignKey('left.id')),
                          db.Column('right_id', db.Integer, db.ForeignKey('right.id'))
                          )


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    desc = db.Column(db.String(128), nullable=True)
    skill = db.relationship("Skill",
                         secondary=association_table)


class Member(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    skill = db.relationship("Skill",
                         secondary=association_table)


class Skill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    tasks = db.relationship(
        "Task",
        secondary=association_table,
        back_populates="children")
    members = db.relationship(
        "Member",
        secondary=association_table,
        back_populates="children")
