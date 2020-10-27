#!/usr/bin/env bash
# This tags and uploads an image to Docker Hub

#Assumes this is built
#docker build -t doggyclassifier:1.0 .


dockerpath="ruixxxx/doggyclassifier:1.0"

# Authenticate & Tag
echo "Docker ID and Image: $dockerpath"
docker login &&\
    docker image tag doggyclassifier:1.0 $dockerpath

# Push Image
docker image push $dockerpath