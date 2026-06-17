import fitz

pdf = fitz.open("sample_resume.pdf")

for page in pdf:
    print(page.get_text())

pdf.close()