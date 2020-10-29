#!/usr/bin/env bash
# This tags and uploads an image to Docker Hub

#Assumes this is built
#docker build -t doggyclassifier .


dockerpath="ruixxxx/doggyclassifier"

# Authenticate & Tag
echo "Docker ID and Image: $dockerpath"
docker login &&\
    docker image tag doggyclassifier $dockerpath

# Push Image
docker image push $dockerpath