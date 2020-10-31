# Doggy Classifier Website Deployment


## Description
This is a AutoML based Image Classification model that is hosted on Flask, allowing users to upload doggy photos and see which category of doggy their photos belong to. <br>
This web application is deployed with Kubernetes and has passed the load test of 1k+ requests served by multiple endpoints per second.

![](https://github.com/harryshu1997/CloudComputing_Final/blob/main/screenshot/webpage.png)

## Demo Video
https://www.youtube.com/watch?v=1fUn561it5k

## Deployed Web App Link
http://34.66.176.215:8080/

It is possible that a "FailedPrecondition: 400" will occur when requesting a classification result. That means the Google AutoML model deployment has been turned off (The billing of this Google AutoML is time-based and it's quite costly).

## Install
* Create a virtualenv and source
* Run `make install`

## Running app
* Run in local: `python web.py`
* Run in Docker: `./run_docker.sh`

## Kubernetes Deployment and Locust Testing
This web application is deployed to Google Kubernetes Engine and has passed the load test of 1k+ requests served by multiple endpoints per second.

## Contributing

|Name|Github Username|
|---------|----------|
|Zhihao Shu|harryshu1997|
|Bodong Wang|bow017|
|Rui Xu|Ruixxxx|



