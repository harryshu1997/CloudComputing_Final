# locust_test.py
'''
usage:
pip3 install locustio
pip3 install locust
locust -f locustfile.py --host=://xxx.com
locust -f locustfile.py --host=http://34.66.176.215:8080/
without web view:
    locust -f locustfile.py --host=://xxx.com --no-web -c 1000 -r 100
    -c: 1000 次点击
    -r: 每秒加100
'''

import sys, random
#from locust import HttpLocust, TaskSet
from locust import HttpUser, between, task

'''
def getList(locust):
    """ define a function in python whose name is getList and the argument is locust """
    locust.client.get('/')
    locust.client.get('/version')

def post_img(self):
    with open('img.jpg', 'rb') as image:
        self.client.post(
            "/static/",
            data={'id': self.id},
            files={'photo': image}
        )
'''

    # def on_start(locust):
    #     """ on_start is called when a Locust start before any task is scheduled """
    #     response = locust.client.post("/login", data={"username":"cs144", "password": "password"})
    #     if response.status_code != 200:
    #         print("FAIL to start with posting data to server. Make sure that your server is running.")
    #         sys.exit();

#class MyLocust(HttpLocust):
class MyLocust(HttpUser):
    wait_time = between(5,15)

    @task
    def getHome(self):
        self.client.get('/')

    @task
    def getVersion(self):
        self.client.get('/version')

    @task
    def postImg(self):
        with open('img.jpg', 'rb') as image:
            self.client.post(
                files={'file': image},
                url = "http://34.66.176.215:8080/"
            )
    

