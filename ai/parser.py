import re

def parse_resume(text):
    details = {}

    email = re.search(r'[\w\.-]+@[\w\.-]+\.\w+', text)
    details["Email"] = email.group() if email else "Not Found"

    phone = re.search(r'(\+91[\s-]?)?[6-9]\d{9}', text)
    details["Phone"] = phone.group() if phone else "Not Found"

    skills = ["Python", "Java", "HTML", "CSS", "JavaScript", "SQL", "MySQL"]
    details["Skills"] = [skill for skill in skills if skill.lower() in text.lower()]

    return details