const { Router } = require("express");
const { auth } = require("../middleware/auth");
const PlaceController = require("../controllers/PlaceController");

const placeRoutes = new Router();

placeRoutes.get("/place", PlaceController.list);
placeRoutes.get("/place/:id", PlaceController.listOne);
placeRoutes.post("/place", auth, PlaceController.register);
placeRoutes.put("/place/:id", auth, PlaceController.updateOne);
placeRoutes.delete("/place/:id", auth, PlaceController.deleteOne);

module.exports = placeRoutes;
