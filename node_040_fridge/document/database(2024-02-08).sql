CREATE DATABASE fridgeDB;
DROP DATABASE fridgedb;
USE fridgeDB;


CREATE TABLE tbl_product(
p_seq	INT	AUTO_INCREMENT	PRIMARY KEY,
p_fseq INT NOT NULL,
p_name	VARCHAR(125)	NOT NULL	,
p_exdate	VARCHAR(12)	NOT NULL	,
p_quan	INT	NOT NULL	,
p_date	VARCHAR(12)	NOT NULL	,
p_memo VARCHAR(125)
);
CREATE TABLE tbl_fridge(
f_seq	INT	AUTO_INCREMENT	PRIMARY KEY,
f_name	VARCHAR(10)	NOT NULL	,
f_div	VARCHAR(4)		,
f_memo	VARCHAR(125)	,	
f_photo	VARCHAR(255)		
);
-- 오늘날짜에서 10일전부터 임의 날짜에 상품구매
-- 유통기한 : 구입일로 부터 5~ 15 범위의
-- 임의의 날짜로 생성
SELECT *
FROM tbl_product;


