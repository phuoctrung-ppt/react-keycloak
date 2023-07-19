# SCRIPT BASH 
 ## get all images and remove 
    for container_id in $(docker ps | images -aq); do docker rm | rmi $container_id; done

# Start project with docker
   ### 1: Create env file with command
   ```
      cp env.example env
   ```
   ### 2: Start project with docker
   ```
      docker-compose -f docker-compose-build.yaml up --build
   ```
   ### 3: Check container started
   ```
      http://localhost:8080  --> keycloak
      http://localhost:3000  --> react app
   ```
   ### 4: Postgres DB started with port 5432
   ```
      use pgadmin4 and connect to server with host postgres (service form docker getting service name for dns)
   ```

# This repo support learn concept
   ### ReactJS / Keycloak / Postgre SQL
   ### Build / deploy with docker
   ### Bundle tool using vite
# Todo
   ### GraphQL