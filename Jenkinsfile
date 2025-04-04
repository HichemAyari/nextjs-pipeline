pipeline {
    agent any

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
                sh 'docker-compose down || true'
                sh 'docker-compose up -d'
            }
        }
    }
}
