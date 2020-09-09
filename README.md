# Express REST API template

REST API built using Express. This is primarily a template for me to use for future projects of the same type, but feel free to use this as necessary.

## Getting Started

### Prerequisites

[Docker Engine 19.03.0+](https://docs.docker.com/engine/) &
[Docker Compose 1.27.0+](https://docs.docker.com/compose/) are required to
develop locally. All other dependencies are handled within Docker.

-----

### Installing

1. Clone the repository
2. Navigate to the directory the repository was cloned in
3. Copy `.env.example` to `.env`
4. Update `.env` with relevant information (Request from administrators if
   necessary)
5. Run `docker-compose build`
6. Run `npm run docker:start` OR `docker-compose up -d`

After starting, the API will be available on `http://localhost:5000`.

-----

## Making It Your Own

### Config

Configuration is separated into modules for simplicity related to maintanance.

Each configuration module is stored in `config/modules/`

Each module is its own separate object and will be available within the "config" object.

If you need to use a configuration module, it must be inluded with the following:

```
const config = require(`${process.env.APP_ROOT}/config`)
```

### Sequelize Associations

Sequelize associations are an addon to the configuration modules.

Each association is stored in `config/associations/`.

The name of the file must be the name of the database.

Each of the association files contains an array of Sequelize associations that will be executed when initializing the Sequelize instance.

### Middleware

These are simply Express application-level middleware.

See [Express Middleware Documentation](https://expressjs.com/en/guide/using-middleware.html) for more information)

### Sequelize Modules

Infomation coming soon

### Private Directory

These are files only accessable in the `development` environments. Future plans are to have this availabile on live environments with some form of authentication.

Files are accessable through the route `/private`.

### Public Directory

These are files accessable to the public on every environment.

Files are accessable through the route `/public`

### Storage Directory

These are files only available internally to the application. Useful for storing keys, miscillanious files for other modules, and large files.

### Routes

Information coming soon

-----

## Built With

* Express
* Sequelize
* PM2
* Docker

-----

## Contributing

This project is open to contributions from the public. All contributions must be through the `develop` branch.

-----

### Pull Request Process

1. Ensure `package.json` is updated with any necessary dependencies
2. Update README.md with any relevant changes
3. Increase version number (If you want to) in `package.json`
4. Submit pull requests to the `develop` branch **ONLY**. The `develop` branch is
actively tested and merged into `master` when updates are applied.
