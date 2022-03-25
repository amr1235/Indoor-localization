import pickle
import sys
import logging

forest_model = pickle.load(open('forest_model.sav', 'rb'))
logging.basicConfig(filename='example.log', level=logging.DEBUG)

while True:
    input_string = sys.stdin.readline()
    try:
        features = list(map(float, input_string.split(",")))
        output = forest_model.predict([features])[0]
        sys.stdout.write(output)
        sys.stdout.flush()
    except Exception:
        logging.error(Exception)
