import os
import numpy as np
from flask import Flask, request, render_template, flash, redirect
from werkzeug.utils import secure_filename
from tensorflow import keras

app = Flask(__name__)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
def allowed_file(filename):
    return '.'in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Convert inputted image to an array
def process_image(file_path):
    image_array = []
    image_prep = keras.preprocessing.image.load_img(file_path, target_size = (28, 28, 3))
    image_prep = keras.preprocessing.image.img_to_array(image_prep)
    image_prep = image_prep/255
    image_array.append(image_prep)
    return np.array(image_array)

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
            basepath = os.path.dirname(__file__)
            file_path = os.path.join(
                basepath, 'static', secure_filename(f.filename)
            )
            f.save(file_path)
            
            #image = process_image(file_path)
            
            
    return

@app.route("/predict")
def predict():
    return "predict result"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=9898, debug=True)