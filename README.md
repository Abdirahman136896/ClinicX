# ClinicX
Clinic Management System that has the following objectives:
1. Enable ClinicX to better manage its branches and services across the country.
2. Provide patients with an easy way to locate ClinicX branches and book services.
3. Generate reports to help ClinicX understand its performance and make informed decisions.

Objectives of Clinic X project illustrated in the below video:
          https://drive.google.com/file/d/1jBoA4WOPtM75l0WPkaXrsm2eLV8jmSEB/view?usp=share_link

How to create the database and the database tables;
1. Open the table.sql file and copy all the sql statements. Open mysql workbench or mysql on terminal.
2. Create a database called clinic using the following sql statement:
  create database clinic;
 3. Type "use clinic;" and click enter
 4. Paste all what is in table.sql in workbench or terminal and execute the statements
 
 How to run the backend
 1. Open terminal and type "npm install" to install the dependencies
 2. Create .env file and insert the database credentials and server port number as follows:
  PORT = 8080
  //connection
  DB_HOST = localhost
  DB_USER = root
  DB_PORT = 3306
  DB_PASSWORD = ''
  DB_NAME = clinic
 3. Add ACCESS_TOKEN and Email credentials to the .env file as follows:
  EMAIL_SERVICE = hotmail
  EMAIL_USERNAME = example@outlook.com
  EMAIL_PASSWORD = ''
  EMAIL_FROM =  example@outlook.com
  EMAIL_SENDER = ClinicX

  ACCESS_TOKEN = ''
 4. Type "npm start" and wait for DB Connected message.
 
 How to run the frontend
 1. Open terminal, move to frontend folder and type "npm install" to install the dependencies.
 2. When finished installing type "ng serve" or "ng s"
 3. When compiled successfully, open your browser and navigate to "http://localhost:4200"
 
 
