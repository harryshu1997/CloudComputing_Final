import os
import numpy as np
from flask import Flask, request, render_template, flash, redirect
from werkzeug.utils import secure_filename
#from tensorflow import keras
from google.cloud import automl

# Get the model variables
project_id = "automl-model-293309"
model_id = "ICN1182672090231209984"
 
# Import the doggy prediction model
#prediction_client = automl.PredictionServiceClient()
prediction_client = automl.PredictionServiceClient().from_service_account_json("./AUTOML-Model-d9e9236b7644.json")

# Get the full path of the model.
model_full_id = automl.AutoMlClient.model_path(
    project_id, "us-central1", model_id
)

app = Flask(__name__)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
def allowed_file(filename):
    return '.'in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

#global class_name
#global class_score

# Convert inputted image to an array
def process_image(f):
   # Read the file.
    content = f.read()

    image = automl.types.Image(image_bytes=content)
    payload = automl.types.ExamplePayload(image=image)
    # params is additional domain-specific parameters.
    # score_threshold is used to filter the result
    # https://cloud.google.com/automl/docs/reference/rpc/google.cloud.automl.v1#predictrequest
    params = {"score_threshold": "0.5"}

    #request = automl.PredictRequest(
    #request = (
    #    name=model_full_id,
    #    payload=payload,
    #    params=params
    #)
    response = prediction_client.predict(model_full_id, payload=payload, params=params)
    #print("Prediction results:")
    for result in response.payload:
    #print("Predicted class name: {}".format(result.display_name))
    #print("Predicted class score: {}".format(result.classification.score))
        class_name = result.display_name
        class_score = result.classification.score
    #return render_template('upload.html', label = class_name, score = class_score)
    return "Predicted class name: {}".format(result.display_name)
    

#@app.route("/")
#def home():
#    return "This is a doggy classifier website!"

@app.route("/", methods=['GET', 'POST'])
def upload():
    if request.method == 'GET':
        return render_template('upload.html')
    if request.method == 'POST':
        if 'file' not in request.files:
            flash("No file part")
            return redirect(request.url)
        f = request.files['file']
        if f.filename == '':
            flash("No selected file")
        if f and allowed_file(f.filename):
            #image_name = f.filename
            """
            basepath = os.path.dirname(__file__)
            file_path = os.path.join(
                basepath, 'static', secure_filename(f.filename)
            )
            f.save(file_path)
            """

            
    return process_image(f)

@app.route("/version")
def version():
    """
    basepath = os.path.dirname(__file__)
    file_path = os.path.join(
        basepath, 'static', secure_filename(f.filename)
    )
    process_image(file_path)
    """
    return "This is doggy classifier version 1.0, and thanks for choosing our website!"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=9898, debug=True)