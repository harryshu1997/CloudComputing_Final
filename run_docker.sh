#!/usr/bin/env bash

# Build image
docker build -t doggyclassifier:1.0 .

# List docker images
docker image ls

# Run flask app
docker run -p 9898:9898 doggyclassifier:1.0