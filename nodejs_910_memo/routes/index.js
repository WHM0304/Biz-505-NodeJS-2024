import express from "express";
import moment from "moment";
import DB from "../models/index.js";
import { upLoad } from "../modules/fileupload.js";
const MEMOS = DB.models.tbl_memos;
const router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  /**
   * moment 를 사용하여 현재 날짜와 시간을 문자열로 getter
   */
  const toDate = moment().format("YYYY-MM-DD");
  const toTime = moment().format("hh:mm:ss");

  try {
    const rows = await MEMOS.findAll();
    return res.render("index", { MEMOS: rows, toDate, toTime });
  } catch (error) {
    return res.json(error);
  }
  // index.pug 를 rendering 할때 사용하도록 보내주기
});

router.post("/", upLoad.single("m_image"), async (req, res) => {
  const imageFile = req.file;
  try {
    req.body.m_image = imageFile?.filename;
    req.body.m_author = "whm0304@naver.com";
    await MEMOS.create(req.body);
    return res.redirect("/");
    // return res.json(req.file);
  } catch (error) {
    return res.json(error);
  }
});

//

router.get("/:seq/get", async (req, res) => {
  const seq = req.params.seq;
  const row = await MEMOS.findByPk(seq);
  return res.json(row);
});

//

router.get("/get_new_date", async (req, res) => {
  const toDate = moment().format("YYYY-MM-DD");
  const toTime = moment().format("hh:mm:ss");

  return res.json({ toDate, toTime });
  // JSON 변수(key) 이름과 value 의 이름이 같을때는 한번 생략가능
  // return res.json({ toDate:toDate, toTime :toTime});
});

export default router;
