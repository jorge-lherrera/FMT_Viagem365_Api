const { Router } = require("express");
const { auth } = require("../middleware/auth");
const UserController = require("../controllers/UserController");

const userRoutes = new Router();

userRoutes.get("/", UserController.findAll);
userRoutes.get("/:id", auth, UserController.findOne);
userRoutes.get("/:id/local", auth, UserController.findPlaces);
userRoutes.post("/usuario", UserController.create);
userRoutes.put("/:id", auth, UserController.updateOne);
userRoutes.delete("/:id", auth, UserController.deleteOne);

module.exports = userRoutes;
