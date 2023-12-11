# Marvel Spectrum and friends

### About the project

  This is a project created to fetch data from Marvel's developer API, its main objective is to fetch all Marvel characters that co-participated with the hero Spectrum (Id 1010705), store to a database and make it easy to access.

### Technologies and libraries
- Nodejs
- Express
- Axios
- Sequelize
- SQLite
- Jest
- Docker

### Getting started

1. Set the .env variables, copying the file .env-example to the root of the project (the same level as the .env-example file), copy and paste your Marvel API credentials to (name it to .env)
    - pbkey: public key
    - pvkey: private key
2. Run the project with one of the options:
     - docker compose:
         `docker-compose up --build`
     - docker run:
         `docker build -t marvel_api . && docker run -p 3000:3000 -it marvel_api`
3. At the startup, the service will fetch data from the api and save to the database
4. To exfiltrate the information you can access it from the browser:
    -  GET [localhost:3000/json](http://localhost:3000/json) - json-formatted data
    -  GET  [localhost:3000/html](http://localhost:3000/html) - table-formatted data
      
### More

  - Dependency injection, mostly with functional injection pattern
  - Testing with Jest

### Next steps

  - Typescript
  - Front-end for search, filtering and more table-like functionalities

All data is maintained by Marvel's Developer API at https://developer.marvel.com/
