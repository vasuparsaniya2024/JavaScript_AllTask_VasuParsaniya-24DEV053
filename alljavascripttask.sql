CREATE DATABASE alljavascripttask;
use alljavascripttask;

-- --------------------------------Task-9 Dynamic Grid

CREATE TABLE StudentMaster(
            student_id int NOT NULL auto_increment, 
            studentname varchar(20) NOT NULL,
            email varchar(45) NOT NULL,
            address1 varchar(45) NOT NULL,
            address2 varchar(45),
            phonenumber char(10) NOT NULL,
            city varchar(30) NOT NULL,
			state varchar(45) NOT NULL,
            gender varchar(15) NOT NULL,
            zipcode varchar(10) NOT NULL,
            created timestamp default current_timestamp,
            PRIMARY KEY(student_id));
            
INSERT INTO alljavascripttask.StudentMaster
SELECT * from expressjsexercise_1.StudentMaster;

select * from StudentMaster;
select count(*) from StudentMaster;

truncate table StudentMaster;

SELECT * FROM StudentMaster ORDER BY studentname LIMIT 0,200; 

CREATE TABLE StudentDetails(
            student_id int NOT NULL auto_increment, 
            studentname varchar(20) NOT NULL,
            email varchar(45) NOT NULL,
            address1 varchar(45) NOT NULL,
            address2 varchar(45),
            phonenumber char(10) NOT NULL,
            city varchar(30) NOT NULL,
			state varchar(45) NOT NULL,
            gender varchar(15) NOT NULL,
            zipcode varchar(10) NOT NULL,
            created timestamp default current_timestamp,
            PRIMARY KEY(student_id));

INSERT INTO StudentDetails
SELECT * from StudentMaster LIMIT 0,200;

select * from StudentDetails;
select count(*) from StudentDetails;



CREATE TABLE StudentAttandanceRecord(
       student_id int not null,
       presentorabsent char(1) not null,
       attandancedate date not null,
       foreign key(student_id) references StudentDetails(student_id));
       
INSERT INTO alljavascripttask.StudentAttandanceRecord
SELECT * from expressjsexercise_1.StudentAttandanceRecord;

select * from StudentAttandanceRecord where attandancedate like '2024-01%' and student_id=1 and presentorabsent='P';
select count(*) from StudentAttandanceRecord;
--        attandancedate date not null,

SELECT StudentAttandanceRecord.student_id,StudentDetails.studentname,count(*) as numberofattandance, (count(*)*100)/29 as percentage
FROM StudentAttandanceRecord 
INNER JOIN StudentDetails
WHERE attandancedate like '2023-12%' and presentorabsent = 'P' and StudentDetails.student_id = StudentAttandanceRecord.student_id
GROUP BY student_id;

select attandancedate from StudentAttandanceRecord;

SELECT StudentAttandanceRecord.student_id,StudentDetails.studentname,count(*) as numberofattandance, (count(*)*100)/31 as percentage
FROM StudentAttandanceRecord 
INNER JOIN StudentDetails
WHERE extract(year from attandancedate) = 2024 and  extract(month from attandancedate) = 01 and presentorabsent = 'P' and StudentDetails.student_id = StudentAttandanceRecord.student_id
GROUP BY student_id;


-- tables for studentResult

-- in this use StudentDetails
CREATE TABLE ExamMaster(
		   exam_id int NOT NULL,
           typeofexam varchar(20) NOT NULL,
           PRIMARY KEY(exam_id));

INSERT INTO alljavascripttask.ExamMaster
SELECT * from expressjsexercise_1.ExamMaster;
           
CREATE TABLE SubjectMaster(
           subject_id int NOT NULL,
           subjectname varchar(20) NOT NULL,
           PRIMARY KEY(subject_id));

INSERT INTO alljavascripttask.SubjectMaster
SELECT * from expressjsexercise_1.SubjectMaster;
           
CREATE TABLE ExamResult(
           student_id int NOT NULL,
           theoryTotalMark int NOT NULL, 
           theoryObtainMark int NOT NULL,
           practicalTotalMark int NOT NULL,
           practicalObtainMark int NOT NULL,
           examdate date NOT NULL,
           subject_id int NOT NULL,
           exam_id int not null default 1,
           foreign key(student_id) references StudentDetails(student_id),
           foreign key(subject_id) references SubjectMaster(subject_id),
           foreign key(exam_id) references ExamMaster(exam_id)
);
INSERT INTO alljavascripttask.ExamResult
SELECT * from expressjsexercise_1.ExamResult;
           
select * from ExamResult;
select count(*) from ExamResult;
desc ExamResult;

-- ALTER TABLE ExamResult
-- ADD exam_id int not null;

-- ALTER TABLE ExamResult
-- ADD FOREIGN KEY(exam_id) REFERENCES ExamMaster(exam_id);

UPDATE ExamResult
SET exam_id = 3
WHERE theoryTotalMark = 70;

UPDATE ExamResult
SET exam_id = 2
WHERE theoryTotalMark = 40;

UPDATE ExamResult
SET exam_id = 1
WHERE theoryTotalMark = 30;

-- cross check
select ExamResult.student_id,StudentDetails.studentname,sum(ExamResult.theoryObtainMark) as theoryObtainMark,sum(ExamResult.practicalObtainMark) as practicalObtainMark
from ExamResult
Left Join StudentDetails ON ExamResult.student_id = StudentDetails.student_id
where exam_id = 3 and ExamResult.student_id=42
GROUP BY student_id,studentname;

-- query for student toal mark show

select ExamResult.student_id,StudentDetails.studentname,sum(ExamResult.theoryObtainMark) as theoryObtainMark,sum(ExamResult.practicalObtainMark) as practicalObtainMark
from ExamResult
Left Join StudentDetails ON ExamResult.student_id = StudentDetails.student_id
where exam_id = 1
GROUP BY student_id,studentname;

select ExamResult.student_id,sum(ExamResult.theoryObtainMark) as theoryObtainMark,sum(ExamResult.practicalObtainMark) as practicalObtainMark
from ExamResult
Left Join StudentDetails ON ExamResult.student_id = StudentDetails.student_id
where exam_id = 2
GROUP BY student_id;

select ExamResult.student_id,sum(ExamResult.theoryObtainMark) as theoryObtainMark,sum(ExamResult.practicalObtainMark) as practicalObtainMark
from ExamResult
Left Join StudentDetails ON ExamResult.student_id = StudentDetails.student_id
where exam_id = 3
GROUP BY student_id;

select * from ExamResult where exam_id = 1 and student_id = 1;


-- query for studentdetailmark view

select StudentDetails.studentname,SubjectMaster.subjectname, ExamResult.theoryObtainMark, ExamResult.practicalObtainMark
from ExamResult
Left join SubjectMaster on ExamResult.subject_id = SubjectMaster.subject_id
Left join StudentDetails on ExamResult.student_id = StudentDetails.student_id
where ExamResult.student_id = 1 and ExamResult.exam_id = 1;

select * from ExamResult where student_id=191 and exam_id=1;



-- -------------------------------------------JOB APPLICATION FORM


drop database JOBAPPLICATIONFORMNODEJS;
-- ---------------------------Select master----------------------------------
-- ------------------in this i am copy table from other database all table so below schema of that table is not consider

CREATE TABLE alljavascripttask.selectmaster
select * from JOBAPPLICATIONFORMNODEJS.selectmaster;

CREATE TABLE alljavascripttask.optionmaster
select * from JOBAPPLICATIONFORMNODEJS.optionmaster;

CREATE TABLE alljavascripttask.basicdetails
select * from JOBAPPLICATIONFORMNODEJS.basicdetails;

CREATE TABLE alljavascripttask.basicdetailsfortest
select * from JOBAPPLICATIONFORMNODEJS.basicdetailsfortest;

CREATE TABLE alljavascripttask.citymaster
select * from JOBAPPLICATIONFORMNODEJS.citymaster;

CREATE TABLE alljavascripttask.educationdetails
select * from JOBAPPLICATIONFORMNODEJS.educationdetails;

CREATE TABLE alljavascripttask.experience
select * from JOBAPPLICATIONFORMNODEJS.experience;

CREATE TABLE alljavascripttask.knownlanguage
select * from JOBAPPLICATIONFORMNODEJS.knownlanguage;

CREATE TABLE alljavascripttask.knowntechnology
select * from JOBAPPLICATIONFORMNODEJS.knowntechnology;

CREATE TABLE alljavascripttask.preferances
select * from JOBAPPLICATIONFORMNODEJS.preferances;

CREATE TABLE alljavascripttask.referencecontact
select * from JOBAPPLICATIONFORMNODEJS.referencecontact;

CREATE TABLE alljavascripttask.statemaster
select * from JOBAPPLICATIONFORMNODEJS.statemaster;


-- ---------------------------------below schema is for only reference 
CREATE TABLE selectmaster(
select_id int not null auto_increment,
select_name varchar(30) not null,
PRIMARY KEY(select_id));

INSERT INTO alljavascripttask.selectmaster
SELECT * from JOBAPPLICATIONFORMNODEJS.selectmaster;

desc selectmaster;




ALTER TABLE SelectMaster
RENAME TO selectmaster;

ALTER TABLE selectmaster auto_increment = 1;

-- add column to selectmaster
ALTER TABLE selectmaster
ADD COLUMN select_type varchar(30) not null;

ALTER TABLE selectmaster
ADD COLUMN multiselecteallow varchar(10) not null;

ALTER TABLE selectmaster
ADD COLUMN cssclass varchar(30) not null;

drop table selectmaster;
-- insert into column using update
select * from selectmaster;

UPDATE selectmaster
SET select_type = "checkbox", multiselecteallow = "yes" , cssclass = "languagecheckbox"
WHERE select_id = 1;

UPDATE selectmaster
SET select_type = "dropdown", multiselecteallow = "yes" , cssclass = "departmentdropdown"
WHERE select_id = 2;

UPDATE selectmaster
SET select_type = "dropdown", multiselecteallow = "yes" , cssclass = "preferedlocationdropdown"
WHERE select_id = 3;

UPDATE selectmaster
SET select_type = "checkbox", multiselecteallow = "yes" , cssclass = "technologiesdropdown"
WHERE select_id = 4;

UPDATE selectmaster
SET select_type = "text", multiselecteallow = "yes" , cssclass = "coursenametext"
WHERE select_id = 5;

UPDATE selectmaster
SET select_type = "radio", multiselecteallow = "no" , cssclass = "genderradio"
WHERE select_id = 6;


UPDATE selectmaster
SET select_type = "dropdown", multiselecteallow = "no" , cssclass = "relationshipstatusdropdown"
WHERE select_id = 7;

select * from selectmaster;
-- ---------------------------Option Master----------------------------------
CREATE TABLE optionmaster(
option_id varchar(15) not null,
select_id int not null,
option_name varchar(30) not null,
PRIMARY KEY(option_id),
CONSTRAINT optionmasterforeignkey FOREIGN KEY(select_id) REFERENCES selectmaster(select_id));

desc optionmaster;

ALTER TABLE OptionMaster
RENAME TO optionmaster;
-- --------------------------StateMaster---------------------------
CREATE TABLE statemaster(
state_id int not null auto_increment,
state_name varchar(25) not null,
PRIMARY KEY(state_id)); 

ALTER TABLE statemaster auto_increment = 1;

ALTER TABLE StateMaster
RENAME TO statemaster;

CREATE TABLE citymaster(
   city_id INTEGER  NOT NULL PRIMARY KEY auto_increment,
   state_id   INTEGER  NOT NULL,
   city_name  VARCHAR(40) NOT NULL,
   city_state VARCHAR(40) NOT NULL,
   FOREIGN KEY(state_id) REFERENCES statemaster(state_id));
   
   SELECT c.city_name as cityname 
    FROM citymaster as c
    LEFT JOIN statemaster as s ON c.state_id = s.state_id
    WHERE s.state_name = '${statename};
-- ---------------------------BasicDetails-----------------------------------
CREATE TABLE basicdetails(
candidate_id int not null auto_increment,
firstname varchar(20) NOT NULL,
lastname varchar(20) NOT NULL,
designation varchar(20) NOT NULL,
email varchar(25) NOT NULL unique,
address1 varchar(45) NOT NULL,
address2 varchar(45),
phonenumber char(10) NOT NULL,
city varchar(20) NOT NULL,
state int NOT NULL,
gender varchar(15) NOT NULL,
zipcode varchar(10) NOT NULL,
relationshipstatus varchar(15) NOT NULL,
dob date NOT NULL,
PRIMARY KEY(candidate_id),
foreign key(state) references statemaster(state_id),
foreign key(gender) references optionmaster(option_id),
foreign key(relationshipstatus) references optionmaster(option_id));

ALTER TABLE basicdetails auto_increment = 1;

ALTER TABLE basicdetails
MODIFY COLUMN email VARCHAR(50) NOT NULL UNIQUE;

ALTER TABLE BasicDetails
RENAME TO basicdetails;

CREATE TABLE basicdetailsfortest(
candidate_id int not null auto_increment,
firstname varchar(20) NOT NULL,
lastname varchar(20) NOT NULL,
designation varchar(20) NOT NULL,
email varchar(25) NOT NULL unique,
address1 varchar(45) NOT NULL,
address2 varchar(45),
phonenumber char(10) NOT NULL,
city varchar(20) NOT NULL,
state int NOT NULL,
gender varchar(15) NOT NULL,
zipcode varchar(10) NOT NULL,
relationshipstatus varchar(15) NOT NULL,
dob date NOT NULL,
PRIMARY KEY(candidate_id),
foreign key(state) references statemaster(state_id),
foreign key(gender) references optionmaster(option_id),
foreign key(relationshipstatus) references optionmaster(option_id));

ALTER TABLE basicdetailsfortest auto_increment = 1;

ALTER TABLE basicdetailsfortest
ADD CONSTRAINT unique_email UNIQUE (email);

INSERT INTO basicdetailsfortest 
select * from basicdetails;


select * from basicdetailsfortest;

delete from basicdetailsfortest;

--  -----------------------------------EducationDetails--------------------------------

-- CREATE TABLE EducationDetails(
-- id int not null auto_increment,
-- qualification varchar(10),
-- PRIMARY KEY(id));

CREATE TABLE educationdetails(
candidate_id int not null,
option_id varchar(15) not null,
nameOfCourse varchar(30) not null,
nameOfBoard_Or_Univarsity varchar(30) not null,
passingyear char(4) not null,
percentage decimal(5,2) not null,
PRIMARY KEY(candidate_id,nameOfCourse),
CONSTRAINT educationdetails_fk1 foreign key(candidate_id) references basicdetails(candidate_id),
CONSTRAINT educationdetails_fk2 foreign key(option_id) references optionmaster(option_id)); 

select * from educationdetails;
desc educationdetails;


ALTER TABLE EducationDetails
RENAME TO educationdetails;
-- CREATE TABLE HSC_Or_Diploma_Result(
-- candidate_id int not null,
-- nameOfBoard varchar(20) not null,
-- passingyear char(4) not null,
-- percentage decimal(5,2) not null,
-- PRIMARY KEY(candidate_id),
-- foreign key(candidate_id) references BasicDetails(candidate_id));

-- desc HSC_Or_Diploma_Result;
-- drop table HSC_Or_Diploma_Result;

-- desc HSC_Or_Diploma_Result;

-- CREATE TABLE BachelorDegree(
-- candidate_id int not null,
-- coursename varchar(20) not null,
-- university varchar(45) not null,
-- passingyear char(4) not null,
-- percentage decimal(5,2) not null,
-- PRIMARY KEY(candidate_id),
-- foreign key(candidate_id) references BasicDetails(candidate_id));

-- desc BachelorDegree;
-- drop table BachelorDegree;

-- CREATE TABLE MasterDegree(
-- candidate_id int not null,
-- coursename varchar(20) not null,
-- university varchar(45) not null,
-- passingyear char(4) not null,
-- percentage decimal(5,2) not null,
-- PRIMARY KEY(candidate_id),
-- foreign key(candidate_id) references BasicDetails(candidate_id));

-- desc MasterDegree;
-- drop table MasterDegree;

--       -----------------------------Experience--------------------------------
CREATE TABLE experience(
candidate_id int not null,
companyName varchar(45) not null,
designation varchar(20) not null,
dateFrom date not null,
dateTo date not null,
CONSTRAINT experience_fk1 foreign key(candidate_id) references basicdetails(candidate_id)
);
ALTER TABLE experience ADD PRIMARY KEY (candidate_id,companyname);
drop table experience;
ALTER TABLE Experience
RENAME TO experience;
-- -------------------------Language Know-------------------------
-- CREATE TABLE LanguageMaster(
-- language_id int not null,
-- languageName varchar(20),
-- primary key(language_id));

-- desc LanguageMaster;
-- drop table LanguageMaster;

CREATE TABLE knownlanguage(
candidate_id int not null,
knownlanguage_id varchar(15) not null,
language_read BOOLEAN,
language_write BOOLEAN,
language_speak BOOLEAN,
primary key(candidate_id,knownlanguage_id),
CONSTRAINT knownlanguage_fk1 foreign key(knownlanguage_id) references optionmaster(option_id),
CONSTRAINT knownlanguage_fk2 foreign key(candidate_id) references basicdetails(candidate_id));

drop table knownlanguage;
ALTER TABLE KnownLanguage
RENAME TO knownlanguage;

-- ------------------------------Technologies Know---------------------------------
-- CREATE TABLE TechnologyMaster(
-- technology_id int not null,
-- technologyName varchar(20),
-- primary key(technology_id));

-- desc TechnologyMaster;
-- drop table TechnologyMaster;

CREATE TABLE knowntechnology(
candidate_id int not null,
knowntechnology_id varchar(15) not null,
technologyProficiency varchar(10) not null,
CONSTRAINT knowntechnology_fk1 foreign key(knowntechnology_id) references optionmaster(option_id),
CONSTRAINT knowntechnology_fk2 foreign key(candidate_id) references basicdetails(candidate_id));

ALTER TABLE knowntechnology ADD PRIMARY KEY(candidate_id,knowntechnology_id);
drop table knowntechnology;
alter table KnownTechnology
rename to knowntechnology;

-- -------------------------------Reference Contact--------------------------
CREATE TABLE referencecontact(
candidate_id int not null,
referencePersonName varchar(20),
referencePersonnumber char(10),
relationWithReferencePerson varchar(20),
CONSTRAINT referencecontact_fk1 foreign key(candidate_id) references basicdetails(candidate_id));

ALTER TABLE referencecontact ADD PRIMARY KEY(candidate_id,referencePersonnumber);

drop table referencecontact;
alter table ReferenceContact
rename to referencecontact;
select * from referencecontact;
-- ---------------Departments-------------------------
-- CREATE TABLE DepartmentsMaster(
-- department_id int not null,
-- departmentName varchar(25) not null,
-- PRIMARY KEY(department_id));

-- desc DepartmentsMaster;
-- drop table DepartmentsMaster;


-- ---------------Location----------------------------
-- CREATE TABLE LocationMaster(
-- location_id int not null,
-- locationName varchar(25) not null,
-- PRIMARY KEY(location_id));

-- desc LocationMaster;
-- drop table LocationMaster;
-- ---------------Preferances-------------------------
CREATE TABLE preferances(
candidate_id int not null,
preferedLocation varchar(15) not null, 
noticePeriod int,
expactedCTC int,
currentCTC int,
department varchar(15) not null,
CONSTRAINT preferances_fk1 foreign key(candidate_id) references basicdetails(candidate_id),
CONSTRAINT preferances_fk2 foreign key(preferedLocation) references optionmaster(option_id),
CONSTRAINT preferances_fk3 foreign key(department) references optionmaster(option_id));

ALTER TABLE preferances ADD PRIMARY KEY (candidate_id,preferedLocation,department); 
select * from preferances;
drop table preferances;
alter table Preferances
rename to preferances;

-- -------------------------------------INSERT Query---------------------------------------------- 

-- ---------------------------insert into SelectMaster---------------------------------------------
INSERT INTO selectmaster(select_id,select_name)
VALUES(1,'Language'),
(2,'Department'),
(3,'PreferedLocation'),
(4,'Technologies');

select * from selectmaster;
INSERT INTO selectmaster(select_id,select_name)
VALUES(5,'CourseName');

INSERT INTO selectmaster(select_id,select_name)
VALUES(6,'Gender');

INSERT INTO selectmaster(select_id,select_name)
VALUES(7,'RelationShipStatus');


-- ---------------------------insert into OptionMaster---------------------------------------------
INSERT INTO optionmaster(option_id,select_id,option_name)
VALUES('L1',1,'Hindi'),
('L2',1,'English'),
('L3',1,'Gujarati'),
('D1',2,'Development'),
('D2',2,'Design'),
('D3',2,'Marketing'),
('PL1',3,'Ahmedabad'),
('PL2',3,'Rajkot'),
('T1',4,'PHP'),
('T2',4,'MySQL'),
('T3',4,'Angular'),
('T4',4,'React');

INSERT INTO optionmaster(option_id,select_id,option_name)
VALUES('C1',5,'SSC'),
('C2',5,'HSC/Diploma'),
('C3',5,'Bachelor Degree'),		
('C4',5,'Master Degree');

INSERT INTO optionmaster(option_id,select_id,option_name)
VALUES('G1',6,'Male'),
('G2',6,'Female');

INSERT INTO optionmaster(option_id,select_id,option_name)
VALUES('R1',7,'Single'),
('R2',7,'Married');

-- ---------------------------insert into state master------------------------------------
INSERT INTO statemaster(state_id,state_name)
VALUES(01,'Andaman & Nicobar'),
(02,'Andhra Pradesh'),
(03,'Arunachal Pradesh '),
(04,'Assam'),
(05,'Bihar'),
(06,'Chandigarh'),
(07,'Dadra & Nagar Haveli '),
(08,'Delhi'),
(09,'Goa, Daman & Diu '),
(10,'Gujarat'),
(11,'Haryana'),
(12,'Himachal Pradesh '),
(13,'Jammu & Kashmir '),
(14,'Kerala'),
(15,'Lakshadweep'),
(16,'Madhya Pradesh '),
(17,'Maharashtra'),
(18,'Manipur'),
(19,'Meghalaya'),
(20,'Karnataka'),
(21,'Nagaland'),
(22,'Orissa'),
(23,'Pondicherry'),
(24,'Punjab'),
(25,'Rajasthan'),
(26,'Tamil Nadu '),
(27,'Tripura'),
(28,'Uttar Pradesh '),
(29,'West Bengal '),
(30,'Sikkim '),
(31,'Mizoram ');


-- ---------------------------insert into basic details-------------------------------------------

INSERT INTO basicdetails(candidate_id,firstname,lastname,designation,email,address1,address2,phonenumber,city,state,gender,zipcode,relationshipstatus,dob) 
VALUES(1,'Vasu','Parsaniya','student','vasuparsaniya45@gmail.com','Zinzri','Manavadar','9586606859','Junagadh',10,'G1','362640','R1','2002-11-21'),
(2,'Raj','Sharma','student','rajsharma@gmail.com','Bopal','Science City','9687456981','Ahmedabad',10,'G1','380001','R1','2003-01-01'),
(3,'Decoster','Sharma','student','decostersharma@gmail.com','bhuj-1','bhuj-2','8756895456','Kuth',10,'G1','370485','R1','2002-12-21'),
(4,'Ram','Varma','employee','ramverma@gmail.com','near gurukul','Manavadar','6565658585','Junagadh',10,'G1','362642','R1','2001-10-01'),
(5,'Shyam','Parsaniya','student','shdyamparsaniya@gmail.com','umiya chowk','near school','8787898554','Rajkot',10,'G1','362650','R1','2004-3-23'),
(6,'Kunj','Savani','student','kunjsavani@gmail.com','nana mauva','near mota mauva','9586606855','Rajkot',10,'G1','362680','R1','2004-11-21'),
(7,'vatshal','Kumar','student','vatshalkumar@gmail.com','near mandir','Manavadar','9586606889','Nashik',17,'G1','362740','R1','2005-11-21'),
(8,'Radhu','Parsania','student','radhuparsania@gmail.com','near solarish','Manavadar-4','9687545989','Vadodara',10,'G2','366740','R1','2001-10-21'),
(9,'Kumar','Shah','student','kumarshah@gmail.com','pajod','Manavadar','6887855852','Junagadh',10,'G1','361640','R1','2003-10-28'),
(10,'VasuKumar','Verma','student','vasukumarverma@gmail.com','Zinzri','Manavadar','9586606852','Junagadh',10,'G1','362640','R1','2002-11-21'),
(11,'Rajkumar','Shah','student','rajkumarshah@gmail.com','near air port','zinzri-1','9586546871','Rajkot',10,'G1','365452','R1','2004-01-01'),
(12,'Keyur','Purohit','student','keyurpurohit@gmail.com','ITI Road','Vidhyanagar','9785606859','Bhavnagar',10,'G1','364001','R1','2001-11-21'),
(13,'Ramesh','Kumar','student','ramesh@gmail.com','Zinzri','Manavadar','9586606159','Junagadh',10,'G1','362640','R2','2002-11-21'),
(14,'keyuri','Kumar','student','keyurikumar@gmail.com','Zinzri','Manavadar','9586686859','Junagadh',10,'G1','362640','R2','2002-11-21'),
(15,'Yug','Savani','student','yugsavani@gmail.com','una-3','near school','8587866569','Una',10,'G1','362670','R1','2003-11-21'),
(16,'Harsh','Savani','student','harshsavani@gmail.com','near nana muava','mota mauva','9586606860','Rajkot',10,'G1','362640','R1','2002-11-21'),
(17,'Harsh','Patel','student','harshpatel@gmail.com','Zinzri','Manavadar','9586606859','Junagadh',10,'G1','362640','R1','2002-11-21'),
(18,'Vasu','Patel','student','vasupatel@gmail.com','Zinzri','Manavadar','9586606870','Junagadh',10,'G1','362640','R1','2002-11-21'),
(19,'Vasukumar','Panshuriya','student','vasupanshuriya@gmail.com','Zinzri','Manavadar','9586606880','Junagadh',10,'G1','362640','R1','2002-11-21'),
(20,'Tej','Patel','student','tejpatel@gmail.com','rajkot','Manavadar-5','9586856859','Junagadh',10,'G1','362640','R2','2002-11-21'),
(21,'Tej','Verma','student','tejverma@gmail.com','Zinzri','Manavadar','9786606859','Junagadh',10,'G1','362640','R1','2002-11-21'),
(22,'Rajeshkumar','Parsaniya','student','rajeshkumar@gmail.com','Zinzri','Manavadar','9586606859','Junagadh',10,'G1','362640','R1','2002-11-21'),
(23,'Shyamkumar','Parsaniya','student','shyamparsaniya@gmail.com','Zinzri','Manavadar','9586606859','Junagadh',10,'G1','362640','R1','2002-11-21'),
(24,'Rakesh','Parsaniya','student','rakeshparsaniya@gmail.com','Zinzri','Manavadar','9586608759','Junagadh',10,'G1','362640','R1','2005-11-21'),
(25,'Isha','Patel','student','ishapatl@gmail.com','Zinzri-4','Manavadar','9876543212','Junagadh',10,'G2','362640','R1','2003-5-26');

-- ---------------------------------------------Education Details-------------------------------------------
INSERT INTO educationdetails(candidate_id,option_id,nameOfCourse,nameOfBoard_Or_Univarsity,passingyear,percentage)
VALUE(1,'C1','SSC','GSEB','2018','83.17'),
(1,'C2','HSC','GSEB','2020','74'),
(1,'C3','BE-IT','GTU','2024','74'),
(2,'C1','SSC','GSEB','2017','70'),
(2,'C2','HSC','CBSE','2019','71'),
(2,'C3','BSC-IT','GTU','2018','60'),
(3,'C1','SSC','GSEB','2016','75'),
(3,'C2','HSC','GSEB','2018','72'),
(3,'C3','BSC-IT','DDU','2022','67'),
(3,'C4','MSC-IT','DDU','2024','72'),
(4,'C1','SSC','CBSE','2012','72'),
(4,'C2','HSC','CBSE','2014','62'),
(4,'C3','BE-IT','GTU','2018','65'),
(5,'C1','SSC','GSEB','2014','65'),
(5,'C2','HSC','GSEB','2016','60'),
(5,'C3','BE-CE','GTU','2020','65'),
(6,'C1','SSC','GSEB','2020','78'),
(6,'C2','HSC','GSEB','2022','58'),
(6,'C3','BE-CE','DDU','2026','85'),
(7,'C1','SSC','GSEB','2016','78'),
(7,'C2','HSC','GSEB','2018','68'),
(7,'C3','BE-CE','DDU','2022','65'),
(8,'C1','SSC','GSEB','2017','79'),
(8,'C2','HSC','GSEB','2019','69'),
(8,'C3','BE-IT','GTU','2023','68'),
(9,'C1','SSC','GSEB','2014','98'),
(9,'C2','HSC','GSEB','2016','88'),
(9,'C3','BE-CE','DDU','2020','75'),
(10,'C1','SSC','GSEB','2018','78'),
(10,'C2','HSC','GSEB','2020','68'),
(10,'C3','BE-CE','DDU','2024','65'),
(11,'C1','SSC','CBSE','2015','78'),
(11,'C2','HSC','GSEB','2017','68'),
(11,'C3','BE-CE','DDU','2021','65'),
(12,'C1','SSC','GSEB','2018','78'),
(12,'C2','HSC','GSEB','2020','68'),
(12,'C3','BE-CE','DDU','2024','65'),
(13,'C1','SSC','GSEB','2018','85'),
(13,'C2','HSC','GSEB','2020','52'),
(13,'C3','BE-CE','DDU','2024','75'),
(14,'C1','SSC','GSEB','2017','78'),
(14,'C2','HSC','GSEB','2017','68'),
(14,'C3','BE-CE','DDU','2021','65'),
(15,'C1','SSC','GSEB','2018','78'),
(15,'C2','HSC','GSEB','2020','68'),
(15,'C3','BE-CE','DDU','2024','65'),
(16,'C1','SSC','GSEB','2017','58'),
(16,'C2','HSC','GSEB','2019','78'),
(16,'C3','BE-CE','DDU','2023','55'),
(17,'C1','SSC','GSEB','2018','78'),
(17,'C2','HSC','GSEB','2020','68'),
(17,'C3','BE-CE','DDU','2024','65'),
(18,'C1','SSC','GSEB','2012','98'),
(18,'C2','HSC','GSEB','2014','58'),
(18,'C3','BE-CE','DDU','2018','55'),
(19,'C1','SSC','GSEB','2018','78'),
(19,'C2','HSC','GSEB','2020','68'),
(19,'C3','BE-CE','DDU','2024','65'),
(20,'C1','SSC','GSEB','2018','78'),
(20,'C2','HSC','GSEB','2020','68'),
(20,'C3','BE-CE','DDU','2024','65'),
(21,'C1','SSC','GSEB','2018','78'),
(21,'C2','HSC','GSEB','2020','68'),
(21,'C3','BE-CE','DDU','2024','65'),
(22,'C1','SSC','GSEB','2020','68'),
(22,'C2','HSC','GSEB','2022','78'),
(22,'C3','BE-IT','GTU','2026','85'),
(23,'C1','SSC','GSEB','2018','78'),
(23,'C2','HSC','GSEB','2020','68'),
(23,'C3','BE-EC','DDU','2024','75'),
(24,'C1','SSC','GSEB','2018','76'),
(24,'C2','HSC','GSEB','2020','88'),
(24,'C3','BE-IT','PDPU','2024','65'),
(25,'C1','SSC','CBSE','2018','58'),
(25,'C2','HSC','CBSE','2020','78'),
(25,'C3','BE-IT','GTU','2024','85');
-- INSERT INTO SSCResult(candidate_id,nameOfBoard,passingyear,percentage) VALUES(1,'GSEB','2018','83.17');
-- INSERT INTO SSCResult(candidate_id,nameOfBoard,passingyear,percentage) 
-- VALUES(2,'GSEB','2011','50.00'),
-- (3,'CBSE','2015','90.00'),
-- (4,'GSEB','2011','60.00'),
-- (5,'GSEB','2015','70.00'),
-- (6,'GSEB','2011','50.00'),
-- (7,'GSEB','2011','50.00'),
-- (8,'GSEB','2011','50.00'),
-- (9,'CBSE','2009','70.00'),
-- (10,'GSEB','2018','80.00'),
-- (11,'GSEB','2012','40.00'),
-- (12,'GSEB','2011','70.00'),
-- (13,'CBSE','2016','56.00'),
-- (14,'GSEB','2011','50.00'),
-- (15,'GSEB','2011','52.00'),
-- (16,'GSEB','2011','87.00'),
-- (17,'GSEB','2011','54.00'),
-- (18,'CBSE','2011','50.00'),
-- (19,'GSEB','2011','50.00'),
-- (20,'GSEB','2015','50.00'),
-- (21,'CBSE','2012','77.00'),
-- (22,'GSEB','2019','50.00'),
-- (23,'GSEB','2011','76.00'),
-- (24,'GSEB','2018','50.00'),
-- (25,'GSEB','2011','80.00');


-- INSERT INTO HSC_Or_Diploma_Result(candidate_id,nameOfBoard,passingyear,percentage) 
-- VALUES(1,'GSEB','2020','74.00'),
-- (2,'GSEB','2013','70.00'),
-- (3,'CBSE','2017','80.00'),
-- (4,'GSEB','2013','70.00'),
-- (5,'GSEB','2017','60.00'),
-- (6,'GSEB','2013','80.00'),
-- (7,'GSEB','2013','90.00'),
-- (8,'GSEB','2013','60.00'),
-- (9,'CBSE','2011','75.00'),
-- (10,'GSEB','2020','90.00'),
-- (11,'GSEB','2014','70.00'),
-- (12,'GSEB','2013','80.00'),
-- (13,'CBSE','2018','56.00'),
-- (14,'GSEB','2013','50.00'),
-- (15,'GSEB','2013','52.00'),
-- (16,'GSEB','2013','87.00'),
-- (17,'GSEB','2013','54.00'),
-- (18,'CBSE','2013','58.00'),
-- (19,'GSEB','2013','55.00'),
-- (20,'GSEB','2017','50.00'),
-- (21,'CBSE','2014','77.00'),
-- (22,'GSEB','2021','50.00'),
-- (23,'GSEB','2013','76.00'),
-- (24,'GSEB','2020','50.00'),
-- (25,'GSEB','2013','80.00');

-- DROP TABLE HSC_Or_Diploma_Result;

-- INSERT INTO BachelorDegree(candidate_id,coursename,university,passingyear,percentage) 
-- VALUES(1,'GTU','IT','2024','72.00'),
-- (2,'DDU','CE','2017','70.00'),
-- (3,'GTU','Mechanical','2021','87.00'),
-- (4,'GMIT','EC','2013','78.00'),
-- (5,'GTU','IT','2021','70.00'),
-- (6,'DDU','CE','2017','80.00'),
-- (7,'GTU','CE','2017','50.00'),
-- (8,'DDU','IT','2017','65.00'),
-- (9,'GTU','CBSE','2019','75.00'),
-- (10,'DDU','Mechanical','2024','95.00'),
-- (11,'GTU','IT','2018','71.00'),
-- (12,'DDU','CE','2017','83.00'),
-- (13,'GTU','IT','2022','66.00'),
-- (14,'DDU','Mechanical','2017','80.00'),
-- (15,'GTU','IT','2017','58.00'),
-- (16,'GMIT','CE','2017','77.00'),
-- (17,'PDPU','CE','2017','84.00'),
-- (18,'PDPU','IT','2017','78.00'),
-- (19,'GTU','IT','2021','95.00'),
-- (20,'GTU','CE','2021','50.00'),
-- (21,'GTU','Mechanical','2020','78.00'),
-- (22,'PDPU','IT','2025','70.00'),
-- (23,'GTU','CE','2021','76.00'),
-- (24,'GTU','IT','2028','50.00'),
-- (25,'DDU','IT','2017','80.00');



-- INSERT INTO MasterDegree(candidate_id,coursename,university,passingyear,percentage) 
-- VALUES(1,'GTU','IT','2026','82.00'),
-- (21,'GTU','Mechanical','2022','78.00'),
-- (22,'PDPU','IT','2027','70.00'),
-- (23,'GTU','CE','2023','76.00'),
-- (24,'GTU','IT','2030','50.00'),
-- (25,'DDU','IT','2019','80.00');


-- -------------------------------Experience----------------------------
INSERT INTO experience(candidate_id,companyname,designation,dateFrom,dateTo) 
VALUES(1,'abc','Software Developer','2021-01-01','2022-02-03'),
(2,'def','Software Developer','2020-01-01','2022-02-03'),
(3,'TCS','Software Developer','2019-01-01','2022-02-03'),
(4,'qpi','Software Developer','2018-01-01','2022-02-03'),
(5,'wxy','Software Developer','2020-01-01','2022-02-03');


-- -------------------Language Know-------------------------------------
-- INSERT INTO LanguageMaster(language_id,languagename) 
-- VALUES(101,'Hindi'),
-- (102,'English'),
-- (103,'Gujarati');

INSERT INTO knownlanguage(candidate_id,knownlanguage_id,language_read,language_write,language_speak)
VALUES(1,'L1',1,1,1),
(1,'L2',1,1,1),	
(1,'L3',1,1,1),
(2,'L1',1,0,0),
(2,'L2',0,0,1),
(3,'L1',1,0,1),
(3,'L3',1,0,1),
(4,'L1',0,0,1),
(4,'L2',0,0,1),
(4,'L3',0,0,1),
(5,'L1',0,0,1),
(5,'L2',0,0,1),
(6,'L1',1,1,1),
(6,'L2',1,1,1),
(6,'L3',1,1,1),
(7,'L1',1,1,1),
(7,'L2',1,1,1),
(7,'L3',1,1,1),
(8,'L1',1,1,1),
(8,'L2',1,1,1),
(8,'L3',1,1,1),
(9,'L1',1,1,1),
(9,'L2',1,0,1),
(9,'L3',1,1,1),
(10,'L1',1,0,1),
(10,'L2',1,1,1),
(10,'L3',1,1,1),
(11,'L1',1,0,1),
(11,'L2',1,1,1),
(11,'L3',0,1,1),
(12,'L1',1,1,1),
(12,'L2',1,1,1),
(12,'L3',1,1,1),
(13,'L1',1,1,1),
(13,'L2',1,1,1),
(13,'L3',1,1,1),
(14,'L1',1,1,1),
(14,'L2',1,1,1),
(14,'L3',1,1,1),
(15,'L1',1,1,1),
(15,'L2',1,1,1),
(15,'L3',1,1,1),
(16,'L1',1,1,1),
(16,'L2',1,1,1),
(16,'L3',1,1,1),
(17,'L2',1,1,1),
(17,'L3',1,1,1),
(17,'L1',1,1,1),
(18,'L2',1,1,1),
(18,'L3',1,1,1),
(18,'L1',1,1,1),
(19,'L2',1,1,1),
(19,'L3',1,1,1),
(19,'L1',1,1,1),
(20,'L2',1,1,1),
(20,'L3',1,1,1),
(20,'L1',1,1,1),
(21,'L1',1,0,1),
(21,'L2',1,1,1),
(21,'L3',1,1,1),
(22,'L1',1,0,1),
(22,'L2',1,1,1),
(22,'L3',1,1,1),
(23,'L1',0,1,1),
(23,'L2',1,1,1),
(23,'L3',1,1,1),
(24,'L1',1,0,1),
(24,'L2',1,1,1),
(24,'L3',0,1,1),
(25,'L1',1,1,1),
(25,'L2',1,1,1),
(25,'L3',0,1,1);

-- INSERT INTO TechnologyMaster(technology_id,technologyName) 
-- VALUES(201,'MySQL'),
-- (202,'PHP'),
-- (203,'NodeJs'),
-- (204,'Angular');

INSERT INTO knowntechnology(candidate_id,knowntechnology_id,technologyProficiency)
VALUES(1,'T1','Beginer'),(1,'T2','Medeator'),(1,'T3','Expert'),(1,'T4','Beginer'),
(2,'T1','Beginer'),(2,'T2','Medeator'),(2,'T3','Expert'),(2,'T4','Beginer'),
(3,'T1','Beginer'),(3,'T2','Medeator'),(3,'T3','Expert'),(3,'T4','Beginer'),
(4,'T1','Beginer'),(4,'T2','Medeator'),(4,'T3','Expert'),(4,'T4','Beginer'),
(5,'T1','Beginer'),(5,'T2','Medeator'),(5,'T3','Expert'),(5,'T4','Beginer'),
(6,'T1','Beginer'),(6,'T2','Medeator'),(6,'T3','Expert'),(6,'T4','Beginer'),
(7,'T1','Beginer'),(7,'T2','Medeator'),(7,'T3','Expert'),(7,'T4','Beginer'),
(8,'T1','Beginer'),(8,'T2','Medeator'),(8,'T3','Expert'),(8,'T4','Beginer'),
(9,'T1','Beginer'),(9,'T2','Medeator'),(9,'T3','Expert'),(9,'T4','Beginer'),
(10,'T1','Beginer'),(10,'T2','Medeator'),(10,'T3','Expert'),(10,'T4','Beginer'),
(11,'T1','Beginer'),(11,'T2','Medeator'),(11,'T3','Expert'),(11,'T4','Beginer'),
(12,'T1','Beginer'),(12,'T2','Medeator'),(12,'T3','Expert'),(12,'T4','Beginer'),
(13,'T1','Beginer'),(13,'T2','Medeator'),(13,'T3','Expert'),(13,'T4','Beginer'),
(14,'T1','Beginer'),(14,'T2','Medeator'),(14,'T3','Expert'),(14,'T4','Beginer'),
(15,'T1','Beginer'),(15,'T2','Medeator'),(15,'T3','Expert'),(15,'T4','Beginer'),
(16,'T1','Beginer'),(16,'T2','Medeator'),(16,'T3','Expert'),(16,'T4','Beginer'),
(17,'T1','Beginer'),(17,'T2','Medeator'),(17,'T3','Expert'),(17,'T4','Beginer'),
(18,'T1','Beginer'),(18,'T2','Medeator'),(18,'T3','Expert'),(18,'T4','Beginer'),
(19,'T1','Beginer'),(19,'T2','Medeator'),(19,'T3','Expert'),(19,'T4','Beginer'),
(20,'T1','Beginer'),(20,'T2','Medeator'),(20,'T3','Expert'),(20,'T4','Beginer'),
(21,'T1','Beginer'),(21,'T2','Medeator'),(21,'T3','Expert'),(21,'T4','Beginer'),
(22,'T1','Beginer'),(22,'T2','Medeator'),(22,'T3','Expert'),(22,'T4','Beginer'),
(23,'T1','Beginer'),(23,'T2','Medeator'),(23,'T3','Expert'),(23,'T4','Beginer'),
(24,'T1','Beginer'),(24,'T2','Medeator'),(24,'T3','Expert'),(24,'T4','Beginer'),
(25,'T1','Beginer'),(25,'T2','Medeator'),(25,'T3','Expert'),(25,'T4','Beginer');


INSERT INTO referencecontact(candidate_id,referencePersonName,referencePersonnumber,relationWithReferencePerson)
VALUES(1,'Vijay','9586785412','senior in college'),
(2,'Raj','9876543210','Brother'),
(24,'Harsh','9576785412','senior in college'),
(25,'Kunj','9586785454','senior in college');


-- INSERT INTO DepartmentsMaster(department_id,departmentName)
-- VALUES(301,'Software Development'),
-- (302,'Design'),
-- (303,'Marketing'),
-- (304,'DevOps Engineer');


-- INSERT INTO LocationMaster(location_id,locationName)
-- VALUES(401,'Ahmedabad'),
-- (402,'Rajkot');


INSERT INTO preferances(candidate_id,preferedLocation,noticePeriod,expactedCTC,currentCTC,department)
VALUES(1,'PL1',2,600000,400000,'D1'),
(2,'PL2',2,600000,400000,'D2'),
(3,'PL1',1,400000,300000,'D3'),
(4,'PL2',2,500000,200000,'D1'),
(5,'PL1',2,400000,200000,'D1'),
(6,'PL1',2,500000,350000,'D3'),
(7,'PL2',2,750000,400000,'D1'),
(8,'PL1',2,600000,400000,'D2'),
(9,'PL1',2,600000,400000,'D3'),
(10,'PL1',2,950000,400000,'D1'),
(11,'PL1',2,600000,400000,'D1'),
(12,'PL2',2,600000,400000,'D1'),
(13,'PL2',2,600000,320000,'D2'),
(14,'PL2',2,600000,410000,'D3'),
(15,'PL2',2,600000,200000,'D2'),
(16,'PL1',2,450000,400000,'D1'),
(17,'PL1',2,600000,100000,'D2'),
(18,'PL2',2,850000,400000,'D1'),
(19,'PL1',2,600000,480000,'D2'),
(20,'PL1',2,600000,400000,'D1'),
(21,'PL1',2,600000,400000,'D1'),
(22,'PL2',2,600000,400000,'D1'),
(23,'PL1',2,600000,400000,'D1'),
(24,'PL1',2,650000,400000,'D1'),
(25,'PL1',2,450000,400000,'D1');

DELETE FROM Preferances;



-- ------------------------------Execute------------------------------------
-- SELECT BasicDetails.firstname,BasicDetails.lastname,
-- BasicDetails.designation,
-- BasicDetails.email,
-- BasicDetails.address1,
-- BasicDetails.address2,
-- BasicDetails.phonenumber,
-- BasicDetails.city,
-- BasicDetails.state,
-- BasicDetails.gender,
-- BasicDetails.zipcode,
-- BasicDetails.relationshipstatus,
-- BasicDetails.dob ,LocationMaster.locationName, DepartmentsMaster.departmentName
-- FROM Preferances
-- INNER JOIN BasicDetails
-- ON BasicDetails.candidate_id = Preferances.candidate_id
-- INNER JOIN LocationMaster
-- ON LocationMaster.location_id = Preferances.preferedLocation
-- INNER JOIN DepartmentsMaster
-- ON DepartmentsMaster.department_id = Preferances.department
-- WHERE Preferances.candidate_id = 1;