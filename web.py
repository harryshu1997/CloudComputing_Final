from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "This is a doggy classifier website!"

@app.route("/predict")
def predict():
    return "predict result"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=9898)