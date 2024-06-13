const { Router } = require("express");
const userRoutes = require("./users.route");
const placeRoutes = require("./places.route");
const loginRoutes = require("./login.route");

const routes = Router();

routes.use("/", userRoutes);
routes.use("/", placeRoutes);
routes.use("/", loginRoutes);

module.exports = routes;
