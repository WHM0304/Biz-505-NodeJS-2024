import express from "express";
const router = express.Router();

/* GET users listing. */
router.get("/", async (req, res, next) => {
  const st_name = req.query.name || "이름을 전달해 주세요";
  const st_grade = req.query.grade || 0;
  const st_dept = req.query.dept || "학과를 전달해 주세요";
  const student = {
    name: st_name,
    dept: st_dept,
    grade: st_grade,
  };
  /**
   * req 할내용을 st_변수 에 할당하고 그 값을 users 항목의 인풋 이름들의 변수에 할당
   * 이후에 users에 req를 보내고 res값을 3가지 값을 출력해주기
   */
  res.render("users", student);
});

router.post("/", async (req, res) => {
  const { name, grade, dept } = req.body;
  /**
   * 리퀘스트바디에서 받은 값을 name, grade, dept 에 할당하기
   * 이후 res에 랜더링 하기
   * req 를 users에 하고 name,grade, dept 값 할당받기
   */
  res.render("users", { name, grade, dept });
});

export default router;
