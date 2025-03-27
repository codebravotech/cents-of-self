# cents-of-self

Cents of Self is a demo unified framework (front and back end running as part of one docker-compose network) which provides a simple CRUD interface for financial transactions.

## Dependencies

- Node Package Manager (npx) -- [download link](https://docs.npmjs.com/cli/v8/commands/npx)
- Node Version 20 or above -- [download link](https://nodejs.org/en/download)
- Docker Desktop (including the Docker-Compose and Docker CLIs) -- [download link](https://docs.docker.com/compose/install/#:~:text=The%20easiest%20and%20recommended%20way,CLI%20which%20are%20Compose%20prerequisites).
- A supported development environment: currently support is only for a Linux-based system/terminal (application was developed on MacOS). Windows commands will differ (documentation/support coming soon), but as long as you can install the dependencies using your preferred package manager and run docker-compose, you should be able to run the application in Windows as well.

The install scripts will set up all other dependencies.

## Run Locally

### Start

1. Launch Docker Desktop
2. Run `yarn install_deps` from the project root directory (this is mostly just for dev tools like prettier, since the docker network will have the dependencies installed inside the containers themselves)
3. Start the application: Run `yarn dev` from the project root directory.
4. Allow the network to spin up -- this may take a few minutes (go grab a coffee or do a short meditation 😉) because it has to download docker images for postgres and node, install dependencies, and kick off the services. All steps are complete when you see:
    - a message for the "api" service saying `🚀  GQL Server ready at http://localhost:4000`
    AND 
    - a message from the "app" service saying `Local:   http://localhost:5173/`

4. Open localhost:5173 in a browser window

### Stop

To shut down the application, run `docker-compose down`

To shut down the application and reset the database, run `yarn docker:reset`. NOTE: THIS REMOVES ALL DOCKER VOLUMES FROM YOUR MACHINE, SO USE CAREFULLY.

## Key Technologies

To develop against this codebase you should have a working knowledge of:

#### Back End

- GraphQL
- Node (Typescript)
- Prisma

#### Front End

- React (Typescript & hooks-based approach from React 16+)
- TailwindCSS
