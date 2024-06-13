const { Router } = require("express");
const { auth } = require("../middleware/auth");
const UserController = require("../controllers/UserController");

const userRoutes = new Router();

userRoutes.get("/", UserController.list);
userRoutes.get("/:id", auth, UserController.listOne);
userRoutes.get("/:id/places", auth, UserController.listPlaces);
userRoutes.post("/", UserController.register);
userRoutes.put("/:id", auth, UserController.updateOne);
userRoutes.delete("/:id", auth, UserController.deleteOne);

module.exports = userRoutes;
