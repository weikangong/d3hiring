## First time set up
1. Install [mysql](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/)
2. [Set up root username and pw](https://stackoverflow.com/questions/6474775/setting-the-mysql-root-user-password-on-os-x), recommend to follow same variables as in `.env-sample`
3. Create database `d3hiringDb`
4. Install [Sequel Ace](https://apps.apple.com/us/app/sequel-ace/id1518036000?mt=12) or [Sequel Pro](https://www.sequelpro.com) for SQL GUI
5. `git clone` this repository
6. `yarn install` to init node_modules
7. `cp ./.env-sample ./.env` to set up env file. We use dotenv for env variable control
8. `yarn dev` to start local dev server
9. Install postman to test api, remember to include bearer token (specified in `./.env.sample` in request for auth

> Note: You will need to head to `./plugins/database` and set `synchronize: false` for subsequent dev

## Test
`yarn test` to run and generate coverage report

## Tools
Stacks used
1. nodejs
2. typescript
3. typorm for sql table & relation management
4. hapi middleware for routing/security/plugins
5. jest for test