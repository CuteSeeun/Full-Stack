use studydb;
select database();
show tables;
drop table user;

drop table if exists user;
-- DDL (create, drop, alter,rename)
create table if not exists  user(
	idx int auto_increment primary key,
    name varchar(30) not null,
    userid varchar(20) not null,
    userpw varchar(20) not null,
    tel varchar(20),
    indate datetime default now()
);
show tables;
desc user;
-- insert into 테이블명(컬럼명1,...) values(값1,...)
insert into user(name,userid,userpw,tel)
values('홍길동','hong','123','010-1111-2222');

select * from user;

-- 데이터 4건이상 삽입하세요
insert into user(name,userid,userpw,tel)
values('김길동','kim','123','010-2111-2222');
insert into user(name,userid,userpw,tel)
values('김철수','kim2','123','010-3111-2222');
insert into user(name,userid,userpw,tel)
values('최희수','choi','123','010-4111-2222');

-- DCL (grant,revoke, commit,rollback)
commit;

select @@autocommit; -- 1 (true) : 자동커밋 
set autocommit=0; -- 수동 커밋으로 변경

select idx, name, tel from user;
-- 회원 인원수 : count(컬럼명)
select count(idx) from user;

insert into user(name,userid,userpw)
values('표길동','pyo','111');
commit;  -- DB 영구히 반영
select * from user;
insert into user(name,userid,userpw)
values('표영희','pyo2','111');
rollback; -- 취소

select * from user;

-- 데이터 삭제
-- delete from 테이블명; ===> 모든 데이터 삭제 
-- delete from 테이블명 where 조건절; 이는 조건에 맞는 레코드만 삭제한다
delete from user;
rollback;
delete from user where idx = 1;
select * from user;
 
 -- 이름이 홍길동인 데이터들을 삭제
 delete from user where name = '홍길동';
 rollback;
 
delete from user where name like '%길동';
-- 이름이 길동으로 끝나는 회원정보 삭제
rollback;

-- 성이 김씨인 회원정보 삭제
delete from user where name like '김%';

-- Udate : 데이터 수정
/*
   - update 테이블명 set 컬럼명1=값1, 컬럼명2=값2, ...;
     이는 모든 데이터를 수정한다
   - update 테이블명 set 컬럼명1=값1, 컬럼명2=값2, ... wherer 조건절;
     이는 조건에 부합하는 데이터를 수정한다
*/

-- 회원번호가 2번인 회원의 userid를 'hong2'로 수정하세요
update user set userid = 'hong2' where idx = 15;
select * from user where idx=15;
commit;

update user set name = '지우개', tel='02-3333-5555';
select * from user;
rollback;

-- R: select 문
-- select 컬럼명1, 컬럼명2, .... 나열 후 from 테이블명;
-- select 컬럼명1, 컬럼명2, .... 나열 후 from 테이블명 where 조건절;
select * from user;

select name from user;

-- userid가 choi인 회원의 이름, 회원번호, 등록일을 가져와 보여주기
select name, idx, indate, userid from user
where userid= 'choi'; 
-- userid에 'o'자가 들어간 회원의 모든 정보를 보여주기
select * from user where userid like '%o%';

-- 연락처가 없는 회원의 모든 정보 보여주기
select * from user where tel = null;
-- = 등호로 비교하면 데이터 가져오지 못한다. null값을 비교할 때는 is null, is not null을 사용해야 한다
select * from user where tel is null;
select * from user where tel is not null;

-- 회원의 번호, 이름, 등록일을 회원번호 내림차순으로 보여주기
-- select * from 테이블명 order by 컬럼명 ASC(오름차순) DESC(내림차순)
select idx, name, indate from user
order by idx desc;

-- 회원의 모든 정보 가져올 때 이름 가나다 순으로, 
-- 같은 이름일 시 번호 내림차순으로 가져오기
select * from user
order by name, idx desc;

-- 회원의 번호, 이름, 등록일을 보여주되 등록일은 년월일만 보여주기
-- %Y : 년도 4자리, %y : 년도 2자리
-- %m : 월, %d : 일
-- %H : 24시간 형식의 시간, %h : 12시간 형식의 시간
-- %i : 분      %s : 초       %p : 오전/오후 AM/PM
select idx, name, indate from user;
select idx, name, date_format(indate, '%Y-%m-%d %p %h:%i:%s') as joindate from user;
-- as 별칭 

-- 회원번호가 5 미만인 회원정보를 보여주되 번호, 이름, 아이디, 등록일(년2자리 월 일)을 보여주기
-- 회원번호 내림차순으로 보여주기
-- 순서 : WGHO 순서 where > group by > having > order by
select idx, name, userid, date_format(indate, '%y %m %d') from user where idx < 13
order by idx desc;

-- idx가 5미만 이거나 userid에 'o'자가 들어간 회원정보를 보여주세요
-- or, and를 사용할 수 있다
select * from user
where idx < 5 or userid like '%o%';

update user set indate = date_format('23-08-01', '%y-%m-%d')
where idx = 11;
select * from user;

-- 23년도에 등록한 회원정보를 보여주기
select * from user where indate like '2023%';
-- 24년도에 등록한 회원정보
select * from user where date_format(indate, '%y') = '24';
-- 24년도 9월에 등록한 회원정보를 보여주되 날짜 내림차순으로 보여주기
select * from user where date_format(indate, '%y-%m') = '24-09';
select * from user where date_format(indate, '%y-%m') = '23-08';

/*
	book 테이블을 생성하기
	isbn int 자동증가
    title varchar(50) -> not null
    publish varchar(50) -> not null
    price int
    image varchar(100) 기본값 'noimage.jpg'
    createdAt datetime 기본값 시스템 현재 시간 
*/
drop table if exists book;
create table if not exists book(
	isbn int auto_increment primary key, -- primary는 null을 허용하지 않으며 유니크하다는거 (not null + unique)
	title varchar(50) not null,
    publish varchar(50) not null,
    price int,
    image varchar(100) default 'noimage.jpg',
	createdAt datetime default now()
);
show tables;
desc book;
-- 컬럼 추가/변경/삭제alter
-- createdAt 컬럼 자료형을 char 수정
-- alter table 테이블명 modify 변경할 컬럼 정보 
alter table book modify createdAt char(10);
desc book;
-- 컬럼명 변경
-- alter table 테이블명 rename column old_컬럼명 to new_컬럼명;
-- 컬럼명 createdAt을 indate로 수정하기

alter table book rename column createdAt to indate;
select * from book;

-- 컬럼 ㅁ추가
-- alter table 테이블명 add 추가할 컬럼정보(컬럼명 자료형)
-- autor 컬럼을 추가하기 varchar(30)
alter table book add author varchar(30) not null;
desc book;

-- 컬럼 삭제
-- alter table 테이블명 drop column 컬럼명
-- author 컬럼을 삭제하기
alter table book drop column author;
desc book;

-- indate의 자료형을 datetime으로 기본값은 now() 사용하도록 수정하기
alter table book modify indate datetime default now();
desc book;

-- book 테이블에 도서 정보 4건 삽입하세요 -> commit 하기
insert into book (title, publish, price)
values('Node 교과서', '길벗', 25000);
select * from book;
insert into book (title, publish, price)
values('Node 재미없어', '대림', 30000);
insert into book (title, publish, price)
values('JavaScript 교과서', '한빛', 35000);
commit;
select * from book;
commit;

set autocommit = 1;
select @@autocommit;


select * from book;

