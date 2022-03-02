import pickle
import sys

forest_model = pickle.load(open('forest_model.sav', 'rb'))
input_string = sys.stdin.read(1)
features = list(map(float, input_string.split(",")))
output = forest_model.predict([features])[0]
sys.stdout.write(output)



