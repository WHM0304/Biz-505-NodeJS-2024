import express, { urlencoded } from "express";
const router = express.Router();

// localhost:3000/memo
router.get("/", (req, res) => {
  res.render("memo");
});

router.get("/write", (req, res) => {
  //   res.send("Memo Writer");
  return res.json();
});
export default router;
