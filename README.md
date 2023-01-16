# Awesome Project Build with TypeORM

## Steps to run this project:

I recommend:
=> CONNECTION_PORT: 3000
=> IMAGE_NAME: task-api

1. Run `docker build -t [IMAGE_NAME] .` command
2. Run `docker-compose up `
3. Run `docker run -it -p [CONECTION_PORT]:3000 [IMAGE_NAME]` command

Check if your 3306 port isn't occupied by an isntance of MySQL or other service already. If that is the case then Pause the process and let the docker-compose image use it, while running the test. In other case you can modified the docker-compose.yml accordingly to allocate a port of convenience.

## Documentation

Access the next route: `http://localhost:[CONNECTION_PORT]/docs`
From there you will be able to acces the SwaggerUI documentation

## For development:

I recommend:
=> CONNECTION_PORT: 4000
=> IMAGE_NAME: task-api

2. Run `docker-compose up `
3. Run `npm run dev` command
