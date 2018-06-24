# WebDev-SchoolProject
# How to run on web server

## Create a database name db-banaoonline
```
sudo -i -u postgres
psql
CREATE DATABASE "db-banaoonline";
\connect db-banaoonline
```
## Create a table to store session
```
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
```
## Get the code and install dependencies (please install sequelize-cli before continuing)
```
git clone https://github.com/1512203/WebDev-SchoolProject/commits/master
cd ban-ao-online
npm install 
cd database
sequelize db:migrate
sequelize db:seed:all
cd ..
nodemon
```
