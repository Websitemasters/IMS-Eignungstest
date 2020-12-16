drop database if EXISTS imseignungstest;
create database imseignungstest;
use imseignungstest;

create table user(
    id int not null
    auto_increment,
    resultat float,
    PRIMARY KEY (id)
);

create table activity(
    id int not null auto_increment,
    userId int not null,
    urlPage varchar(50) not null,
    activityTime DATETIME DEFAULT CURRENT_TIMESTAMP not null,
    PRIMARY KEY(id),
    FOREIGN KEY(userId) REFERENCES user (id) 
);

create table items(
    id int not null auto_increment,
    frage varchar(255) not null,
    kategorie varchar(50) not null,
    gewichtung int(20) not null,
    code varchar(500),
    antwort float,
    Primary key (id)
);

insert into user (id,resultat)
values (1, 0);
            
insert into items(frage,kategorie,gewichtung,code,antwort)
values("Hast du bereits Kenntnisse im Bereich Applikationsentwicklung?", "5choice", 7, null, 0),
    ("Mir macht es Freude in Gruppen zu arbeiten?", "5choice", 5, null, 0),
    ("Ich habe grosses Interesse an Naturwissenschaftlichen Fächern (Geografie, Physik, Biologie, Chemie)?", "5choice", 3, null, 0),
    ("Mich interessieren wirtschaftliche Themen, wie die aktuelle Lage auf der Welt oder die Wirtschaftliche Infrastruktur der Schweiz?", "5choice", 7, null, 0),
    ("Ich möchte studieren?", "1-10", 3, null, 0),
    ("Hast du Interesse an genereller Informatik, wie z.B. Systemtechnik oder Web-Entwicklung?", "1-10", 8, null, 0),
    ("Hier siehst du eine Variableneklaration. Versuche den Code so zu ändern, dass 70 ausgegeben wird?", "code", 0, "x=3 \n return x", 0),
    ("Versuche nun die Summe von x und y auszugeben?", "code", 0, "x=4 \n y=2 \n return 0", 0),
    ("Hier siehst du ein If-Statement. Basierend darauf, ob der Vergleich in der Klammer stimmt oder nicht, wird der Code innerhalb der {} Klammern ausgeführt oder nicht. Versuche den Vergleich so zu formulieren,dass er wahr ist?", "code", 0, "x=4 \n if(x>100){\n x=50 \n} \nreturn x", 0),
    ("Du hast gerade programmiert! Hat er dir Spass gemacht?", "1-10", 5 , null, 0);



insert into user (resultat)
values (12),
(100),
(32),
(88),
(94),
(75);


/*Queries*/
/*Durchschnitts Eignung*/
select AVG(resultat) from user where resultat>0;

/*Alle Resultate von Benutzern die Abschlossen haben*/
select * from user wehre resultat>0;

/*NOT NEEDED Alle Resultate von Benutzer auch mit nicht abgeschlossenen*/
select * from user;