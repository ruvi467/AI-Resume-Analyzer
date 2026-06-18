def match_job(details, job_skills):
    matched = [skill for skill in details["Skills"] if skill in job_skills]
    percentage = (len(matched) / len(job_skills)) * 100

    return matched, percentage