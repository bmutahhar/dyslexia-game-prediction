from tensorflow.keras.preprocessing.sequence import pad_sequences


def flat_json_input(data):
    max_padding = 60
    gender = 1 if data.get("gender", "").strip() == "male" else 0
    time = data.get('totalTimeToFinish', "")
    time = time if isinstance(time, int) else 0
    easy = [gender, time]
    medium = [gender, time]
    hard = [gender, time]
    for score in data['scores']:
        if score['difficulty'].lower().strip() == "easy":
            easy.extend([score['clicks'], score['hits'], score['miss'], score['score'],
                         score['missrate'], score['accuracy'], score['time']])
        elif score['difficulty'].lower().strip() == "medium":
            medium.extend([score['clicks'], score['hits'], score['miss'], score['score'],
                           score['missrate'], score['accuracy'], score['time']])
        else:
            hard.extend([score['clicks'], score['hits'], score['miss'], score['score'],
                         score['missrate'], score['accuracy'], score['time']])
    padded_easy = pad_sequences([easy], padding="post", maxlen=max_padding, truncating="post")
    padded_medium = pad_sequences([medium], padding="post", maxlen=max_padding, truncating="post")
    padded_hard = pad_sequences([hard], padding="post", maxlen=max_padding, truncating="post")

    return padded_easy[0], padded_medium[0], padded_hard[0]


def get_avg_score(dataArr):
    count = 0
    score = 0
    for obj in dataArr:
        count += 1
        score += obj['score']

    return round(score, 2)
