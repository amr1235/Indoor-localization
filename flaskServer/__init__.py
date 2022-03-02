from flask import Flask, render_template, request
import pickle
# from flask_wtf import FlaskForm
# from wtforms import StringField, PasswordField, SubmitField, RadioField , TextAreaField ,FileField , SelectField


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'mysecretkey'
    forest_model = pickle.load(open('flaskServer/forest_model.sav', 'rb'))


    @app.route('/predict', methods=['GET'])
    def home():
        args = request.args
        args_key = args.to_dict()
        features = list(map(float, args.get("input").split(",")))
        return forest_model.predict([features])[0]
    return app


# if __name__ == '__main__':
#     app.run(debug=True)
