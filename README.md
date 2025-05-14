# Employee Management System (Full Stack App)

This is a full stack Employee Management System built using Angular (frontend), Spring Boot (backend), MySQL (database), and Docker. The application is deployed on Amazon ECS using Fargate and uses an Application Load Balancer (ALB) for routing.

---

## Features

* Add, update, and delete employees
* Responsive Angular frontend
* REST API with Spring Boot
* MySQL for persistent storage
* Dockerized microservices
* ECS Fargate deployment with ALB

---

## Tech Stack

* **Frontend**: Angular
* **Backend**: Spring Boot (Java)
* **Database**: MySQL (Amazon RDS)
* **Cloud Platform**: AWS (ECS, Fargate, ALB, ECR, RDS)
* **Containerization**: Docker, Docker Compose

---

## Project Structure

```
Employee-Management-System/
├── angular-frontend/       # Angular project files
├── springboot-backend/     # Spring Boot project files
├── docker-compose.yml
├── nginx.conf              # Used to proxy /api/* calls
├── task-definition.json    # ECS task definition file
├── README.md
```

---

## Prerequisites

* AWS CLI configured
* Docker installed
* AWS account with ECS, ECR, and RDS access
* Angular CLI and Java SDK installed

---

## Environment Variables

Backend connects to MySQL via RDS using the following (inside ECS task):

```
SPRING_DATASOURCE_URL
SPRING_DATASOURCE_USERNAME
SPRING_DATASOURCE_PASSWORD
```

---

## Deployment Steps

### 1. Build & Push Docker Images

```bash
# Frontend
cd angular-frontend
npm install
ng build --prod
docker build -t employee-frontend .
docker tag employee-frontend:latest <your-ecr-url>/employee-frontend
docker push <your-ecr-url>/employee-frontend

# Backend
cd ../springboot-backend
./mvnw clean package -DskipTests
docker build -t employee-backend .
docker tag employee-backend:latest <your-ecr-url>/employee-backend
docker push <your-ecr-url>/employee-backend
```

### 2. Register Task Definition

```bash
aws ecs register-task-definition \
  --cli-input-json file://task-definition.json
```

### 3. Update ECS Services

```bash
aws ecs update-service \
  --cluster employee-cluster \
  --service employee-frontend-service \
  --task-definition employee-task:<version> \
  --force-new-deployment \
  --region us-east-2

aws ecs update-service \
  --cluster employee-cluster \
  --service employee-service \
  --task-definition employee-task:<version> \
  --force-new-deployment \
  --region us-east-2
```

---

## NGINX Proxy Config (Frontend Container)

```nginx
server {
  listen 80;
  location / {
    root /usr/share/nginx/html;
    index index.html index.htm;
    try_files $uri $uri/ /index.html;
  }
  location /api/ {
    proxy_pass http://backend:8080;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

---

## ALB Listener Rules

* `/api/*` routes → `employee-backend-tg` (port 8080)
* `/` and all other → `employee-frontend-tg` (port 80)

---

## Security Group Rules

* Inbound rule: TCP 80 from 0.0.0.0/0

---


## Access URL

```
http://employee-service-alb-1725556285.us-east-2.elb.amazonaws.com
```

---

## Author

Nithin Reddy

---

## License

This project is open source and available under the MIT License.
