const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
	app.use(
		["/api/v1/lists"],
		createProxyMiddleware({
			target: "http://localhost:5000",
		})
	);
};
