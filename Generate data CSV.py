import csv
import random
from randomtimestamp import randomtimestamp
from datetime import datetime
headers = ['Timestamp', 'Gender', 'Level', 'timetoFinish', 'Difficulty', 'clickCount', 'hits', 'miss', 'score',
           'missrate', 'accuracy', 'time', 'Dyslexic']
genders = ['male', 'female']
levels = ['preschooler', 'learner', 'elementary']
difficulty = ['easy', 'medium', 'hard']
dyslexic = ['Yes', 'No']

def getGender():
    return genders[random.randint(0,1)]

def getLevel():
    return levels[random.randint(0,2)]

def getDifficulty():
    return difficulty[random.randint(0,2)]

def isDyslexic():
    return dyslexic[random.randint(0,1)]

def getTime():
    return randomtimestamp(start=datetime(2021, 1, 1, 0, 0, 0))

output = []

for i in range(15000):
    row = dict.fromkeys(headers)
    row['Timestamp'] = getTime()
    row['Gender'] = getGender()
    row['Level'] = getLevel()
    row['timetoFinish'] = random.randint(420, 1800)
    row['Difficulty'] = getDifficulty()
    row['clickCount'] = random.randint(1, 10)
    row['hits'] = random.randint(0, 1)
    row['miss'] = 1 - row['hits']
    row['score'] = row['hits']
    row['missrate'] = round(row['miss'] / row['clickCount'], 2)
    row['accuracy'] = row['hits'] / row['clickCount']
    row['time'] = random.randint(10, 30)
    row['Dyslexic'] = isDyslexic()
    output.append(row)
with open('DyxsisML Auto-generated Complete Dataset.csv', 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=headers)
    writer.writeheader()
    writer.writerows(output)




