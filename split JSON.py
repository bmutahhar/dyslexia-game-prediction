import json

with open('DyxsisML Auto-generated Complete Dataset.json') as f:
    data = json.loads(f.read())
print(len(data))

Easy = []
Medium = []
Hard = []
labels = []

for row in data:
    ez = []
    mid = []
    hrd = []
    for ques in row['questions']:
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

    Easy.append([row['gender'], row['timeToFinish']] + ez)
    Medium.append([row['gender'], row['timeToFinish']] + mid)
    Hard.append([row['gender'], row['timeToFinish']] + hrd)
    labels.append(row['dyslexic'])
    # print(json.dumps(row, indent=4))
    # print(Easy)
print(len(labels))
