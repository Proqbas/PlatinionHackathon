from models import db, Task, Member, Skill
from task import app
# if "createdb" in sys.argv:
with app.app_context():
    db.create_all()
print("Database created!")

# elif "seeddb" in sys.argv:
with app.app_context():

    s1 = Skill(name="python")
    db.session.add(s1)
    s2 = Skill(name="java")
    db.session.add(s2)

    t1 = Task(name="CrateGit", desc="desc1" )
    db.session.add(t1)
    t2 = Task(name="CrateUI", desc="desc2")
    db.session.add(t2)
    m1 = Member(name="Mem1")
    db.session.add(m1)
    m2 = Member(name="Mem2")
    db.session.add(m2)
    db.session.commit()
    #---

    m1.skills.append(s1)
    m1.skills.append(s2)
    t1.skills.append(s1)
    t1.skills.append(s2)
    #---
    db.session.commit()
print("Database seeded!")
