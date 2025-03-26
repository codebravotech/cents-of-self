# cents-of-self

Cents of Self is a demo unified framework (front and back end running as part of one docker-compose network) which provides a simple CRUD interface for financial transactions.

## Dependencies

- Node Package Manager (npx) -- [download link](https://docs.npmjs.com/cli/v8/commands/npx)
- Node Version 20 or above -- [download link](https://nodejs.org/en/download)
- Docker Desktop (includes Docker Compose and the Docker CLI) -- [download link](https://docs.docker.com/compose/install/#:~:text=The%20easiest%20and%20recommended%20way,CLI%20which%20are%20Compose%20prerequisites).
- A supported development environment: currently support is only for a Linux-based system/terminal (application was developed on MacOS). Windows commands will differ (documentation/support coming soon), but as long as you can install the dependencies using your preferred package manager and run docker-compose, you should be able to run the application in Windows as well.

The install scripts should set up all other dependencies (e.g. typscript, etc)

## Run Locally

1. Launch Docker Desktop
2. Install all dependencies for framework: Run `yarn install_deps` from the project root directory.
3. Run the docker-compose network: Run `docker-compose up` from the project root directory.
4. Open localhost:5173 in a browser window

## Key Technologies Used

To develop against this codebase you should have a working knowledge of:

#### Back End

- GraphQL
- Node

#### Front End

- React (Typescript, hooks-based approach from React 16+)
- TailwindCSS
