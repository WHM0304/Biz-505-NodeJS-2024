/**
 * express 프레임워크를 사용하여
 * router 객체 생성
 */
import express from "express";

const router = express.Router();

// localhost:3000/student/
router.get("/", async (req, res) => {
  // res.send("hello"); : 문자열을 아무런 가공, 디자인 없이 그대로 client 에서 응답하기
  res.render("student/list");
});

router.get("/insert", async (req, res) => {
  res.render("student/input");
});

// router 객체를 다른곳에서 import 할수 있도록 export 하기
export default router;
