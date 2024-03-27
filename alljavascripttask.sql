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