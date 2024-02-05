import express from "express";
import DB from "../models/index.js";
const router = express.Router();

const PRODUCTS = DB.models.tbl_products;
const IOLIST = DB.models.tbl_iolist;
const DEPTS = DB.models.tbl_depts;

router.get("/", async (req, res) => {
  try {
    const rows = await PRODUCTS.findAll({ limit: 10, order: [["p_code", "ASC"]] });
    return res.render("product/list", { PRODUCTS: rows });
    // return res.json(rows);
  } catch (error) {
    return res.json(error);
  }

  // return res.json(rows);
});

// router.get("/:pcode/detail", async (req, res) => {
//   const pcode = req.params.pcode;
//   const row = await PRODUCTS.findByPk(pcode, { include: { model: IOLIST, as: "IOS", include: { model: DEPTS, as: "IO_거래처" } } });
//   return res.render("product/detail", { PRODUCT: row });
// });

router.get("/:pcode/detail1", async (req, res) => {
  const pcode = req.params.pcode;
  const row = await PRODUCTS.findByPk(pcode, { include: { model: IOLIST, as: "IOS", include: { model: DEPTS, as: "IO_거래처" } } });
  return res.render("product/detail1", { PRODUCT: row });
});

router.get("/insert", async (req, res) => {
  return res.render("product/input");
});
router.post("/insert", async (req, res) => {
  res.json(req.body);
});

export default router;
