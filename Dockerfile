FROM python:3.7.3-stretch

# Working Directory
WORKDIR /web

# Copy source code to working directory
#COPY . web.py, AUTOML-Model-d9e9236b7644.json /web/
COPY . /web/

# Install packages from requirements.txt
# hadolint ignore=DL3013
RUN pip install --upgrade pip &&\
    pip install --trusted-host pypi.python.org -r requirements.txt

# Expose port 80
EXPOSE 80

# Run app.py at container launch
CMD ["python", "web.py"]