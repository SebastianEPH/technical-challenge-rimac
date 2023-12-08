# Technical Challenge RIMAC

![](https://imgur.com/fv4cOuC.png)


## RUN LOCAL

1. Rename the `.env.example` file to `.env`, then enter your local credentials
    ````c
    # DATABASE CREDENTIALS MYSQL
    MYSQL_ROOT_PASSWORD='12345678'
    DATABASE_MYSQL_NAME='db_starwars'
    DATABASE_MYSQL_USER='username'
    DATABASE_MYSQL_PASSWORD='12345678'
    DATABASE_MYSQL_PORT='3306'
    ````
2. Install MYSQL with DOCKER => `docker-compose up -d`
3. Run database script `database.sql`
4. Install dependencies => `npm install` 
4. Run project local => `npm run start:api`

## RUN ONLINE
1. Set the following environment variables in your AWS, with your DB(MySQL) credentials
    ````c
    # DATABASE CREDENTIALS MYSQL
    MYSQL_ROOT_PASSWORD='12345678'
    DATABASE_MYSQL_NAME='db_starwars'
    DATABASE_MYSQL_USER='username'
    DATABASE_MYSQL_PASSWORD='12345678'
    DATABASE_MYSQL_PORT='3306'
    ````
2. run deploy => `npm run deploy`

__Note:__ `remember to configure your .aws credentials`

## DOCUMENTATION

1. Open swagger `swagger.yaml`

## USE API ONLINE 

1. Postman WEB => 


## TEST TDD | COVERAGE 100% 

run test => `npm run test`

![](https://imgur.com/8Ry208d.png)


## DIAGRAM OF SEQUENCE

### CREATE
![](https://imgur.com/43tnPgb.png)
link=> [https://imgur.com/43tnPgb.png](https://imgur.com/43tnPgb.png)

### GET_BY_NAME
![](https://imgur.com/1k63Ugj.png)
link=> [https://imgur.com/1k63Ugj.png](https://imgur.com/1k63Ugj.png)

by `SebastiánEPH`