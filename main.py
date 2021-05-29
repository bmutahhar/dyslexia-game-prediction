from jsonflat import JsonFlat
import json, csv

rows = json.loads(open('Sample scores.json').read())
data = JsonFlat().flatten(rows)
with open('Sample.csv', 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=data['field_names'])
    writer.writeheader()
    writer.writerows(data['rows'])
