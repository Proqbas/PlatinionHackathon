from models import db, Task, Member, Skill
from task import app
# if "createdb" in sys.argv:
with app.app_context():
    db.create_all()
print("Database created!")

# elif "seeddb" in sys.argv:
with app.app_context():

    s1 = Skill(name="python", level=5)
    db.session.add(s1)
    s2 = Skill(name="finance", level=2)
    db.session.add(s2)
    s3 = Skill(name="sql", level=4)
    db.session.add(s3)
    s4 = Skill(name="thinking", level=3)
    db.session.add(s4)

    t1 = Task(name="CreateGit", desc="Collab is usefull, less work for me", status="OPEN")
    db.session.add(t1)
    t2 = Task(name="CreateUI", desc="Frontend with buttons", status="DONE")
    db.session.add(t2)
    t3 = Task(name="Budgeting", desc="Something important with money", status="OPEN")
    db.session.add(t3)
    t4 = Task(name="CreateDB", desc="Create a Database", status="OPEN")
    db.session.add(t4)
    t5 = Task(name="Ideating", desc="Think about something new", status="OPEN")
    db.session.add(t5)
    m1 = Member(name="Lieschen-Mueller", bio="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.")
    db.session.add(m1)
    m2 = Member(name="Max-Mustermann", bio="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.")
    db.session.add(m2)
    m3 = Member(name="Firstname-Lastname", bio="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.")
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

    m3.assigned_to.append(t5)
    #---
    db.session.commit()
print("Database seeded!")
