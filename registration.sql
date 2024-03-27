CREATE DATABASE registration;
use registration;

CREATE TABLE usersregistration(
    user_id int not null auto_increment,
    firstname varchar(50) not null,
    lastname varchar(50) not null,
    phonenumber char(10) not null,
    email varchar(80) not null unique,
    pwd_salt char(4) not null,
    pwd_md char(32),
    user_created timestamp not null default current_timestamp,
    user_status boolean default 0,
    PRIMARY KEY(user_id));
    
CREATE TABLE linkactivationcodes(
    user_id int null,
    activationcode char(12) not null,
    activationcode_created timestamp not null default current_timestamp ON UPDATE CURRENT_TIMESTAMP,
    constraint user_fk1 FOREIGN KEY(user_id) REFERENCES usersregistration(user_id));