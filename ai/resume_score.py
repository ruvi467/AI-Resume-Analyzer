def calculate_score(details):
    score = 0

    if details["Email"] != "Not Found":
        score += 20

    if details["Phone"] != "Not Found":
        score += 20

    score += min(len(details["Skills"]) * 10, 60)

    return score