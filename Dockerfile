FROM gcr.io/google_appengine/python
RUN virtualenv -p python3.7 /env

# Working Directory
WORKDIR /web

# Copy source code to working directory
#COPY . web.py, AUTOML-Model-d9e9236b7644.json /web/
COPY . /web/

# Install packages from requirements.txt
# hadolint ignore=DL3013
RUN pip install --upgrade pip &&\
#    pip install --trusted-host pypi.python.org -r requirements.txt
     pip install -r requirements.txt
RUN pip install --upgrade google-cloud-automl

# Expose port 80
EXPOSE 80

# Run app.py at container launch
CMD ["python", "web.py"]