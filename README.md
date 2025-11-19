# SWE645 HW3 – ATVP Student Survey Application

Cloud-native student survey portal built for SWE 645 HW3 using **React (Vite)**, **FastAPI**, **MySQL**, **Kubernetes (RKE2)**, **Docker**, and **Jenkins**.

## Live Demo Links

- Frontend – Survey Form:  
  http://52.54.10.9:30080/survey/new

- Backend – Health Check:  
  http://52.54.10.9:31081/api/health

- MySQL phpMyAdmin:  
  http://52.54.10.9:30082/index.php?route=/sql&db=atvp&table=surveys

- Jenkins Pipeline:  
  http://52.54.10.9:8081/job/ATVP-HW3-Pipeline/

- GitHub Repo:  
  https://github.com/Akhil2358/SWE645-HW3.git

---

## Architecture Overview

- **Frontend**: React + Vite SPA
  - Deployed as `atvp-frontend` Deployment
  - Exposed via NodePort **30080**
  - Uses Axios to talk to backend

- **Backend**: FastAPI + SQLAlchemy
  - Deployed as `atvp-backend` Deployment
  - Exposed via NodePort **31081**
  - Connects to MySQL using environment variables

- **Database**: MySQL 8 + phpMyAdmin
  - `atvp-mysql` (ClusterIP) for internal DB access
  - `atvp-mysql-admin` (NodePort **30082**) for browser-based DB UI

- **CI/CD**: Jenkins + Docker Hub + RKE2
  - Jenkins builds Docker images `tgondi/atvp-backend:hw3` and `tgondi/atvp-frontend:hw3`
  - Pushes to Docker Hub and applies Kubernetes manifests
  - Restarts frontend deployment to pick up new image

Running Jenkins (on EC2)
On the EC2 host: 
sudo su -

# Start Jenkins for the first time
docker run -d --name jenkins-atvp \
  -p 8081:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /etc/rancher/rke2/rke2.yaml:/var/jenkins_home/rke2-jenkins.yaml \
  jenkins/jenkins:lts-jdk17

Jenkins Pipeline

Jenkinsfile stages:

Checkout – pulls code from GitHub

Build Backend Image – docker build ./backend

Build Frontend Image – docker build ./frontend

Docker Login & Push – push images to Docker Hub

Deploy to Kubernetes – apply manifests and restart frontend

Kubernetes Commands (Demo Cheatsheet)

From EC2 (or any node with kubeconfig):
export KUBECONFIG=/etc/rancher/rke2/rke2.yaml

# Check namespace and resources
kubectl get ns
kubectl -n atvp get pods
kubectl -n atvp get svc

# Tail backend logs
kubectl -n atvp logs deployment/atvp-backend

# Restart frontend deployment
kubectl -n atvp rollout restart deployment atvp-frontend
kubectl -n atvp rollout status deployment atvp-frontend

# Quick backend health check
curl http://52.54.10.9:31081/api/health


Git Workflow (Local → Jenkins → Cluster):
# Check which files changed
git status

# Stage changes
git add .

# Commit changes
git commit -m "Update navbar and improve survey UI"

# Push to main
git push origin main

This push triggers the Jenkins pipeline, which builds new Docker images and redeploys to Kubernetes.

Using the App

Open the survey form:
http://52.54.10.9:30080/survey/new

Fill in all required fields and submit.

View submitted surveys:
http://52.54.10.9:30080/surveys

Edit any survey (inline form on top)

Delete surveys with the delete button

Inspect DB rows in phpMyAdmin:
http://52.54.10.9:30082/index.php?route=/sql&db=atvp&table=surveys