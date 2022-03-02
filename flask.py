from flask import Flask, render_template, request
import numpy as np
import pickle
# from flask_wtf import FlaskForm
# from wtforms import StringField, PasswordField, SubmitField, RadioField , TextAreaField ,FileField , SelectField

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecretkey'

forest_model = pickle.load(open('forest_model.sav', 'rb'))

@app.route('/predict', methods=['GET'])

def home():

    args = request.args
    args_key = args.to_dict()
    features = list(map(float, args.get("input").split(",")))
    return forest_model.predict([features])[0]


if __name__ == '__main__':
    app.run(debug=True)

