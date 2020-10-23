import sys
from flask import Flask, jsonify
from models import db, Task

from BackendTest.models import Member

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///task.db"
db.init_app(app)


@app.route("/<slug>")
def get_task(slug):
    task = Task.query.filter(Task.slug == slug).first_or_404()
    output = {
        "name": task.name,
        "description": task.desc,
        "skills": task.skills,
    }
    return jsonify(output)


if __name__ == "__main__":
    # if "createdb" in sys.argv:
    with app.app_context():
        db.create_all()
    print("Database created!")

    # elif "seeddb" in sys.argv:
    with app.app_context():
        t1 = Task(slug="creategit", name="CrateGit",
                  desc="desc1", skills="nan")
        db.session.add(t1)
        t2 = Task(slug="createui", name="CrateUI",
                  desc="desc2", skills="nan")
        db.session.add(t2)
        m1 = Member(slug="", name= )
        db.session.commit()
    print("Database seeded!")

    # else:
    app.run(debug=True)
