pipeline {
    agent any

    environment {
        DOCKERHUB_USER  = 'tgondi'
        BACKEND_IMAGE   = "${DOCKERHUB_USER}/atvp-backend:hw3"
        FRONTEND_IMAGE  = "${DOCKERHUB_USER}/atvp-frontend:hw3"
        KUBECONFIG_PATH = '/etc/rancher/rke2/rke2.yaml'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend Image') {
            steps {
                sh '''
                echo "Building backend image: ${BACKEND_IMAGE}"
                docker build --platform=linux/amd64 -t ${BACKEND_IMAGE} ./backend
                '''
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh '''
                echo "Building frontend image: ${FRONTEND_IMAGE}"
                docker build --platform=linux/amd64 -t ${FRONTEND_IMAGE} ./frontend
                '''
            }
        }

        stage('Docker Login & Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    docker push ${BACKEND_IMAGE}
                    docker push ${FRONTEND_IMAGE}
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
    steps {
        sh '''
            echo Using kubeconfig at /var/jenkins_home/rke2-jenkins.yaml
            export KUBECONFIG=/var/jenkins_home/rke2-jenkins.yaml

            kubectl apply -f k8s/namespace.yaml
            kubectl -n atvp apply -f k8s/mysql.yaml
            kubectl -n atvp apply -f k8s/atvp-backend.yaml
            kubectl -n atvp apply -f k8s/atvp-frontend.yaml
        '''
    }
}

    }
}
