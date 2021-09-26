const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).json({
      message: "Handling GET requests to /orders",
    });
  });
  
  router.post("/", (req, res, next) => {

    const order ={
    orderId: req.body.orderId,
    quantity: req.body.quantity,
    }

    res.status(201).json({
      message: "Order created successfully",
      order: order,
    });
  });
  
  router.get("/:ordersId", (req, res, next) => {
    const id = req.params.ordersId;
    if (id === "special") {
      res.status(200).json({
        message: "You discovered special ID",
        id: id,
      });
    } else {
      res.status(200).json({
        message: "You have passed an ID",
      });
    }
  });

  router.delete("/:ordersId", (req, res, next) => {
    res.status(200).json({
        message: "Deleted order",
      });
  });

  module.exports = router;