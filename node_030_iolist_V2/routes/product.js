import express from "express";
import DB from "../models/index.js";
import { json } from "sequelize";
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

router.get("/:pcode/detail", async (req, res) => {
  const pcode = req.params.pcode;
  const row = await PRODUCTS.findByPk(pcode, { include: { model: IOLIST, as: "IOS", include: { model: DEPTS, as: "IO_거래처" } } });
  return res.render("product/detail", { PRODUCT: row });
});

router.get("/:pcode/detail1", async (req, res) => {
  const pcode = req.params.pcode;
  const row = await PRODUCTS.findByPk(pcode, { include: { model: IOLIST, as: "IOS", include: { model: DEPTS, as: "IO_거래처" } } });
  return res.render("product/detail1", { PRODUCT: row });
});

router.get("/insert", async (req, res) => {
  return res.render("product/input");
});
router.post("/insert", async (req, res) => {
  const product_data = req.body;
  const p_code = req.body.p_code;
  try {
    await PRODUCTS.create(product_data, { where: { p_code: p_code } });
    return res.redirect(`/products/${p_code}/detail1`);
  } catch (error) {}
});

router.get("/:pcode/update", async (req, res) => {
  const pcode = req.params.pcode;
  const row = await PRODUCTS.findByPk(pcode);
  return res.render("product/update", { PRODUCT: row });
});

router.post("/:pcode/update", async (req, res) => {
  const pcode = req.params.pcode;
  const data = req.body;
  try {
    await PRODUCTS.update(data, { where: { p_code: pcode } });
    return res.redirect(`/products/${pcode}/detail1`);
  } catch (error) {}
});

router.get("/:pcode/delete", async (req, res) => {
  const pcode = req.params.pcode;
  const rows = await PRODUCTS.findAll({ limit: 10, order: [["p_code", "ASC"]] });
  try {
    await PRODUCTS.destroy({ where: { p_code: pcode } });
    return res.render("product/list", { PRODUCTS: rows });
  } catch (error) {}
});
export default router;
