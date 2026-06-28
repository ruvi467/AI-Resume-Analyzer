import pdfplumber

skills_database = [
    "Python",
    "Java",
    "C++",
    "JavaScript",
    "React",
    "HTML",
    "CSS",
    "FastAPI",
    "SQL",
    "Git",
    "Docker",
    "AWS",
    "MongoDB",
    "Machine Learning"
]

def extract_skills(pdf_path):

    text = ""

    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""

    # ADD THESE PRINTS HERE
    print("Extracted Text:")
    print(text[:1000])

    found_skills = []

    for skill in skills_database:
        if skill.lower() in text.lower():
            found_skills.append(skill)

    print("Found Skills:", found_skills)

    return found_skills