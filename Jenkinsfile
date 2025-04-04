pipeline {
    agent {
        docker {
            image 'docker:dind'
            args '--env DOCKER_HOST=tcp://host.docker.internal:2375 --privileged'
        }
    }
    environment {
        CI_REGISTRY_IMAGE = "hichem/nextjs-app"
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t $CI_REGISTRY_IMAGE:latest .'
                sh 'docker push $CI_REGISTRY_IMAGE:latest'
            }
        }
        stage('Scan') {
            steps {
                echo 'Scanning Docker image with Trivy...'
                sh 'docker run --rm aquasec/trivy image $CI_REGISTRY_IMAGE:latest'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                sh 'apk add --no-cache docker-compose'
                sh 'docker-compose down || true'
                sh 'docker-compose up -d'
            }
        }
    }
}