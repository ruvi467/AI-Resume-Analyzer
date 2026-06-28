from extract_text import extract_text
from parser import parse_resume
from resume_score import calculate_score


text = extract_text("sample_resume.pdf")

details = parse_resume(text)

score = calculate_score(details)

print("Resume Details")
print(details)

print("\nResume Score:", score, "/100")

from suggestions import get_suggestions

suggestions = get_suggestions(details)

print("\nSuggestions:")
for s in suggestions:
    print("-", s)

    from job_match import match_job

job_skills = ["Python", "SQL", "MySQL", "Flask", "Git"]

matched, percentage = match_job(details, job_skills)

print("\nJob Match")
print("Matched Skills:", matched)
print("Match Percentage:", percentage, "%")