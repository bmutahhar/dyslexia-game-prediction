import csv
import json
import random
from randomtimestamp import randomtimestamp
from datetime import datetime
import pprint

headers = ['timestamp', 'gender', 'questions', 'timeToFinish', 'level', 'dyslexic']
sub_headers = ['difficulty', 'clickCount', 'hits', 'miss', 'score',
               'missrate', 'accuracy', 'time', ]
genders = ['male', 'female']
levels = ['preschooler', 'learner', 'elementary']
difficulty = ['easy', 'medium', 'hard']
dyslexic = ['yes', 'no']


def getgender():
    return genders[random.randint(0, 1)]


def getlevel():
    return levels[random.randint(0, 2)]


def getdifficulty():
    return difficulty[random.randint(0, 2)]


def isdyslexic():
    return dyslexic[random.randint(0, 1)]


def getTime():
    return randomtimestamp(start=datetime(2021, 1, 1, 0, 0, 0))


output = []
Easy = []
Medium = []
Hard = []
labels = []

for i in range(15000):
    ez = []
    mid = []
    hrd = []
    row = dict.fromkeys(headers)
    row['timestamp'] = getTime()
    row['gender'] = getgender()
    row['level'] = getlevel()
    row['timeToFinish'] = random.randint(420, 1800)
    row['questions'] = []
    row['dyslexic'] = isdyslexic()
    for j in range(15):
        ques = dict.fromkeys(sub_headers)

        ques['difficulty'] = getdifficulty()
        ques['clickCount'] = random.randint(1, 10)
        ques['hits'] = random.randint(0, 1)
        ques['miss'] = 1 - ques['hits']
        ques['score'] = ques['hits']
        ques['missrate'] = round(ques['miss'] / ques['clickCount'], 2)
        ques['accuracy'] = ques['hits'] / ques['clickCount']
        ques['time'] = random.randint(10, 30)
        row['questions'].append(ques)

        if ques['difficulty'].strip() == 'easy':
            ez = ez + [ques['clickCount'], ques['hits'], ques['miss'],
                       ques['score'],
                       ques['missrate'], ques['accuracy'], ques['time']]
        elif ques['difficulty'].strip() == 'medium':
            mid = mid + [ques['clickCount'], ques['hits'], ques['miss'],
                         ques['score'],
                         ques['missrate'], ques['accuracy'], ques['time']]
        else:
            hrd = hrd + [ques['clickCount'], ques['hits'], ques['miss'],
                         ques['score'],
                         ques['missrate'], ques['accuracy'], ques['time']]

    Easy.append([row['gender'], row['timeToFinish']]+ ez )
    Medium.append([row['gender'], row['timeToFinish']] +mid)
    Hard.append([row['gender'], row['timeToFinish']] + hrd)
    output.append(row)
    labels.append(row['dyslexic'])
    # print(json.dumps(output, indent=4))
    # print(Easy)

with open('DyxsisML Auto-generated Complete Dataset.json', 'w', encoding='utf-8', newline='') as f:
    json.dump(output,f,indent=2,ensure_ascii=False)
