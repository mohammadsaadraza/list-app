const router = require("express").Router();

const {
	createList,
	getList,
	updateList,
} = require("../controllers/listControllers");

router.route("/createList").post(createList);

router.route("/getList/:id").get(getList);

router.route("/updateList/:id").patch(updateList);

module.exports = router;
