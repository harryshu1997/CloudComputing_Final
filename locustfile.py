import sys, random

from locust import HttpUser, between, task

class MyLocust(HttpUser):
    wait_time = between(5,15)

    @task
    def getHome(self):
        self.client.get('/')

    @task
    def getVersion(self):
        self.client.get('/version')
        
    @task
    def getPrediction(self):
        with open('Samoyed-standing-in-the-forest.jpg','rb') as image:
            self.client.post(
                    files={'file':image},
                    url = "http://34.66.176.215:8080"
            )
