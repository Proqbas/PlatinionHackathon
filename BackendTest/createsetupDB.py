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
    s4 = Skill(name="critical thinking", level=3)
    db.session.add(s4)
    s5 = Skill(name="react", level=4)
    db.session.add(s5)
    s6 = Skill(name="scrum master", level=5)
    db.session.add(s6)
    s7 = Skill(name="sap consulting", level=5)
    db.session.add(s7)
    s8 = Skill(name="abap", level=5)
    db.session.add(s8)

    t1 = Task(name="Create Git", desc="We need to create a microservice for calulating the amount of materials that we will have to use in production. We have to use cloud environment for this task. It can use MachineLearning algorithms to utilize our past data. While working on this service we should focus on high-availability.", status="OPEN")
    db.session.add(t1)
    t2 = Task(name="Create UI", desc="Frontend with buttons", status="DONE")
    db.session.add(t2)
    t3 = Task(name="Budgeting", desc="Something important with money", status="OPEN")
    db.session.add(t3)
    t4 = Task(name="Create DB", desc="Create a Database", status="OPEN")
    db.session.add(t4)
    t5 = Task(name="Ideating", desc="Think about something new", status="OPEN")
    db.session.add(t5)
    t6 = Task(name="SAP customizing", desc="Create custom transaction", status="OPEN")
    db.session.add(t6)

    m1 = Member(name="Joanna", bio="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.")
    db.session.add(m1)
    m2 = Member(name="Magnus", bio="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.")
    db.session.add(m2)
    m3 = Member(name="Luca", bio="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.")
    db.session.add(m3)
    m4 = Member(name="Maria", bio="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.")
    db.session.add(m4)
    m5 = Member(name="Stefen", bio="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.")
    db.session.add(m5)

    db.session.commit()
    #---

    m1.skills.append(s1)
    m1.skills.append(s3)
    m1.skills.append(s5)
    m2.skills.append(s2)
    m2.skills.append(s4)
    m3.skills.append(s4)
    m4.skills.append(s4)
    m4.skills.append(s6)
    m5.skills.append(s7)
    m5.skills.append(s8)

    t4.skills.append(s1)
    t4.skills.append(s3)

    t2.skills.append(s1)
    t2.skills.append(s5)

    t3.skills.append(s2)
    t3.skills.append(s4)

    t1.skills.append(s4)
    t1.skills.append(s6)

    t5.skills.append(s4)

    t6.skills.append(s7)
    t6.skills.append(s8)

    m3.assigned_to.append(t5)
    #---
    db.session.commit()
print("Database seeded!")
