from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    slug = db.Column(db.String(64), index=True)
    name = db.Column(db.String(64), nullable=False)
    desc = db.Column(db.String(128), nullable=True)
    skills = db.Column(db.String(128), nullable=True)


class Member(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    slug = db.Column(db.String(64), index=True)
    name = db.Column(db.String(64), nullable=False)
