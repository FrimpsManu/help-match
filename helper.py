"""Utils"""
import csv
import json
import os
import sys
import time


N_DASHES = 80


def log_ai_output(help_description, response):
    """Log the request and response from the AI into a csv file"""
    with open("ai-output.csv", 'a', newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        writer.writerow([time.time(), help_description, response])


def start_ai_output_log():
    """Start the AI output log by writing the header to the CSV file"""
    # Make sure it's never overwritten
    if os.path.exists("ai-output.csv"):
        raise FileExistsError("ai-output.csv already exists. It should not be overwritten.")
    with open("ai-output.csv", 'w', newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=["time", "help_description", "response"])
        writer.writeheader()


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
    if len(sys.argv) < 2:
        print("Usage: python helper.py <command>")
        sys.exit(1)
    match sys.argv[1].lower():
        case "log_start":
            start_ai_output_log()
        case "sort":
            read_and_sort_json("help.json")
