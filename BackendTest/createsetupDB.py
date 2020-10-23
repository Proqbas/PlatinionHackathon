from models import db, Task, Member
from task import app
# if "createdb" in sys.argv:
with app.app_context():
    db.create_all()
print("Database created!")

# elif "seeddb" in sys.argv:
with app.app_context():
    t1 = Task(slug="creategit", name="CrateGit",
              desc="desc1")
    db.session.add(t1)
    t2 = Task(slug="createui", name="CrateUI",
              desc="desc2")
    db.session.add(t2)
    m1 = Member(slug="member1", name="Mem1")
    db.session.add(m1)
    m2 = Member(slug="member2", name="Mem2")
    db.session.add(m2)
    db.session.commit()
print("Database seeded!")
