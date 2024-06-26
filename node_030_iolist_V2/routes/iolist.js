import express from "express";
const router = express.Router();

// DB 추가하기
import DB from "../models/index.js";
const IOLIST = DB.models.tbl_iolist;
const DEPTS = DB.models.tbl_depts;
const PRODUCTS = DB.models.tbl_products;

router.get("/", async (req, res) => {
  try {
    const rows = await IOLIST.findAll({
      include: [
        { model: PRODUCTS, as: "IO_상품" },
        { model: DEPTS, as: "IO_거래처" },
      ],
    });
    // return res.json(rows);
    res.render("iolist/list", { IOLIST: rows });
  } catch (error) {
    return res.json(error);
  }
});

router.get("/insert", (req, res) => {
  const user = req.session?.user;
  if (user) {
    return res.render("iolist/input");
  } else {
    const message = "로그인이 필요한 서비스 입니다";
    return res.redirect(`/users/login?fail=${message}`);
  }
});

router.get("/:io_seq/detail", async (req, res) => {
  const seq = req.params.io_seq;
  const row = await IOLIST.findByPk(seq);
  return res.render("iolist/detail", { IO_ITEM: row });
});

router.get("/count", async (req, res) => {
  const rows = await IOLIST.findAll();
  return res.json({ count: rows.length });
});

router.get("/:io_seq/delete", async (req, res) => {
  const seq = req.params.io_seq;
  const row = await IOLIST.findByPk(seq);
  row.io_delete = 1;
  await row.save();
  return res.redirect("/iolist");
});
router.post("/insert", async (req, res) => {
  let io_seq = req.body.io_seq;
  let io_div = req.body.io_div;
  let io_quan = req.body.io_quan;
  let io_price = req.body.io_price;
  console.log(io_seq, req.body.io_div);
});

export default router;
