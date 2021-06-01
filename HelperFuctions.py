import csv
import json
import os
import zipfile

from jsonflat import JsonFlat
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


def convert_json(data):
    data = JsonFlat().flatten(data)
    return data


def write_file(formData, scoreData, fileType):
    if not os.path.exists("./Temp"):
        os.mkdir("./Temp")
    if fileType == "csv":
        formDataCSV = convert_json(formData)
        scoreDataCSV = convert_json(scoreData)
        form_path = "./Temp/form-data.csv"
        score_path = "./Temp/score-data.csv"
        with open(form_path, 'w', encoding="utf-8", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=formDataCSV['field_names'])
            writer.writeheader()
            writer.writerows(formDataCSV['rows'])
        with open(score_path, 'w', encoding="utf-8", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=scoreDataCSV['field_names'])
            writer.writeheader()
            writer.writerows(scoreDataCSV['rows'])
        with zipfile.ZipFile("./Temp/csv-data.zip", "w") as zipF:
            zipF.write(form_path, compress_type=zipfile.ZIP_DEFLATED, arcname=os.path.basename(form_path))
            zipF.write(score_path, compress_type=zipfile.ZIP_DEFLATED, arcname=os.path.basename(score_path))
        os.remove(form_path)
        os.remove(score_path)
    else:
        form_path = "./Temp/form-data.json"
        score_path = "./Temp/score-data.json"
        with open(form_path, 'w', encoding="utf-8") as f:
            json.dump(formData, f, indent=2, ensure_ascii=False)
        with open(score_path, 'w', encoding="utf-8", newline="") as f:
            json.dump(scoreData, f, indent=2, ensure_ascii=False)
        with zipfile.ZipFile("./Temp/json-data.zip", "w") as zipF:
            zipF.write(form_path, compress_type=zipfile.ZIP_DEFLATED, arcname=os.path.basename(form_path))
            zipF.write(score_path, compress_type=zipfile.ZIP_DEFLATED, arcname=os.path.basename(score_path))
            os.remove(form_path)
            os.remove(score_path)
