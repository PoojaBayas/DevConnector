const express = require("express");
const router = express.Router();

//@route GET api/posts/test
//@descr  test post route
//@access public 
router.get("/test", (req, res) => res.json({ msg: "Profile works !" }));

module.exports = router;
