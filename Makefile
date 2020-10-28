setup:
	python3 -m venv ~/.CloudComputing_Final

install:
	pip install --upgrade pip &&\
		pip install -r requirements.txt &&\
		pip install --upgrade google-cloud-automl

test:
	#python -m pytest -vv --cov=myrepolib tests/*.py
	#python -m pytest --nbval notebook.ipynb


lint:
	hadolint Dockerfile 
	pylint --disable=R,C,W1203 web.py

all: install lint test