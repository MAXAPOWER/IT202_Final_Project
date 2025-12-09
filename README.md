# IT202_Final_Project
IT202 Final Project by Abraham && Omar && Max

## Docker Instructions
This readme assumes Docker is installed and the current working directory is where the Dockerfile is located.

Build the image by entering:
`docker build -t it202-final-project:1.0 .`

Verify the image is created:
`docker images`

Run the container:
`docker run -d -p 8000:8000 it202-final-project:1.0`

Confirm the container process is running successfully:
`docker ps`

[Optional] Check logs by Container ID:
`docker logs <container_id_here>`
