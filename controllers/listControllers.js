const List = require("../models/List");

exports.createList = async (req, res, next) => {
	try {
		var list = await List.findOne({
			name: req.body.name,
		});

		if (!list) {
			list = await List.create(req.body);
		}

		return res.status(201).json({
			success: true,
			data: list,
		});
	} catch (err) {
		return (
			res,
			status(500).json({
				success: false,
				message: err.message,
			})
		);
	}
};

exports.getList = async (req, res, next) => {
	try {
		var list = await List.findOne({
			name: req.params.id,
		});

		if (!list) {
			return res.status(200).json({
				success: false,
				message: "Not Found",
			});
		}

		return res.status(200).json({
			success: true,
			data: list,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};

exports.updateList = async (req, res, next) => {
	try {
		var list = await List.updateOne(
			{
				name: req.params.id,
			},
			req.body
		);

		if (!list) {
			return res.status(200).json({
				success: false,
				message: "Not found & Not updated",
			});
		}

		return res.status(202).json({
			success: true,
			data: list,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};
