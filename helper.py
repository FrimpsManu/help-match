"""Utils"""
import json

def read_and_sort_json(file_path):
    """Reads a JSON file, sorts its keys and writes back to the file"""
    fields = ("role", "specific")
    with open(file_path, 'r', encoding="utf-8") as file:
        data = json.load(file)

    # Assuming the JSON data is a dictionary and we need to sort its keys
    for channel in data:
        for field in fields:
            if field in data[channel]:
                data[channel][field].sort()

    with open(file_path, 'w', encoding="utf-8") as file:
        json.dump(data, file, indent=4)

if __name__ == "__main__":
    read_and_sort_json("help.json")
