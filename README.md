# Doggy Classifier Website Deployment


## Description
This is a AutoML based Image Classification model that is hosted on Flask, allowing users to upload doggy photos and see which category of doggy their photos belong to. <br>
This web application is deployed with Kubernetes and has passed the load test of 1k+ requests served by multiple endpoints per second.

<div align=center>
<img src="https://github.com/harryshu1997/CloudComputing_Final/blob/main/screenshot/workflow.png">
</div>

## Demo Video
https://www.youtube.com/watch?v=1fUn561it5k

## Deployed Web App Link
http://34.66.176.215:8080/

It is possible that a "FailedPrecondition: 400" will occur when requesting a classification result. That means the Google AutoML model deployment has been turned off (The billing of this Google AutoML is time-based and it's quite costly).

<div align=center>
<img src="https://github.com/harryshu1997/CloudComputing_Final/blob/main/screenshot/webpage.png">
</div>

## Install
* Create a virtualenv and source
* Run `make install`

## Running app
* Run in local: `python web.py`
* Run in Docker: `./run_docker.sh`

## Data Source
Our dataset comes from Standford Dog Breed Identification on Kaggle, which has 120 dog breeds and ~150 images per class. Considering the long running time and expensive cost of this whole dataset if trained with AutoML, we select 3 classes of dogs, Dingo, Boxer, Samoye and 20 images per class from it.

<div align=center>
<img src="https://github.com/harryshu1997/CloudComputing_Final/blob/main/screenshot/kaggle.png">
</div>

## Doggy Image Classification Model
The Image Classification model is build with AutoML.

<div align=center>
<img src="https://github.com/harryshu1997/CloudComputing_Final/blob/main/screenshot/AutoML.png" width="100" height="100">
</div>

Here are the model and its performance displays.

<div align=center>
<img src="https://github.com/harryshu1997/CloudComputing_Final/blob/main/screenshot/model.jpg">
</div>

<div align=center>
<img src="https://github.com/harryshu1997/CloudComputing_Final/blob/main/screenshot/precision.jpg">
</div>

<div align=center>
<img src="https://github.com/harryshu1997/CloudComputing_Final/blob/main/screenshot/confusionMatrix.jpg">
</div>

## Web App
The AutoML based Image Classification model is hosted on Flask, allowing users to upload doggy photos and see which category of doggy their photos belong to.

<div align=center>
<img src="https://github.com/harryshu1997/CloudComputing_Final/blob/main/screenshot/webpage.png">
</div>

## Docker Image
Docker Image is built and upload to Docker Hub for deployment preparation.

<div align=center>
<img src="https://github.com/harryshu1997/CloudComputing_Final/blob/main/screenshot/Docker.png" width="100" height="100">
</div>

## Kubernetes Deployment and Locust Testing
This web application is deployed to Google Kubernetes Engine and has passed the load test of 1k+ requests served by multiple endpoints per second.

<div align=center>
<img src="https://github.com/harryshu1997/CloudComputing_Final/blob/main/screenshot/GKE.jpg" width="100" height="100">
</div>

<div align=center>
<img src="https://github.com/harryshu1997/CloudComputing_Final/blob/main/screenshot/Locust.jpg" width="100" height="100">
</div>

## Contributing

|Name|Github Username|
|---------|----------|
|Zhihao Shu|harryshu1997|
|Bodong Wang|bow017|
|Rui Xu|Ruixxxx|



