drop database if EXISTS imseignungstest;
create database imseignungstest;
use imseignungstest;

create table user
(
    id int not null auto_increment,
    resultat float,
    PRIMARY KEY (id)
);

create table activity(
    id int not null auto_increment,
    userId int not null,
    urlPage varchar(50) not null,
    activityTime DATETIME DEFAULT CURRENT_TIMESTAMP not null,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES user(id) 
);