import csv
data = []
easy = []
medium = []
hard = []
headers = ['Timestamp', 'Gender', 'Level', 'timetoFinish', 'Difficulty', 'clickCount', 'hits', 'miss', 'score',
           'missrate', 'accuracy', 'time', 'Dyslexic']
with open('DyxsisML Auto-generated Complete Dataset.csv') as f:
    reader = csv.DictReader(f)
    for rows in reader:
        if rows['Difficulty'].strip() == 'easy':
            easy.append(rows)
        elif rows['Difficulty'].strip() == 'medium':
            medium.append(rows)
        else:
            hard.append(rows)

with open('DyxsisML Auto-generated Easy Dataset.csv', 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=headers)
    writer.writeheader()
    writer.writerows(easy)

with open('DyxsisML Auto-generated Medium Dataset.csv', 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=headers)
    writer.writeheader()
    writer.writerows(medium)

with open('DyxsisML Auto-generated Hard Dataset.csv', 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=headers)
    writer.writeheader()
    writer.writerows(hard)


