import express from "express";
import DB from "../config/mysql.js";

const router = express.Router();
/**
 * DB 연결을 시도하는 DB.init() 함수는 async 키워드가 부착되었다
 * 이 함수는 동기방식으로 실행되는데
 * 일반적인 변수 = DB.init() 방식으로 return 값을 받을수 없다
 * DB.init() 함수의 return 값은 .then() 함수를 통해서 받아야 한다
 */
let dbConn = null;
// init() 함수에 async 가 설정되어 동기식으로 작동된다
// 이 함수의 return 값을 받기 위해서는 .then() 함수를 통하여 받아야 한다
DB.init().then((connection) => {
  dbConn = connection;
});
console.log("dbConn", dbConn);

// 비동기 방식 init() 동기방식
// const dbConn = DB.init();

router.get("/", (req, res) => {
  const sql = " SELECT * FROM tbl_books ";
  dbConn
    // query() 함수를 동기방식으로 진행
    .query(sql)
    // query() 함수 실행완료되면 .then() 함수에게 결과를 전달한다
    .then((rows) => {
      // console.log(rows);
      // return res.render("books/main", { BODY: "LIST", books: rows[0] });
      return res.render("books/list", { books: rows[0] });
    })
    // 만약 실행중에 오류가 발생하면 .catch() 함수에게 결과를 전달한다
    .catch((err) => {
      // 캐치 err 에서는 message code errno sql 를 가지고있다
      return res.render("db_error", err);
    });
});
router.get("/insert", (req, res) => {
  // return res.render("books/main", { BODY: "INPUT" });
  return res.render("books/input");
});

router.post("/insert", (req, res) => {
  // mysql2 dependency 도구가 지원하는 확장된 INSERT 구문
  // 이 SQL 은 표준 SQL 이 아님
  const sql = " INSERT INTO tbl_books SET ? ";
  // 배열이 아닌 json data
  const params = {
    isbn: req.body.isbn,
    title: req.body.title,
    publisher: req.body.publisher,
    author: req.body.author,
    // Number : 문자열형 을 숫자형으로 변형
    price: Number(req.body.price),
    discount: Number(req.body.discount),
  };
  // return res.json(params);
  dbConn
    .query(sql, params)
    .then((_) => {
      return res.redirect("/books");
    })
    .catch((err) => {
      return res.render("db_error", err);
    });
});

router.get("/:isbn/detail", (req, res) => {
  const isbn = req.params.isbn;
  const sql = " SELECT * FROM tbl_books WHERE isbn = ? ";
  dbConn
    .query(sql, isbn)
    .then((rows) => {
      // return res.json(rows[0][0]);
      return res.render("books/detail1", { book: rows[0][0] });
    })
    .catch((err) => {
      return res.json(err);
    });

  // return res.json(isbn);
});

router.get("/:isbn/delete", (req, res) => {
  const isbn = req.params.isbn;
  const sql = " DELETE FROM tbl_books WHERE isbn = ? ";
  dbConn
    .query(sql, isbn)
    .then((_) => {
      return res.redirect("/books");
    })
    .catch((err) => {
      return res.render("db_error", err);
    });
});

router.get("/:isbn/update", (req, res) => {
  const isbn = req.params.isbn;
  const sql = " SELECT * FROM tbl_books WHERE isbn=? ";
  dbConn
    .query(sql, isbn)
    .then((rows) => {
      return res.render("books/input", { book: rows[0][0] });
    })
    .catch((err) => {
      return res.render("db_error", err);
    });
});
export default router;