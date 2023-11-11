const express = require("express");

const route = express.Router();

const coursecontroller = require("./../controllers/coursecontroller");

route.get("/", coursecontroller.get);
// route.get('/search',()=>{}) //fixed route
route.get("/:id", coursecontroller.getById);
route.post("/", coursecontroller.add);
route.put("/:id", coursecontroller.edit);
route.delete("/:id", coursecontroller.del);

module.exports = route;
