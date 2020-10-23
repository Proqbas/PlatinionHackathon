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
    s2 = Skill(name="finance")
    db.session.add(s2)
    s3 = Skill(name="sql")
    db.session.add(s3)
    s4 = Skill(name="thinking")
    db.session.add(s4)

    t1 = Task(name="CrateGit", desc="Collab is usefull, less work for me" )
    db.session.add(t1)
    t2 = Task(name="CrateUI", desc="Frontend with buttons")
    db.session.add(t2)
    t3 = Task(name="Budgeting", desc="Something important with money")
    db.session.add(t3)
    t4 = Task(name="CreateDB", desc="Create a Database")
    db.session.add(t4)
    t5 = Task(name="Ideating", desc="Think about something new")
    db.session.add(t5)
    m1 = Member(name="Lieschen-Müller")
    db.session.add(m1)
    m2 = Member(name="Max-Mustermann")
    db.session.add(m2)
    m3 = Member(name="Firstname-Lastname")
    db.session.add(m3)
    db.session.commit()
    #---

    m1.skills.append(s1)
    m1.skills.append(s3)
    m2.skills.append(s2)
    m3.skills.append(s4)
    t1.skills.append(s1)
    t1.skills.append(s3)
    t2.skills.append(s1)
    t3.skills.append(s2)
    t4.skills.append(s3)
    t5.skills.append(s4)
    #---
    db.session.commit()
print("Database seeded!")
