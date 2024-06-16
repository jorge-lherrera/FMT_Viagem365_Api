const { Router } = require("express");
const { auth } = require("../middleware/auth");
const PlaceController = require("../controllers/PlaceController");

const placeRoutes = new Router();

placeRoutes.get("/place", PlaceController.findAll);
placeRoutes.get("/place/:id", PlaceController.findOne);
placeRoutes.post("/place", auth, PlaceController.create);
placeRoutes.put("/place/:id", auth, PlaceController.updateOne);
placeRoutes.delete("/place/:id", auth, PlaceController.deleteOne);

module.exports = placeRoutes;
