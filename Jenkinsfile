pipeline {
    agent {
        docker {
            image 'docker:dind'
            args '--env DOCKER_HOST=tcp://host.docker.internal:2375 --privileged'
        }
    }
    environment {
        CI_REGISTRY_IMAGE = "hichem/nextjs-app"
        HOME = "/var/jenkins_home" // Définit le répertoire home correct
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building Docker image...'
                sh '''
                    export HOME=/var/jenkins_home
                    mkdir -p $HOME/.docker
                    chmod 700 $HOME/.docker
                    docker build -t $CI_REGISTRY_IMAGE:latest .
                    docker push $CI_REGISTRY_IMAGE:latest
                '''
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
                sh '''
                    apk add --update --no-cache docker-compose
                    docker-compose down || true
                    docker-compose up -d
                '''
            }
        }
    }
}
