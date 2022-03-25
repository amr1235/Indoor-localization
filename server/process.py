from cmath import log
import pickle
from pyexpat import model
import sys
import logging

# logging.basicConfig(filename='python.log', level=logging.DEBUG)
f = open("python.txt","+w")

while True:
    input_string = sys.stdin.readline()
    sys.stdout.write("test")
    sys.stdout.flush()
    # f.write(input_string)
    # # logging.info(input_string)
    # f.flush()

# forest_model = pickle.load(open('forest_model.sav', 'rb'))
# while True:
#     # try:
#     #     # features = list(map(float, input_string.split(",")))
#     #     # output = forest_model.predict([features])[0]
#     #     # sys.stdout.write(output)
#     #     # sys.stdout.flush()
#     # except Exception:
#     #     pass
