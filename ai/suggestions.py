def get_suggestions(details):
    suggestions = []

    if details["Email"] == "Not Found":
        suggestions.append("Add an email address.")

    if details["Phone"] == "Not Found":
        suggestions.append("Add a phone number.")

    if len(details["Skills"]) < 5:
        suggestions.append("Add more technical skills.")

    if not suggestions:
        suggestions.append("Your resume looks good!")

    return suggestions