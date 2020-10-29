# locust_test.py
'''
usage:
pip3 install locustio

locust -f locustfile.py --host=://xxx.com

without web view:
    locust -f locustfile.py --host=://xxx.com --no-web -c 1000 -r 100
    -c: 1000 次点击
    -r: 每秒加100
'''

import sys, random
from locust import HttpLocust, TaskSet

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


class MyTaskSet(TaskSet):
    """ the class MyTaskSet inherits from the class TaskSet, defining the behavior of the user """
    tasks = {getList: 2, post_image: 1}
    # def on_start(locust):
    #     """ on_start is called when a Locust start before any task is scheduled """
    #     response = locust.client.post("/login", data={"username":"cs144", "password": "password"})
    #     if response.status_code != 200:
    #         print("FAIL to start with posting data to server. Make sure that your server is running.")
    #         sys.exit();

class MyLocust(HttpLocust):
    """ the class MyLocust inherits from the class HttpLocust, representing an HTTP user """
    task_set = MyTaskSet
    min_wait = 1000
    max_wait = 2000